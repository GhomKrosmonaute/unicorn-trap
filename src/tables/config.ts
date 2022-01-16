import * as app from "../app.js"

export interface Config {
  guild_id: string
  mode: string
  colors: string
}

const config = new app.Table<Config>({
  name: "config",
  description: "The config table",
  setup: (table) => {
    table.string("guild_id").unique().notNullable()
    table.string("mode").defaultTo(Object.keys(app.modes)[0])
    table.string("colors").defaultTo(app.rainbow.join(","))
  },
})

export async function getConfig(guild: app.Guild): Promise<Config> {
  let conf = await config.query.where({ guild_id: guild.id }).first()

  if (!conf) {
    await config.query.insert({ guild_id: guild.id })
    conf = (await config.query.where({ guild_id: guild.id }).first()) as Config
  }

  return conf
}

export default config
