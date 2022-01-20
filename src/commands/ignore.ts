import * as app from "../app.js"

import ignoredRole from "../tables/ignoredRole.js"

export default new app.Command({
  name: "ignore",
  description: "Ignore selected roles",
  aliases: ["-"],
  channelType: "guild",
  guildOwnerOnly: true,
  rest: {
    name: "roles",
    description: "Selected roles to ignore",
    all: true,
  },
  async run(message) {
    const input: string = message.args.roles

    if (!input) {
      const ignored = await ignoredRole.query.where({
        guild_id: message.guild.id,
      })

      return message.send({
        embeds: [
          new app.SafeMessageEmbed().setColor().setTitle("Ignored role list"),
          ...app
            .divider(ignored, 20)
            .map((list) =>
              new app.SafeMessageEmbed().setDescription(
                list.map(({ role_id }) => `<@&${role_id}>`).join(" ")
              )
            ),
        ],
      })
    } else {
      const roles = input
        .split(/\s+/)
        .map((id) => message.guild.roles.cache.get(id))

      if (roles.some((role) => role === undefined)) {
        return message.send(
          "Some invalid roles are given, please give a list of role id."
        )
      } else {
        await ignoredRole.query.insert(
          input.split(/\s+/).map((id) => {
            return {
              guild_id: message.guild.id,
              role_id: id,
            }
          })
        )

        return message.send("Successfully add ignored roles")
      }
    }
  },
  subs: [
    new app.Command({
      name: "reset",
      description: "Clear ignored roles",
      channelType: "guild",
      aliases: ["clear", "clean", "delete", "remove", "del", "rm"],
      guildOwnerOnly: true,
      async run(message) {
        await ignoredRole.query.del().where({ guild_id: message.guild.id })

        return message.send("Successfully reset ignored roles")
      },
    }),
    new app.Command({
      name: "range",
      description: "Ignore roles in range",
      channelType: "guild",
      aliases: ["between"],
      guildOwnerOnly: true,
      positional: [
        {
          name: "from",
          description: "Start role",
          castValue: "role",
          required: true,
        },
        {
          name: "to",
          description: "End role",
          castValue: "role",
          required: true,
        },
      ],
      async run(message) {
        const roles = await message.guild.roles.fetch()
        const factor = message.args.from.comparePositionTo(message.args.to)
        const fromIsHigher = factor > 0
        const range: app.Role[] = []

        if (factor === 0) range.push(message.args.from)
        else {
          range.push(
            message.args.from,
            message.args.to,
            ...roles
              .filter((role) => {
                return (
                  (fromIsHigher
                    ? role.comparePositionTo(message.args.from)
                    : role.comparePositionTo(message.args.to)) < 0 &&
                  (fromIsHigher
                    ? role.comparePositionTo(message.args.to)
                    : role.comparePositionTo(message.args.from)) > 0
                )
              })
              .values()
          )
        }

        await ignoredRole.query.insert(
          range.map((role) => ({
            role_id: role.id,
            guild_id: message.guild.id,
          }))
        )

        return message.send("Successfully ignored roles")
      },
    }),
  ],
})
