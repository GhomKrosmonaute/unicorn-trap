const Enmap = require("enmap")

module.exports = {
  defaultSettings: {
    prefix: process.env.PREFIX ?? ".",
    mode: "gradient",
    roles: "hoist",
  },
  defaultPalette: [],
  settings: new Enmap({ name: "settings" }),
  palettes: new Enmap({ name: "palettes" }),
  getSettings(id) {
    return this.settings.ensure(id, this.defaultSettings)
  },
  getPalette(id) {
    return this.palettes.ensure(id, this.defaultPalette)
  },
}
