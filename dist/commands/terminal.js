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
var import_child_process = __toModule(require("child_process"));
const command = {
  name: "terminal",
  aliases: ["term", "cmd", "command", "exec", ">", "process", "shell"],
  description: "Run shell command from Discord",
  botOwner: true,
  coolDown: 5e3,
  async run(message) {
    const toEdit = await message.channel.send("The process is running...");
    import_child_process.default.exec(message.rest, {cwd: process.cwd()}, (err, stdout, stderr) => {
      var _a;
      if (err) {
        const errorMessage = `An error has occurred. ${app.CODE.stringify({
          content: (_a = err.stack) != null ? _a : err.message
        })}`;
        return toEdit.edit(errorMessage).catch(() => {
          message.channel.send(errorMessage).catch();
        });
      }
      const successMessage = `The following command has been executed:
\`${message.rest}\``;
      toEdit.edit(successMessage).catch(() => {
        message.channel.send(successMessage).catch();
      });
    });
  }
};
module.exports = command;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NvbW1hbmRzL3Rlcm1pbmFsLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgKiBhcyBhcHAgZnJvbSBcIi4uL2FwcFwiXHJcbmltcG9ydCBjcCBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiXHJcblxyXG5jb25zdCBjb21tYW5kOiBhcHAuQ29tbWFuZCA9IHtcclxuICBuYW1lOiBcInRlcm1pbmFsXCIsXHJcbiAgYWxpYXNlczogW1widGVybVwiLCBcImNtZFwiLCBcImNvbW1hbmRcIiwgXCJleGVjXCIsIFwiPlwiLCBcInByb2Nlc3NcIiwgXCJzaGVsbFwiXSxcclxuICBkZXNjcmlwdGlvbjogXCJSdW4gc2hlbGwgY29tbWFuZCBmcm9tIERpc2NvcmRcIixcclxuICBib3RPd25lcjogdHJ1ZSxcclxuICBjb29sRG93bjogNTAwMCxcclxuICBhc3luYyBydW4obWVzc2FnZSkge1xyXG4gICAgY29uc3QgdG9FZGl0ID0gYXdhaXQgbWVzc2FnZS5jaGFubmVsLnNlbmQoXCJUaGUgcHJvY2VzcyBpcyBydW5uaW5nLi4uXCIpXHJcbiAgICBjcC5leGVjKG1lc3NhZ2UucmVzdCwgeyBjd2Q6IHByb2Nlc3MuY3dkKCkgfSwgKGVyciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcclxuICAgICAgaWYgKGVycikge1xyXG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGBBbiBlcnJvciBoYXMgb2NjdXJyZWQuICR7YXBwLkNPREUuc3RyaW5naWZ5KHtcclxuICAgICAgICAgIGNvbnRlbnQ6IGVyci5zdGFjayA/PyBlcnIubWVzc2FnZSxcclxuICAgICAgICB9KX1gXHJcbiAgICAgICAgcmV0dXJuIHRvRWRpdC5lZGl0KGVycm9yTWVzc2FnZSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgbWVzc2FnZS5jaGFubmVsLnNlbmQoZXJyb3JNZXNzYWdlKS5jYXRjaCgpXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBzdWNjZXNzTWVzc2FnZSA9IGBUaGUgZm9sbG93aW5nIGNvbW1hbmQgaGFzIGJlZW4gZXhlY3V0ZWQ6XFxuXFxgJHttZXNzYWdlLnJlc3R9XFxgYFxyXG4gICAgICB0b0VkaXQuZWRpdChzdWNjZXNzTWVzc2FnZSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKHN1Y2Nlc3NNZXNzYWdlKS5jYXRjaCgpXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH0sXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY29tbWFuZFxyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxVQUFxQjtBQUNyQiwyQkFBZTtBQUVmLE1BQU0sVUFBdUI7QUFBQSxFQUMzQixNQUFNO0FBQUEsRUFDTixTQUFTLENBQUMsUUFBUSxPQUFPLFdBQVcsUUFBUSxLQUFLLFdBQVc7QUFBQSxFQUM1RCxhQUFhO0FBQUEsRUFDYixVQUFVO0FBQUEsRUFDVixVQUFVO0FBQUEsUUFDSixJQUFJLFNBQVM7QUFDakIsVUFBTSxTQUFTLE1BQU0sUUFBUSxRQUFRLEtBQUs7QUFDMUMsaUNBQUcsS0FBSyxRQUFRLE1BQU0sQ0FBRSxLQUFLLFFBQVEsUUFBUyxDQUFDLEtBQUssUUFBUSxXQUFXO0FBWDNFO0FBWU0sVUFBSSxLQUFLO0FBQ1AsY0FBTSxlQUFlLDBCQUEwQixJQUFJLEtBQUssVUFBVTtBQUFBLFVBQ2hFLFNBQVMsVUFBSSxVQUFKLFlBQWEsSUFBSTtBQUFBO0FBRTVCLGVBQU8sT0FBTyxLQUFLLGNBQWMsTUFBTSxNQUFNO0FBQzNDLGtCQUFRLFFBQVEsS0FBSyxjQUFjO0FBQUE7QUFBQTtBQUd2QyxZQUFNLGlCQUFpQjtBQUFBLElBQStDLFFBQVE7QUFDOUUsYUFBTyxLQUFLLGdCQUFnQixNQUFNLE1BQU07QUFDdEMsZ0JBQVEsUUFBUSxLQUFLLGdCQUFnQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTTdDLE9BQU8sVUFBVTsiLAogICJuYW1lcyI6IFtdCn0K
