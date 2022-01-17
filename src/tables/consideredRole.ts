import * as app from "../app.js"

export interface ConsideredRole {
  role_id: string
  guild_id: string
}

export default new app.Table<ConsideredRole>({
  name: "consideredRole",
  description: "Role to considerate",
  setup: (table) => {
    table.string("role_id").notNullable().unique()
    table.string("guild_id").notNullable()
  },
})
