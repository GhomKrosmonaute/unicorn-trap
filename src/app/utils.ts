import Discord from "discord.js"

import guilds from "../tables/guilds"

export async function prefix(guild?: Discord.Guild): Promise<string> {
  let prefix = process.env.PREFIX as string
  if (guild) {
    const guildData = await guilds.query
      .where("guild_id", guild.id)
      .select()
      .first()
    if (guildData) {
      prefix = guildData.prefix ?? prefix
    }
  }
  return prefix
}
