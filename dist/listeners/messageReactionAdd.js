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
const listener = {
  event: "messageReactionAdd",
  async run(reaction, user) {
    if (!user.bot) {
      const message = reaction.message;
      const guild = message.guild;
      if (guild) {
        const paginator = app.Paginator.getByMessage(message);
        if (paginator) {
          paginator.handleReaction(reaction, user);
        }
      }
    }
  }
};
module.exports = listener;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2xpc3RlbmVycy9tZXNzYWdlUmVhY3Rpb25BZGQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCAqIGFzIGFwcCBmcm9tIFwiLi4vYXBwXCJcclxuXHJcbmNvbnN0IGxpc3RlbmVyOiBhcHAuTGlzdGVuZXI8XCJtZXNzYWdlUmVhY3Rpb25BZGRcIj4gPSB7XHJcbiAgZXZlbnQ6IFwibWVzc2FnZVJlYWN0aW9uQWRkXCIsXHJcbiAgYXN5bmMgcnVuKHJlYWN0aW9uLCB1c2VyKSB7XHJcbiAgICBpZiAoIXVzZXIuYm90KSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSByZWFjdGlvbi5tZXNzYWdlXHJcbiAgICAgIGNvbnN0IGd1aWxkID0gbWVzc2FnZS5ndWlsZFxyXG4gICAgICBpZiAoZ3VpbGQpIHtcclxuICAgICAgICBjb25zdCBwYWdpbmF0b3IgPSBhcHAuUGFnaW5hdG9yLmdldEJ5TWVzc2FnZShtZXNzYWdlKVxyXG4gICAgICAgIGlmIChwYWdpbmF0b3IpIHtcclxuICAgICAgICAgIHBhZ2luYXRvci5oYW5kbGVSZWFjdGlvbihyZWFjdGlvbiwgdXNlcilcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3RlbmVyXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFVBQXFCO0FBRXJCLE1BQU0sV0FBK0M7QUFBQSxFQUNuRCxPQUFPO0FBQUEsUUFDRCxJQUFJLFVBQVUsTUFBTTtBQUN4QixRQUFJLENBQUMsS0FBSyxLQUFLO0FBQ2IsWUFBTSxVQUFVLFNBQVM7QUFDekIsWUFBTSxRQUFRLFFBQVE7QUFDdEIsVUFBSSxPQUFPO0FBQ1QsY0FBTSxZQUFZLElBQUksVUFBVSxhQUFhO0FBQzdDLFlBQUksV0FBVztBQUNiLG9CQUFVLGVBQWUsVUFBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPN0MsT0FBTyxVQUFVOyIsCiAgIm5hbWVzIjogW10KfQo=
