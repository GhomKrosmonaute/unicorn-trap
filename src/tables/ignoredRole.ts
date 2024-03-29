import * as app from "../app.js"

export interface IgnoredRole {
  role_id: string
  guild_id: string
}

export default new app.Table<IgnoredRole>({
  name: "ignoredRole",
  description: "Role to ignore",
  setup: (table) => {
    table.string("role_id").notNullable().unique()
    table.string("guild_id").notNullable()
  },
})
