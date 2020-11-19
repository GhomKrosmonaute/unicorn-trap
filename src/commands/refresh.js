const akairo = require("discord-akairo")
const database = require("../app/database")

module.exports = class extends akairo.Command {
  constructor() {
    super("refresh", {
      aliases: ["refresh", "update"],
      channel: "guild",
      cooldown: 1000 * 60 * 5,
      condition: function (message) {
        return message.guild?.ownerID === message.author.id
      },
    })
  }

  exec(message, args) {
    database.palettes.get(message.guild.id)
  }
}
