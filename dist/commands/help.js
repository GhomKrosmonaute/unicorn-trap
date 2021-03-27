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
  name: "help",
  aliases: ["h", "usage"],
  botPermissions: ["SEND_MESSAGES"],
  description: "Help menu",
  longDescription: "Display all commands of bot or detail a target command.",
  positional: [
    {
      name: "command",
      description: "The target command to detail."
    }
  ],
  async run(message) {
    var _a, _b;
    const prefix = await app.prefix((_a = message.guild) != null ? _a : void 0);
    if (message.args.command) {
      const cmd = app.commands.resolve(message.args.command);
      if (cmd) {
        return app.sendCommandDetails(message, cmd, prefix);
      } else {
        await message.channel.send(new app.MessageEmbed().setColor("RED").setAuthor(`Unknown command "${message.args.command}"`, (_b = message.client.user) == null ? void 0 : _b.displayAvatarURL()));
      }
    } else {
      new app.Paginator(app.Paginator.divider(app.commands.map((cmd) => {
        var _a2;
        return `**${prefix}${cmd.name}** - ${(_a2 = cmd.description) != null ? _a2 : "no description"}`;
      }), 10).map((page) => {
        var _a2;
        return new app.MessageEmbed().setColor("BLURPLE").setAuthor("Command list", (_a2 = message.client.user) == null ? void 0 : _a2.displayAvatarURL()).setDescription(page.join("\n")).setFooter(`${prefix}help <command>`);
      }), message.channel, (reaction, user) => user.id === message.author.id);
    }
  },
  subs: [
    {
      name: "count",
      examples: ["help count"],
      description: "Count of loaded commands",
      async run(message) {
        var _a;
        return message.channel.send(new app.MessageEmbed().setColor("BLURPLE").setAuthor("Command count", (_a = message.client.user) == null ? void 0 : _a.displayAvatarURL()).setDescription(`There are currently ${app.commands.size} commands and ${app.commands.reduce((acc, command2) => {
          if (command2 && command2.subs)
            return acc + command2.subs.length;
          return acc;
        }, 0)} sub-commands`));
      }
    }
  ]
};
module.exports = command;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NvbW1hbmRzL2hlbHAudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCAqIGFzIGFwcCBmcm9tIFwiLi4vYXBwXCJcclxuXHJcbmNvbnN0IGNvbW1hbmQ6IGFwcC5Db21tYW5kID0ge1xyXG4gIG5hbWU6IFwiaGVscFwiLFxyXG4gIGFsaWFzZXM6IFtcImhcIiwgXCJ1c2FnZVwiXSxcclxuICBib3RQZXJtaXNzaW9uczogW1wiU0VORF9NRVNTQUdFU1wiXSxcclxuICBkZXNjcmlwdGlvbjogXCJIZWxwIG1lbnVcIixcclxuICBsb25nRGVzY3JpcHRpb246IFwiRGlzcGxheSBhbGwgY29tbWFuZHMgb2YgYm90IG9yIGRldGFpbCBhIHRhcmdldCBjb21tYW5kLlwiLFxyXG4gIHBvc2l0aW9uYWw6IFtcclxuICAgIHtcclxuICAgICAgbmFtZTogXCJjb21tYW5kXCIsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSB0YXJnZXQgY29tbWFuZCB0byBkZXRhaWwuXCIsXHJcbiAgICB9LFxyXG4gIF0sXHJcbiAgYXN5bmMgcnVuKG1lc3NhZ2UpIHtcclxuICAgIGNvbnN0IHByZWZpeCA9IGF3YWl0IGFwcC5wcmVmaXgobWVzc2FnZS5ndWlsZCA/PyB1bmRlZmluZWQpXHJcblxyXG4gICAgaWYgKG1lc3NhZ2UuYXJncy5jb21tYW5kKSB7XHJcbiAgICAgIGNvbnN0IGNtZCA9IGFwcC5jb21tYW5kcy5yZXNvbHZlKG1lc3NhZ2UuYXJncy5jb21tYW5kKVxyXG5cclxuICAgICAgaWYgKGNtZCkge1xyXG4gICAgICAgIHJldHVybiBhcHAuc2VuZENvbW1hbmREZXRhaWxzKG1lc3NhZ2UsIGNtZCwgcHJlZml4KVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGF3YWl0IG1lc3NhZ2UuY2hhbm5lbC5zZW5kKFxyXG4gICAgICAgICAgbmV3IGFwcC5NZXNzYWdlRW1iZWQoKVxyXG4gICAgICAgICAgICAuc2V0Q29sb3IoXCJSRURcIilcclxuICAgICAgICAgICAgLnNldEF1dGhvcihcclxuICAgICAgICAgICAgICBgVW5rbm93biBjb21tYW5kIFwiJHttZXNzYWdlLmFyZ3MuY29tbWFuZH1cImAsXHJcbiAgICAgICAgICAgICAgbWVzc2FnZS5jbGllbnQudXNlcj8uZGlzcGxheUF2YXRhclVSTCgpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5ldyBhcHAuUGFnaW5hdG9yKFxyXG4gICAgICAgIGFwcC5QYWdpbmF0b3IuZGl2aWRlcihcclxuICAgICAgICAgIGFwcC5jb21tYW5kcy5tYXAoKGNtZCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYCoqJHtwcmVmaXh9JHtjbWQubmFtZX0qKiAtICR7XHJcbiAgICAgICAgICAgICAgY21kLmRlc2NyaXB0aW9uID8/IFwibm8gZGVzY3JpcHRpb25cIlxyXG4gICAgICAgICAgICB9YFxyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgICAxMFxyXG4gICAgICAgICkubWFwKChwYWdlKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gbmV3IGFwcC5NZXNzYWdlRW1iZWQoKVxyXG4gICAgICAgICAgICAuc2V0Q29sb3IoXCJCTFVSUExFXCIpXHJcbiAgICAgICAgICAgIC5zZXRBdXRob3IoXCJDb21tYW5kIGxpc3RcIiwgbWVzc2FnZS5jbGllbnQudXNlcj8uZGlzcGxheUF2YXRhclVSTCgpKVxyXG4gICAgICAgICAgICAuc2V0RGVzY3JpcHRpb24ocGFnZS5qb2luKFwiXFxuXCIpKVxyXG4gICAgICAgICAgICAuc2V0Rm9vdGVyKGAke3ByZWZpeH1oZWxwIDxjb21tYW5kPmApXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgbWVzc2FnZS5jaGFubmVsLFxyXG4gICAgICAgIChyZWFjdGlvbiwgdXNlcikgPT4gdXNlci5pZCA9PT0gbWVzc2FnZS5hdXRob3IuaWRcclxuICAgICAgKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc3ViczogW1xyXG4gICAge1xyXG4gICAgICBuYW1lOiBcImNvdW50XCIsXHJcbiAgICAgIGV4YW1wbGVzOiBbXCJoZWxwIGNvdW50XCJdLFxyXG4gICAgICBkZXNjcmlwdGlvbjogXCJDb3VudCBvZiBsb2FkZWQgY29tbWFuZHNcIixcclxuICAgICAgYXN5bmMgcnVuKG1lc3NhZ2UpIHtcclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5jaGFubmVsLnNlbmQoXHJcbiAgICAgICAgICBuZXcgYXBwLk1lc3NhZ2VFbWJlZCgpXHJcbiAgICAgICAgICAgIC5zZXRDb2xvcihcIkJMVVJQTEVcIilcclxuICAgICAgICAgICAgLnNldEF1dGhvcihcIkNvbW1hbmQgY291bnRcIiwgbWVzc2FnZS5jbGllbnQudXNlcj8uZGlzcGxheUF2YXRhclVSTCgpKVxyXG4gICAgICAgICAgICAuc2V0RGVzY3JpcHRpb24oXHJcbiAgICAgICAgICAgICAgYFRoZXJlIGFyZSBjdXJyZW50bHkgJHtcclxuICAgICAgICAgICAgICAgIGFwcC5jb21tYW5kcy5zaXplXHJcbiAgICAgICAgICAgICAgfSBjb21tYW5kcyBhbmQgJHthcHAuY29tbWFuZHMucmVkdWNlPG51bWJlcj4oKGFjYywgY29tbWFuZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbW1hbmQgJiYgY29tbWFuZC5zdWJzKSByZXR1cm4gYWNjICsgY29tbWFuZC5zdWJzLmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjY1xyXG4gICAgICAgICAgICAgIH0sIDApfSBzdWItY29tbWFuZHNgXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY29tbWFuZFxyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxVQUFxQjtBQUVyQixNQUFNLFVBQXVCO0FBQUEsRUFDM0IsTUFBTTtBQUFBLEVBQ04sU0FBUyxDQUFDLEtBQUs7QUFBQSxFQUNmLGdCQUFnQixDQUFDO0FBQUEsRUFDakIsYUFBYTtBQUFBLEVBQ2IsaUJBQWlCO0FBQUEsRUFDakIsWUFBWTtBQUFBLElBQ1Y7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQTtBQUFBO0FBQUEsUUFHWCxJQUFJLFNBQVM7QUFkckI7QUFlSSxVQUFNLFNBQVMsTUFBTSxJQUFJLE9BQU8sY0FBUSxVQUFSLFlBQWlCO0FBRWpELFFBQUksUUFBUSxLQUFLLFNBQVM7QUFDeEIsWUFBTSxNQUFNLElBQUksU0FBUyxRQUFRLFFBQVEsS0FBSztBQUU5QyxVQUFJLEtBQUs7QUFDUCxlQUFPLElBQUksbUJBQW1CLFNBQVMsS0FBSztBQUFBLGFBQ3ZDO0FBQ0wsY0FBTSxRQUFRLFFBQVEsS0FDcEIsSUFBSSxJQUFJLGVBQ0wsU0FBUyxPQUNULFVBQ0Msb0JBQW9CLFFBQVEsS0FBSyxZQUNqQyxjQUFRLE9BQU8sU0FBZixtQkFBcUI7QUFBQTtBQUFBLFdBSXhCO0FBQ0wsVUFBSSxJQUFJLFVBQ04sSUFBSSxVQUFVLFFBQ1osSUFBSSxTQUFTLElBQUksQ0FBQyxRQUFRO0FBbkNwQztBQW9DWSxlQUFPLEtBQUssU0FBUyxJQUFJLFlBQ3ZCLFdBQUksZ0JBQUosYUFBbUI7QUFBQSxVQUd2QixJQUNBLElBQUksQ0FBQyxTQUFTO0FBekN4QjtBQTBDVSxlQUFPLElBQUksSUFBSSxlQUNaLFNBQVMsV0FDVCxVQUFVLGdCQUFnQixlQUFRLE9BQU8sU0FBZixvQkFBcUIsb0JBQy9DLGVBQWUsS0FBSyxLQUFLLE9BQ3pCLFVBQVUsR0FBRztBQUFBLFVBRWxCLFFBQVEsU0FDUixDQUFDLFVBQVUsU0FBUyxLQUFLLE9BQU8sUUFBUSxPQUFPO0FBQUE7QUFBQTtBQUFBLEVBSXJELE1BQU07QUFBQSxJQUNKO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixVQUFVLENBQUM7QUFBQSxNQUNYLGFBQWE7QUFBQSxZQUNQLElBQUksU0FBUztBQTFEekI7QUEyRFEsZUFBTyxRQUFRLFFBQVEsS0FDckIsSUFBSSxJQUFJLGVBQ0wsU0FBUyxXQUNULFVBQVUsaUJBQWlCLGNBQVEsT0FBTyxTQUFmLG1CQUFxQixvQkFDaEQsZUFDQyx1QkFDRSxJQUFJLFNBQVMscUJBQ0UsSUFBSSxTQUFTLE9BQWUsQ0FBQyxLQUFLLGFBQVk7QUFDN0QsY0FBSSxZQUFXLFNBQVE7QUFBTSxtQkFBTyxNQUFNLFNBQVEsS0FBSztBQUN2RCxpQkFBTztBQUFBLFdBQ047QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFqQixPQUFPLFVBQVU7IiwKICAibmFtZXMiOiBbXQp9Cg==
