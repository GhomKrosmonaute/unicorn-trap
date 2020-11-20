const dayjs = require("dayjs")
const dotenv = require("dotenv")
const akairo = require("discord-akairo")

dotenv.config()

dayjs.locale("fr")

const database = require("./app/database")

new (class extends akairo.AkairoClient {
  constructor() {
    super()

    this.options.disableMentions = "everyone"
    this.ownerID = "352176756922253321"

    new akairo.CommandHandler(this, {
      directory: "src/commands",
      commandUtil: true,
      storeMessages: false,
      prefix: ({ guild }) => {
        if (!guild) return process.env.PREFIX
        return database.getSettings(guild.id).prefix
      },
    }).loadAll()
  }
})()
  .login(process.env.TOKEN)
  .then(function () {
    console.log(`[ ${dayjs()} ] Ok i'm back.`)
  })
