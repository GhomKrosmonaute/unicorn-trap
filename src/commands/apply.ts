import * as app from "../app.js"

export default new app.Command({
  name: "apply",
  aliases: ["refresh"],
  description: "The apply command",
  channelType: "guild",
  middlewares: [app.applyInProgress],
  flags: [
    {
      name: "hoistOnly",
      description: "Apply colors on hoist roles only",
      aliases: ["hoist"],
      flag: "h",
    },
  ],
  async run(message) {
    app.cache.set(message.guild.id, true)

    await app
      .applyColors(message.guild, message.args.hoistOnly)
      .finally(() => app.cache.set(message.guild.id, false))

    return message.send("apply command is not yet implemented.")
  },
})
