const akairo = require("discord-akairo")
const engine = require("color-engine")
const database = require("../app/database")

module.exports = class extends akairo.Command {
  constructor() {
    super("refresh", {
      aliases: ["refresh", "update"],
      channel: "guild",
      typing: true,
      cooldown: 1000 * 60 * 5,
    })
  }

  async exec(message, args) {
    if (message.guild?.ownerID !== message.author.id) {
      return message.util.send("guild owner only can use this command.")
    }

    const settings = database.getSettings(message.guild.id)
    const palette = database.getPalette(message.guild.id)
    const roleManager = await message.guild.roles.fetch(null, false, true)

    let gradient
    let roles

    if (typeof settings.roles === "string") {
      switch (settings.roles) {
        case "hoist":
          roles = roleManager.cache.filter((role) => role.hoist).array()
          break
        case "all": {
          roles = roleManager.cache.array()
          break
        }
        default:
          roles = roleManager.cache.filter((role) => role.id === settings.roles)
      }
    } else if (Array.isArray(settings.roles)) {
      roles = roleManager.cache
        .filter((role) => settings.roles.includes(role.id))
        .array()
    }

    switch (settings.mode) {
      case "reflect":
      case "mirror":
        gradient = engine.Color.gradient(
          [...palette.slice(0).reverse(), ...palette],
          roles.length
        )
        break
      default:
        // gradient
        gradient = engine.Color.gradient(palette, roles.length)
        break
    }

    let applied = 0

    if (gradient.length > 0) {
      for (let i = 0; i < roles.length; i++) {
        const role = roles[i]
        const color = gradient[i]

        const roleColor = new engine.Color(role.color)

        if (roleColor.isNaC || roleColor.hexString !== color.hexString) {
          await role.setColor(color.hexString)
          applied++
        }
      }
    }

    return message.util.send(`${applied} applied colors.`)
  }
}
