import * as app from "../app.js"
import { getConfig, setConfig } from "../tables/config.js"

export default new app.Command({
  name: "color",
  description: "Guild colors",
  channelType: "guild",
  guildOwnerOnly: true,
  async run(message) {
    const config = await getConfig(message.guild)

    return message.send({
      embeds: config.colors.split(",").map((colorResolvable) => {
        const color = new app.Color(colorResolvable)

        return new app.SafeMessageEmbed()
          .setColor(color.rgb)
          .setDescription(
            `rgb(${color.rgb.map((c) => "`" + c + "`").join(", ")}) hex(\`${
              color.hex
            }\`)`
          )
      }),
    })
  },
  subs: [
    new app.Command({
      name: "reverse",
      description: "Reverse guild colors",
      channelType: "guild",
      guildOwnerOnly: true,
      async run(message) {
        const config = await getConfig(message.guild)

        config.colors = config.colors.split(",").reverse().join(",")

        await setConfig(config)

        return message.send("Successfully reversed guild colors")
      },
    }),
    new app.Command({
      name: "set",
      description: "Overwrite guild colors",
      channelType: "guild",
      guildOwnerOnly: true,
      positional: [
        {
          name: "colors",
          description: "New guild colors",
          castValue: "array",
          checkCastedValue: (colors: string[]) =>
            colors.every((color) => app.isColor(color)),
          required: true,
        },
      ],
      async run(message) {
        const config = await getConfig(message.guild)

        config.colors = message.args.colors.join(",")

        await setConfig(config)

        return message.send("Successfully overwritten guild colors")
      },
    }),
  ],
})
