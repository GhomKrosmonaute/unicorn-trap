var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __exportStar = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __exportStar(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};
var app = __toModule(require("../app"));
const command = {
  name: "turn",
  aliases: ["power"],
  botOwner: true,
  description: "Turn on/off command handling",
  positional: [
    {
      name: "mode",
      description: "Power mode of bot. on/off",
      default: () => app.cache.ensure("turn", true) ? "off" : "on",
      checkValue: /^on|off$/,
      required: true
    }
  ],
  async run(message) {
    const turn = message.args.mode === "on";
    app.cache.set("turn", turn);
    return message.channel.send(`Command handling ${turn ? "activated" : "disabled"} `);
  }
};
module.exports = command;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NvbW1hbmRzL3R1cm4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCAqIGFzIGFwcCBmcm9tIFwiLi4vYXBwXCJcclxuXHJcbmNvbnN0IGNvbW1hbmQ6IGFwcC5Db21tYW5kID0ge1xyXG4gIG5hbWU6IFwidHVyblwiLFxyXG4gIGFsaWFzZXM6IFtcInBvd2VyXCJdLFxyXG4gIGJvdE93bmVyOiB0cnVlLFxyXG4gIGRlc2NyaXB0aW9uOiBcIlR1cm4gb24vb2ZmIGNvbW1hbmQgaGFuZGxpbmdcIixcclxuICBwb3NpdGlvbmFsOiBbXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6IFwibW9kZVwiLFxyXG4gICAgICBkZXNjcmlwdGlvbjogXCJQb3dlciBtb2RlIG9mIGJvdC4gb24vb2ZmXCIsXHJcbiAgICAgIGRlZmF1bHQ6ICgpID0+IChhcHAuY2FjaGUuZW5zdXJlKFwidHVyblwiLCB0cnVlKSA/IFwib2ZmXCIgOiBcIm9uXCIpLFxyXG4gICAgICBjaGVja1ZhbHVlOiAvXm9ufG9mZiQvLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgXSxcclxuICBhc3luYyBydW4obWVzc2FnZSkge1xyXG4gICAgY29uc3QgdHVybiA9IG1lc3NhZ2UuYXJncy5tb2RlID09PSBcIm9uXCJcclxuICAgIGFwcC5jYWNoZS5zZXQoXCJ0dXJuXCIsIHR1cm4pXHJcbiAgICByZXR1cm4gbWVzc2FnZS5jaGFubmVsLnNlbmQoXHJcbiAgICAgIGBDb21tYW5kIGhhbmRsaW5nICR7dHVybiA/IFwiYWN0aXZhdGVkXCIgOiBcImRpc2FibGVkXCJ9IGBcclxuICAgIClcclxuICB9LFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNvbW1hbmRcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsVUFBcUI7QUFFckIsTUFBTSxVQUF1QjtBQUFBLEVBQzNCLE1BQU07QUFBQSxFQUNOLFNBQVMsQ0FBQztBQUFBLEVBQ1YsVUFBVTtBQUFBLEVBQ1YsYUFBYTtBQUFBLEVBQ2IsWUFBWTtBQUFBLElBQ1Y7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLFNBQVMsTUFBTyxJQUFJLE1BQU0sT0FBTyxRQUFRLFFBQVEsUUFBUTtBQUFBLE1BQ3pELFlBQVk7QUFBQSxNQUNaLFVBQVU7QUFBQTtBQUFBO0FBQUEsUUFHUixJQUFJLFNBQVM7QUFDakIsVUFBTSxPQUFPLFFBQVEsS0FBSyxTQUFTO0FBQ25DLFFBQUksTUFBTSxJQUFJLFFBQVE7QUFDdEIsV0FBTyxRQUFRLFFBQVEsS0FDckIsb0JBQW9CLE9BQU8sY0FBYztBQUFBO0FBQUE7QUFLL0MsT0FBTyxVQUFVOyIsCiAgIm5hbWVzIjogW10KfQo=
