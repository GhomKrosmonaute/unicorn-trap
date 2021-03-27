import * as app from "../app"

const table = new app.Table<{
  id: string
  prefix: string
}>({
  name: "guilds",
  colMaker: (table) => {
    table.string("id").unique()
    table.string("prefix")
  },
})

export default table
