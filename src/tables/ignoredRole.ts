import * as app from "../app.js"

export interface IgnoredRole {
  // type of table
}

export default new app.Table<IgnoredRole>({
  name: "ignoredRole",
  description: "The ignoredRole table",
  setup: (table) => {
    // setup table columns => http://knexjs.org/#Schema-Building
  },
})
