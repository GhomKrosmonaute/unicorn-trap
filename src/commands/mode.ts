import * as app from "../app.js"

import config, { getConfig } from "../tables/config.js"

export default new app.Command({
  name: "mode",
  description: "Select or show current mode",
  channelType: "guild",
  guildOwnerOnly: true,
  positional: [
    {
      name: "mode",
      description: "Name of selected mode",
      castValue: (value) => value.toUpperCase(),
      checkCastedValue: (value) => app.modes.hasOwnProperty(value),
      checkingErrorMessage: "You must select a valid mode."
    }
  ],
  async run(message) {
    if (message.args.mode) {
      await config.query.insert({
        guild_id: message.guild.id,
        mode: message.args.mode
      }).onConflict("guild_id").merge()

      return message.send({
        embeds: [
          new app.SafeMessageEmbed()
            .setColor()
            .setTitle(`Mode updated: ${message.args.mode}`)
            .setDescription(app.modes[message.args.mode].description)
        ]
      })
    }

    const conf = await getConfig(message.guild)

    return message.send({
      embeds: [
        new app.SafeMessageEmbed()
          .setColor()
          .setTitle(`Current mode: ${conf.mode}`)
          .setDescription(app.modes[conf.mode].description)
      ]
    })
  },
  subs: [
    new app.Command({
      name: "list",
      aliases: ["ls", "all", "show"],
      description: "List possible modes",
      channelType: "all",
      async run(message) {
        return message.send({
          embeds: [
            new app.SafeMessageEmbed()
              .setColor()
              .setTitle("Mode list")
              .setDescription(Object.entries(app.modes).map(([name, mode]) => {
                return `\`${name}\` - ${mode.description}`
              }).join("\n"))
          ]
        })
      }
    })
  ]
})