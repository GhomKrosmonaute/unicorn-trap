import * as app from "../app.js"

import consideredRole from "../tables/consideredRole.js"

export default new app.Command({
  name: "considerate",
  description: "Considerate selected roles",
  aliases: ["considered", "keep", "whitelist", "+"],
  channelType: "guild",
  guildOwnerOnly: true,
  rest: {
    name: "roles",
    description: "Selected roles to considerate",
    all: true,
  },
  async run(message) {
    const input: string = message.args.roles

    if (!input) {
      const considered = await consideredRole.query.where({
        guild_id: message.guild.id,
      })

      return message.send({
        embeds: [
          new app.SafeMessageEmbed()
            .setColor()
            .setTitle("Considered role list"),
          ...app
            .divider(considered, 20)
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
        await consideredRole.query.insert(
          input.split(/\s+/).map((id) => {
            return {
              guild_id: message.guild.id,
              role_id: id,
            }
          })
        )

        return message.send("Successfully add considered roles")
      }
    }
  },
  subs: [
    new app.Command({
      name: "reset",
      description: "Clear considered roles",
      channelType: "guild",
      aliases: ["clear", "clean", "delete", "remove", "del", "rm"],
      guildOwnerOnly: true,
      async run(message) {
        await consideredRole.query.del().where({ guild_id: message.guild.id })

        return message.send("Successfully reset considered roles")
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

        await consideredRole.query.insert(
          range.map((role) => ({
            role_id: role.id,
            guild_id: message.guild.id,
          }))
        )

        return message.send("Successfully considered roles")
      },
    }),
  ],
})
