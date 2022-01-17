import * as app from "../app.js"

export default new app.Command({
  name: "considerate",
  description: "The considerate command",
  channelType: "all",
  async run(message) {
    // todo: code here
    return message.send("considerate command is not yet implemented.")
  },
})
