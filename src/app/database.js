const Enmap = require("enmap")

module.exports = new Enmap({ name: "settings" })

module.exports.ensure = function (id) {
  return super.ensure(id, {
    prefix: process.env.PREFIX ?? "}",
    easing: "linear", // or [easing1, easing2] for sequence
    roles: "hoist", // or "all" or [role_id] for custom
    palette: "rainbow", // or [color_hex] for custom
    reverse: false,
  })
}
