const akairo = require("discord-akairo")

module.exports = class extends akairo.Command {
  constructor() {
    super("say", {
      aliases: ["say"],
      args: [
        {
          id: "toSay",
          type: "string",
        },
      ],
    })
  }

  exec(message, { toSay }) {
    return message.util.send(toSay)
  }
}
