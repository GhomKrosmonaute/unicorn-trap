import * as app from "../app.js"

export default new app.Command({
  name: "color",
  description: "The color command",
  channelType: "all",
  async run(message) {
    // todo: code here
    return message.send("color command is not yet implemented.")
  },
  subs: [
    // reverse
    // set
  ],
})
