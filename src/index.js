const dayjs = require("dayjs")
const dotenv = require("dotenv")
const akairo = require("discord-akairo")
const database = require("./app/database")

dotenv.config()

dayjs.locale("fr")

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
        return database.settings.ensure(guild.id, process.env.PREFIX)
      },
    }).loadAll()
  }
})()
  .login(process.env.TOKEN)
  .then(function () {
    console.log(`[ ${dayjs()} ] Ok i'm back.`)
  })
