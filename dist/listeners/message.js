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
var import_yargs_parser = __toModule(require("yargs-parser"));
const listener = {
  event: "message",
  async run(message) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
    if (!app.isCommandMessage(message))
      return;
    const prefix = await app.prefix((_a = message.guild) != null ? _a : void 0);
    const cut = function(key2) {
      message.content = message.content.slice(key2.length).trim();
    };
    if (message.content.startsWith(prefix))
      cut(prefix);
    else
      return;
    let key = message.content.split(/\s+/)[0];
    if (key !== "turn" && !app.cache.ensure("turn", true))
      return;
    let cmd = app.commands.resolve(key);
    if (!cmd)
      return null;
    {
      let cursor = 0;
      let depth = 0;
      while (cmd.subs && cursor < cmd.subs.length) {
        const subKey = message.content.split(/\s+/)[depth + 1];
        for (const sub of cmd.subs) {
          if (sub.name === subKey) {
            key += ` ${subKey}`;
            cursor = 0;
            cmd = sub;
            depth++;
            break;
          } else if (sub.aliases) {
            for (const alias of sub.aliases) {
              if (alias === subKey) {
                key += ` ${subKey}`;
                cursor = 0;
                cmd = sub;
                depth++;
              }
            }
          }
          cursor++;
        }
      }
    }
    cut(key);
    const parsedArgs = (0, import_yargs_parser.default)(message.content);
    const restPositional = (_b = parsedArgs._) != null ? _b : [];
    message.args = ((_d = (_c = parsedArgs._) == null ? void 0 : _c.slice(0)) != null ? _d : []).map((positional) => {
      if (/^(?:".+"|'.+')$/.test(positional))
        return positional.slice(1, positional.length - 1);
      return positional;
    });
    if (parsedArgs.help || parsedArgs.h)
      return app.sendCommandDetails(message, cmd, prefix);
    {
      const coolDownId = `${cmd.name}:${message.channel.id}`;
      const coolDown = app.cache.ensure("CD-" + coolDownId, {
        time: 0,
        trigger: false
      });
      if (cmd.coolDown && coolDown.trigger) {
        if (Date.now() > coolDown.time + cmd.coolDown) {
          app.cache.set("CD-" + coolDownId, {
            time: 0,
            trigger: false
          });
        } else {
          return message.channel.send(new app.MessageEmbed().setColor("RED").setAuthor(`Please wait ${Math.ceil((coolDown.time + cmd.coolDown - Date.now()) / 1e3)} seconds...`, (_e = message.client.user) == null ? void 0 : _e.displayAvatarURL()));
        }
      }
    }
    if (app.isGuildMessage(message)) {
      if (cmd.dmOnly)
        return message.channel.send(new app.MessageEmbed().setColor("RED").setAuthor("This command must be used in DM.", (_f = message.client.user) == null ? void 0 : _f.displayAvatarURL()));
      if (cmd.guildOwner) {
        if (message.guild.owner !== message.member && process.env.OWNER !== message.member.id)
          return await message.channel.send(new app.MessageEmbed().setColor("RED").setAuthor("You must be the guild owner.", (_g = message.client.user) == null ? void 0 : _g.displayAvatarURL()));
      }
      if (cmd.botPermissions) {
        for (const permission of cmd.botPermissions)
          if (!((_h = message.guild.me) == null ? void 0 : _h.hasPermission(permission, {
            checkAdmin: true,
            checkOwner: true
          })))
            return await message.channel.send(new app.MessageEmbed().setColor("RED").setAuthor(`I need the \`${permission}\` permission to call this command.`, (_i = message.client.user) == null ? void 0 : _i.displayAvatarURL()));
      }
      if (cmd.userPermissions) {
        for (const permission of cmd.userPermissions)
          if (!message.member.hasPermission(permission, {
            checkAdmin: true,
            checkOwner: true
          }))
            return await message.channel.send(new app.MessageEmbed().setColor("RED").setAuthor(`You need the \`${permission}\` permission to call this command.`, (_j = message.client.user) == null ? void 0 : _j.displayAvatarURL()));
      }
    }
    if (cmd.guildOnly) {
      if (app.isDirectMessage(message))
        return await message.channel.send(new app.MessageEmbed().setColor("RED").setAuthor("This command must be used in a guild.", (_k = message.client.user) == null ? void 0 : _k.displayAvatarURL()));
    }
    if (cmd.botOwner) {
      if (process.env.OWNER !== message.author.id)
        return await message.channel.send(new app.MessageEmbed().setColor("RED").setAuthor("You must be my owner.", (_l = message.client.user) == null ? void 0 : _l.displayAvatarURL()));
    }
    if (cmd.positional) {
      for (const positional of cmd.positional) {
        const index = cmd.positional.indexOf(positional);
        const set = (value2) => {
          message.args[positional.name] = value2;
          message.args[index] = value2;
        };
        const value = parsedArgs._[index];
        const given = value !== void 0;
        set(value);
        if (!given) {
          if (positional.required) {
            return await message.channel.send(new app.MessageEmbed().setColor("RED").setAuthor(`Missing positional "${positional.name}"`, (_m = message.client.user) == null ? void 0 : _m.displayAvatarURL()).setDescription(positional.description ? "Description: " + positional.description : `Run the following command to learn more: ${app.CODE.stringify({
              content: `${key} --help`
            })}`));
          } else if (positional.default !== void 0) {
            set(await app.scrap(positional.default, message));
          } else {
            set(null);
          }
        } else if (positional.checkValue) {
          const checked = await app.checkValue(positional, "positional", value, message);
          if (!checked)
            return;
        }
        if (positional.castValue) {
          const casted = await app.castValue(positional, "positional", value, message, set);
          if (!casted)
            return;
        }
        restPositional.shift();
      }
    }
    if (cmd.args) {
      for (const arg of cmd.args) {
        const set = (value2) => message.args[arg.name] = value2;
        let {given, value} = app.resolveGivenArgument(parsedArgs, arg);
        if (value === true)
          value = void 0;
        if (arg.required && !given)
          return await message.channel.send(new app.MessageEmbed().setColor("RED").setAuthor(`Missing argument "${arg.name}"`, (_n = message.client.user) == null ? void 0 : _n.displayAvatarURL()).setDescription(arg.description ? "Description: " + arg.description : `Example: \`--${arg.name}=someValue\``));
        set(value);
        if (value === void 0) {
          if (arg.default !== void 0) {
            set(typeof arg.default === "function" ? await arg.default(message) : arg.default);
          } else if (arg.castValue !== "array") {
            set(null);
          }
        } else if (arg.checkValue) {
          const checked = await app.checkValue(arg, "argument", value, message);
          if (!checked)
            return;
        }
        if (value !== null && arg.castValue) {
          const casted = await app.castValue(arg, "argument", value, message, (value2) => message.args[arg.name] = value2);
          if (!casted)
            return;
        }
      }
    }
    if (cmd.flags) {
      for (const flag of cmd.flags) {
        const set = (value2) => message.args[flag.name] = value2;
        let {given, value} = app.resolveGivenArgument(parsedArgs, flag);
        if (!given)
          set(false);
        else if (typeof value === "boolean")
          set(value);
        else if (/^(?:true|1|on|yes|oui)$/.test(value))
          set(true);
        else if (/^(?:false|0|off|no|non)$/.test(value))
          set(false);
        else {
          set(true);
          restPositional.unshift(value);
        }
      }
    }
    message.rest = restPositional.join(" ");
    try {
      await cmd.run(message);
    } catch (error) {
      app.error(error, "handler", true);
      message.channel.send(app.CODE.stringify({
        content: `Error: ${(_p = (_o = error.message) == null ? void 0 : _o.replace(/\x1b\[\d+m/g, "")) != null ? _p : "unknown"}`,
        lang: "js"
      })).catch((error2) => {
        app.error(error2, "system");
      });
    }
  }
};
module.exports = listener;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2xpc3RlbmVycy9tZXNzYWdlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgKiBhcyBhcHAgZnJvbSBcIi4uL2FwcFwiXHJcbmltcG9ydCB5YXJnc1BhcnNlciBmcm9tIFwieWFyZ3MtcGFyc2VyXCJcclxuXHJcbmNvbnN0IGxpc3RlbmVyOiBhcHAuTGlzdGVuZXI8XCJtZXNzYWdlXCI+ID0ge1xyXG4gIGV2ZW50OiBcIm1lc3NhZ2VcIixcclxuICBhc3luYyBydW4obWVzc2FnZSkge1xyXG4gICAgaWYgKCFhcHAuaXNDb21tYW5kTWVzc2FnZShtZXNzYWdlKSkgcmV0dXJuXHJcblxyXG4gICAgY29uc3QgcHJlZml4ID0gYXdhaXQgYXBwLnByZWZpeChtZXNzYWdlLmd1aWxkID8/IHVuZGVmaW5lZClcclxuXHJcbiAgICBjb25zdCBjdXQgPSBmdW5jdGlvbiAoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgbWVzc2FnZS5jb250ZW50ID0gbWVzc2FnZS5jb250ZW50LnNsaWNlKGtleS5sZW5ndGgpLnRyaW0oKVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChtZXNzYWdlLmNvbnRlbnQuc3RhcnRzV2l0aChwcmVmaXgpKSBjdXQocHJlZml4KVxyXG4gICAgZWxzZSByZXR1cm5cclxuXHJcbiAgICBsZXQga2V5ID0gbWVzc2FnZS5jb250ZW50LnNwbGl0KC9cXHMrLylbMF1cclxuXHJcbiAgICAvLyB0dXJuIE9OL09GRlxyXG4gICAgaWYgKGtleSAhPT0gXCJ0dXJuXCIgJiYgIWFwcC5jYWNoZS5lbnN1cmU8Ym9vbGVhbj4oXCJ0dXJuXCIsIHRydWUpKSByZXR1cm5cclxuXHJcbiAgICBsZXQgY21kOiBhcHAuQ29tbWFuZCA9IGFwcC5jb21tYW5kcy5yZXNvbHZlKGtleSkgYXMgYXBwLkNvbW1hbmRcclxuXHJcbiAgICBpZiAoIWNtZCkgcmV0dXJuIG51bGxcclxuXHJcbiAgICAvLyBjaGVjayBzdWIgY29tbWFuZHNcclxuICAgIHtcclxuICAgICAgbGV0IGN1cnNvciA9IDBcclxuICAgICAgbGV0IGRlcHRoID0gMFxyXG5cclxuICAgICAgd2hpbGUgKGNtZC5zdWJzICYmIGN1cnNvciA8IGNtZC5zdWJzLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnN0IHN1YktleSA9IG1lc3NhZ2UuY29udGVudC5zcGxpdCgvXFxzKy8pW2RlcHRoICsgMV1cclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBzdWIgb2YgY21kLnN1YnMpIHtcclxuICAgICAgICAgIGlmIChzdWIubmFtZSA9PT0gc3ViS2V5KSB7XHJcbiAgICAgICAgICAgIGtleSArPSBgICR7c3ViS2V5fWBcclxuICAgICAgICAgICAgY3Vyc29yID0gMFxyXG4gICAgICAgICAgICBjbWQgPSBzdWJcclxuICAgICAgICAgICAgZGVwdGgrK1xyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChzdWIuYWxpYXNlcykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGFsaWFzIG9mIHN1Yi5hbGlhc2VzKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGFsaWFzID09PSBzdWJLZXkpIHtcclxuICAgICAgICAgICAgICAgIGtleSArPSBgICR7c3ViS2V5fWBcclxuICAgICAgICAgICAgICAgIGN1cnNvciA9IDBcclxuICAgICAgICAgICAgICAgIGNtZCA9IHN1YlxyXG4gICAgICAgICAgICAgICAgZGVwdGgrK1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY3Vyc29yKytcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjdXQoa2V5KVxyXG5cclxuICAgIC8vIHBhcnNlIENvbW1hbmRNZXNzYWdlIGFyZ3VtZW50c1xyXG4gICAgY29uc3QgcGFyc2VkQXJncyA9IHlhcmdzUGFyc2VyKG1lc3NhZ2UuY29udGVudClcclxuICAgIGNvbnN0IHJlc3RQb3NpdGlvbmFsID0gcGFyc2VkQXJncy5fID8/IFtdXHJcblxyXG4gICAgbWVzc2FnZS5hcmdzID0gKHBhcnNlZEFyZ3MuXz8uc2xpY2UoMCkgPz8gW10pLm1hcCgocG9zaXRpb25hbCkgPT4ge1xyXG4gICAgICBpZiAoL14oPzpcIi4rXCJ8Jy4rJykkLy50ZXN0KHBvc2l0aW9uYWwpKVxyXG4gICAgICAgIHJldHVybiBwb3NpdGlvbmFsLnNsaWNlKDEsIHBvc2l0aW9uYWwubGVuZ3RoIC0gMSlcclxuICAgICAgcmV0dXJuIHBvc2l0aW9uYWxcclxuICAgIH0pXHJcblxyXG4gICAgLy8gaGFuZGxlIGhlbHAgYXJndW1lbnRcclxuICAgIGlmIChwYXJzZWRBcmdzLmhlbHAgfHwgcGFyc2VkQXJncy5oKVxyXG4gICAgICByZXR1cm4gYXBwLnNlbmRDb21tYW5kRGV0YWlscyhtZXNzYWdlLCBjbWQsIHByZWZpeClcclxuXHJcbiAgICAvLyBjb29sRG93blxyXG4gICAge1xyXG4gICAgICBjb25zdCBjb29sRG93bklkID0gYCR7Y21kLm5hbWV9OiR7bWVzc2FnZS5jaGFubmVsLmlkfWBcclxuICAgICAgY29uc3QgY29vbERvd24gPSBhcHAuY2FjaGUuZW5zdXJlKFwiQ0QtXCIgKyBjb29sRG93bklkLCB7XHJcbiAgICAgICAgdGltZTogMCxcclxuICAgICAgICB0cmlnZ2VyOiBmYWxzZSxcclxuICAgICAgfSlcclxuXHJcbiAgICAgIGlmIChjbWQuY29vbERvd24gJiYgY29vbERvd24udHJpZ2dlcikge1xyXG4gICAgICAgIGlmIChEYXRlLm5vdygpID4gY29vbERvd24udGltZSArIGNtZC5jb29sRG93bikge1xyXG4gICAgICAgICAgYXBwLmNhY2hlLnNldChcIkNELVwiICsgY29vbERvd25JZCwge1xyXG4gICAgICAgICAgICB0aW1lOiAwLFxyXG4gICAgICAgICAgICB0cmlnZ2VyOiBmYWxzZSxcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBtZXNzYWdlLmNoYW5uZWwuc2VuZChcclxuICAgICAgICAgICAgbmV3IGFwcC5NZXNzYWdlRW1iZWQoKVxyXG4gICAgICAgICAgICAgIC5zZXRDb2xvcihcIlJFRFwiKVxyXG4gICAgICAgICAgICAgIC5zZXRBdXRob3IoXHJcbiAgICAgICAgICAgICAgICBgUGxlYXNlIHdhaXQgJHtNYXRoLmNlaWwoXHJcbiAgICAgICAgICAgICAgICAgIChjb29sRG93bi50aW1lICsgY21kLmNvb2xEb3duIC0gRGF0ZS5ub3coKSkgLyAxMDAwXHJcbiAgICAgICAgICAgICAgICApfSBzZWNvbmRzLi4uYCxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuY2xpZW50LnVzZXI/LmRpc3BsYXlBdmF0YXJVUkwoKVxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoYXBwLmlzR3VpbGRNZXNzYWdlKG1lc3NhZ2UpKSB7XHJcbiAgICAgIGlmIChjbWQuZG1Pbmx5KVxyXG4gICAgICAgIHJldHVybiBtZXNzYWdlLmNoYW5uZWwuc2VuZChcclxuICAgICAgICAgIG5ldyBhcHAuTWVzc2FnZUVtYmVkKClcclxuICAgICAgICAgICAgLnNldENvbG9yKFwiUkVEXCIpXHJcbiAgICAgICAgICAgIC5zZXRBdXRob3IoXHJcbiAgICAgICAgICAgICAgXCJUaGlzIGNvbW1hbmQgbXVzdCBiZSB1c2VkIGluIERNLlwiLFxyXG4gICAgICAgICAgICAgIG1lc3NhZ2UuY2xpZW50LnVzZXI/LmRpc3BsYXlBdmF0YXJVUkwoKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgaWYgKGNtZC5ndWlsZE93bmVyKVxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIG1lc3NhZ2UuZ3VpbGQub3duZXIgIT09IG1lc3NhZ2UubWVtYmVyICYmXHJcbiAgICAgICAgICBwcm9jZXNzLmVudi5PV05FUiAhPT0gbWVzc2FnZS5tZW1iZXIuaWRcclxuICAgICAgICApXHJcbiAgICAgICAgICByZXR1cm4gYXdhaXQgbWVzc2FnZS5jaGFubmVsLnNlbmQoXHJcbiAgICAgICAgICAgIG5ldyBhcHAuTWVzc2FnZUVtYmVkKClcclxuICAgICAgICAgICAgICAuc2V0Q29sb3IoXCJSRURcIilcclxuICAgICAgICAgICAgICAuc2V0QXV0aG9yKFxyXG4gICAgICAgICAgICAgICAgXCJZb3UgbXVzdCBiZSB0aGUgZ3VpbGQgb3duZXIuXCIsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmNsaWVudC51c2VyPy5kaXNwbGF5QXZhdGFyVVJMKClcclxuICAgICAgICAgICAgICApXHJcbiAgICAgICAgICApXHJcblxyXG4gICAgICBpZiAoY21kLmJvdFBlcm1pc3Npb25zKVxyXG4gICAgICAgIGZvciAoY29uc3QgcGVybWlzc2lvbiBvZiBjbWQuYm90UGVybWlzc2lvbnMpXHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICFtZXNzYWdlLmd1aWxkLm1lPy5oYXNQZXJtaXNzaW9uKHBlcm1pc3Npb24sIHtcclxuICAgICAgICAgICAgICBjaGVja0FkbWluOiB0cnVlLFxyXG4gICAgICAgICAgICAgIGNoZWNrT3duZXI6IHRydWUsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBtZXNzYWdlLmNoYW5uZWwuc2VuZChcclxuICAgICAgICAgICAgICBuZXcgYXBwLk1lc3NhZ2VFbWJlZCgpXHJcbiAgICAgICAgICAgICAgICAuc2V0Q29sb3IoXCJSRURcIilcclxuICAgICAgICAgICAgICAgIC5zZXRBdXRob3IoXHJcbiAgICAgICAgICAgICAgICAgIGBJIG5lZWQgdGhlIFxcYCR7cGVybWlzc2lvbn1cXGAgcGVybWlzc2lvbiB0byBjYWxsIHRoaXMgY29tbWFuZC5gLFxyXG4gICAgICAgICAgICAgICAgICBtZXNzYWdlLmNsaWVudC51c2VyPy5kaXNwbGF5QXZhdGFyVVJMKClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG5cclxuICAgICAgaWYgKGNtZC51c2VyUGVybWlzc2lvbnMpXHJcbiAgICAgICAgZm9yIChjb25zdCBwZXJtaXNzaW9uIG9mIGNtZC51c2VyUGVybWlzc2lvbnMpXHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICFtZXNzYWdlLm1lbWJlci5oYXNQZXJtaXNzaW9uKHBlcm1pc3Npb24sIHtcclxuICAgICAgICAgICAgICBjaGVja0FkbWluOiB0cnVlLFxyXG4gICAgICAgICAgICAgIGNoZWNrT3duZXI6IHRydWUsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBtZXNzYWdlLmNoYW5uZWwuc2VuZChcclxuICAgICAgICAgICAgICBuZXcgYXBwLk1lc3NhZ2VFbWJlZCgpXHJcbiAgICAgICAgICAgICAgICAuc2V0Q29sb3IoXCJSRURcIilcclxuICAgICAgICAgICAgICAgIC5zZXRBdXRob3IoXHJcbiAgICAgICAgICAgICAgICAgIGBZb3UgbmVlZCB0aGUgXFxgJHtwZXJtaXNzaW9ufVxcYCBwZXJtaXNzaW9uIHRvIGNhbGwgdGhpcyBjb21tYW5kLmAsXHJcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuY2xpZW50LnVzZXI/LmRpc3BsYXlBdmF0YXJVUkwoKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNtZC5ndWlsZE9ubHkpIHtcclxuICAgICAgaWYgKGFwcC5pc0RpcmVjdE1lc3NhZ2UobWVzc2FnZSkpXHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IG1lc3NhZ2UuY2hhbm5lbC5zZW5kKFxyXG4gICAgICAgICAgbmV3IGFwcC5NZXNzYWdlRW1iZWQoKVxyXG4gICAgICAgICAgICAuc2V0Q29sb3IoXCJSRURcIilcclxuICAgICAgICAgICAgLnNldEF1dGhvcihcclxuICAgICAgICAgICAgICBcIlRoaXMgY29tbWFuZCBtdXN0IGJlIHVzZWQgaW4gYSBndWlsZC5cIixcclxuICAgICAgICAgICAgICBtZXNzYWdlLmNsaWVudC51c2VyPy5kaXNwbGF5QXZhdGFyVVJMKClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY21kLmJvdE93bmVyKVxyXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuT1dORVIgIT09IG1lc3NhZ2UuYXV0aG9yLmlkKVxyXG4gICAgICAgIHJldHVybiBhd2FpdCBtZXNzYWdlLmNoYW5uZWwuc2VuZChcclxuICAgICAgICAgIG5ldyBhcHAuTWVzc2FnZUVtYmVkKClcclxuICAgICAgICAgICAgLnNldENvbG9yKFwiUkVEXCIpXHJcbiAgICAgICAgICAgIC5zZXRBdXRob3IoXHJcbiAgICAgICAgICAgICAgXCJZb3UgbXVzdCBiZSBteSBvd25lci5cIixcclxuICAgICAgICAgICAgICBtZXNzYWdlLmNsaWVudC51c2VyPy5kaXNwbGF5QXZhdGFyVVJMKClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIClcclxuXHJcbiAgICBpZiAoY21kLnBvc2l0aW9uYWwpIHtcclxuICAgICAgZm9yIChjb25zdCBwb3NpdGlvbmFsIG9mIGNtZC5wb3NpdGlvbmFsKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSBjbWQucG9zaXRpb25hbC5pbmRleE9mKHBvc2l0aW9uYWwpXHJcblxyXG4gICAgICAgIGNvbnN0IHNldCA9ICh2YWx1ZTogYW55KSA9PiB7XHJcbiAgICAgICAgICBtZXNzYWdlLmFyZ3NbcG9zaXRpb25hbC5uYW1lXSA9IHZhbHVlXHJcbiAgICAgICAgICBtZXNzYWdlLmFyZ3NbaW5kZXhdID0gdmFsdWVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gcGFyc2VkQXJncy5fW2luZGV4XVxyXG4gICAgICAgIGNvbnN0IGdpdmVuID0gdmFsdWUgIT09IHVuZGVmaW5lZFxyXG5cclxuICAgICAgICBzZXQodmFsdWUpXHJcblxyXG4gICAgICAgIGlmICghZ2l2ZW4pIHtcclxuICAgICAgICAgIGlmIChwb3NpdGlvbmFsLnJlcXVpcmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBtZXNzYWdlLmNoYW5uZWwuc2VuZChcclxuICAgICAgICAgICAgICBuZXcgYXBwLk1lc3NhZ2VFbWJlZCgpXHJcbiAgICAgICAgICAgICAgICAuc2V0Q29sb3IoXCJSRURcIilcclxuICAgICAgICAgICAgICAgIC5zZXRBdXRob3IoXHJcbiAgICAgICAgICAgICAgICAgIGBNaXNzaW5nIHBvc2l0aW9uYWwgXCIke3Bvc2l0aW9uYWwubmFtZX1cImAsXHJcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuY2xpZW50LnVzZXI/LmRpc3BsYXlBdmF0YXJVUkwoKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLnNldERlc2NyaXB0aW9uKFxyXG4gICAgICAgICAgICAgICAgICBwb3NpdGlvbmFsLmRlc2NyaXB0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgPyBcIkRlc2NyaXB0aW9uOiBcIiArIHBvc2l0aW9uYWwuZGVzY3JpcHRpb25cclxuICAgICAgICAgICAgICAgICAgICA6IGBSdW4gdGhlIGZvbGxvd2luZyBjb21tYW5kIHRvIGxlYXJuIG1vcmU6ICR7YXBwLkNPREUuc3RyaW5naWZ5KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogYCR7a2V5fSAtLWhlbHBgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICApfWBcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChwb3NpdGlvbmFsLmRlZmF1bHQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzZXQoYXdhaXQgYXBwLnNjcmFwKHBvc2l0aW9uYWwuZGVmYXVsdCwgbWVzc2FnZSkpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXQobnVsbClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHBvc2l0aW9uYWwuY2hlY2tWYWx1ZSkge1xyXG4gICAgICAgICAgY29uc3QgY2hlY2tlZCA9IGF3YWl0IGFwcC5jaGVja1ZhbHVlKFxyXG4gICAgICAgICAgICBwb3NpdGlvbmFsLFxyXG4gICAgICAgICAgICBcInBvc2l0aW9uYWxcIixcclxuICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgIG1lc3NhZ2VcclxuICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICBpZiAoIWNoZWNrZWQpIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBvc2l0aW9uYWwuY2FzdFZhbHVlKSB7XHJcbiAgICAgICAgICBjb25zdCBjYXN0ZWQgPSBhd2FpdCBhcHAuY2FzdFZhbHVlKFxyXG4gICAgICAgICAgICBwb3NpdGlvbmFsLFxyXG4gICAgICAgICAgICBcInBvc2l0aW9uYWxcIixcclxuICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgIG1lc3NhZ2UsXHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgKVxyXG5cclxuICAgICAgICAgIGlmICghY2FzdGVkKSByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc3RQb3NpdGlvbmFsLnNoaWZ0KClcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChjbWQuYXJncykge1xyXG4gICAgICBmb3IgKGNvbnN0IGFyZyBvZiBjbWQuYXJncykge1xyXG4gICAgICAgIGNvbnN0IHNldCA9ICh2YWx1ZTogYW55KSA9PiAobWVzc2FnZS5hcmdzW2FyZy5uYW1lXSA9IHZhbHVlKVxyXG5cclxuICAgICAgICBsZXQgeyBnaXZlbiwgdmFsdWUgfSA9IGFwcC5yZXNvbHZlR2l2ZW5Bcmd1bWVudChwYXJzZWRBcmdzLCBhcmcpXHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgdmFsdWUgPSB1bmRlZmluZWRcclxuXHJcbiAgICAgICAgaWYgKGFyZy5yZXF1aXJlZCAmJiAhZ2l2ZW4pXHJcbiAgICAgICAgICByZXR1cm4gYXdhaXQgbWVzc2FnZS5jaGFubmVsLnNlbmQoXHJcbiAgICAgICAgICAgIG5ldyBhcHAuTWVzc2FnZUVtYmVkKClcclxuICAgICAgICAgICAgICAuc2V0Q29sb3IoXCJSRURcIilcclxuICAgICAgICAgICAgICAuc2V0QXV0aG9yKFxyXG4gICAgICAgICAgICAgICAgYE1pc3NpbmcgYXJndW1lbnQgXCIke2FyZy5uYW1lfVwiYCxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuY2xpZW50LnVzZXI/LmRpc3BsYXlBdmF0YXJVUkwoKVxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAuc2V0RGVzY3JpcHRpb24oXHJcbiAgICAgICAgICAgICAgICBhcmcuZGVzY3JpcHRpb25cclxuICAgICAgICAgICAgICAgICAgPyBcIkRlc2NyaXB0aW9uOiBcIiArIGFyZy5kZXNjcmlwdGlvblxyXG4gICAgICAgICAgICAgICAgICA6IGBFeGFtcGxlOiBcXGAtLSR7YXJnLm5hbWV9PXNvbWVWYWx1ZVxcYGBcclxuICAgICAgICAgICAgICApXHJcbiAgICAgICAgICApXHJcblxyXG4gICAgICAgIHNldCh2YWx1ZSlcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGlmIChhcmcuZGVmYXVsdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHNldChcclxuICAgICAgICAgICAgICB0eXBlb2YgYXJnLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICAgICAgICAgPyBhd2FpdCBhcmcuZGVmYXVsdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgOiBhcmcuZGVmYXVsdFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGFyZy5jYXN0VmFsdWUgIT09IFwiYXJyYXlcIikge1xyXG4gICAgICAgICAgICBzZXQobnVsbClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZy5jaGVja1ZhbHVlKSB7XHJcbiAgICAgICAgICBjb25zdCBjaGVja2VkID0gYXdhaXQgYXBwLmNoZWNrVmFsdWUoYXJnLCBcImFyZ3VtZW50XCIsIHZhbHVlLCBtZXNzYWdlKVxyXG5cclxuICAgICAgICAgIGlmICghY2hlY2tlZCkgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgYXJnLmNhc3RWYWx1ZSkge1xyXG4gICAgICAgICAgY29uc3QgY2FzdGVkID0gYXdhaXQgYXBwLmNhc3RWYWx1ZShcclxuICAgICAgICAgICAgYXJnLFxyXG4gICAgICAgICAgICBcImFyZ3VtZW50XCIsXHJcbiAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgICAgICAodmFsdWUpID0+IChtZXNzYWdlLmFyZ3NbYXJnLm5hbWVdID0gdmFsdWUpXHJcbiAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgaWYgKCFjYXN0ZWQpIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChjbWQuZmxhZ3MpIHtcclxuICAgICAgZm9yIChjb25zdCBmbGFnIG9mIGNtZC5mbGFncykge1xyXG4gICAgICAgIGNvbnN0IHNldCA9ICh2YWx1ZTogYm9vbGVhbikgPT4gKG1lc3NhZ2UuYXJnc1tmbGFnLm5hbWVdID0gdmFsdWUpXHJcblxyXG4gICAgICAgIGxldCB7IGdpdmVuLCB2YWx1ZSB9ID0gYXBwLnJlc29sdmVHaXZlbkFyZ3VtZW50KHBhcnNlZEFyZ3MsIGZsYWcpXHJcblxyXG4gICAgICAgIGlmICghZ2l2ZW4pIHNldChmYWxzZSlcclxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSBzZXQodmFsdWUpXHJcbiAgICAgICAgZWxzZSBpZiAoL14oPzp0cnVlfDF8b258eWVzfG91aSkkLy50ZXN0KHZhbHVlKSkgc2V0KHRydWUpXHJcbiAgICAgICAgZWxzZSBpZiAoL14oPzpmYWxzZXwwfG9mZnxub3xub24pJC8udGVzdCh2YWx1ZSkpIHNldChmYWxzZSlcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHNldCh0cnVlKVxyXG4gICAgICAgICAgcmVzdFBvc2l0aW9uYWwudW5zaGlmdCh2YWx1ZSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtZXNzYWdlLnJlc3QgPSByZXN0UG9zaXRpb25hbC5qb2luKFwiIFwiKVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IGNtZC5ydW4obWVzc2FnZSlcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFwcC5lcnJvcihlcnJvciwgXCJoYW5kbGVyXCIsIHRydWUpXHJcbiAgICAgIG1lc3NhZ2UuY2hhbm5lbFxyXG4gICAgICAgIC5zZW5kKFxyXG4gICAgICAgICAgYXBwLkNPREUuc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgY29udGVudDogYEVycm9yOiAke1xyXG4gICAgICAgICAgICAgIGVycm9yLm1lc3NhZ2U/LnJlcGxhY2UoL1xceDFiXFxbXFxkK20vZywgXCJcIikgPz8gXCJ1bmtub3duXCJcclxuICAgICAgICAgICAgfWAsXHJcbiAgICAgICAgICAgIGxhbmc6IFwianNcIixcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgIGFwcC5lcnJvcihlcnJvciwgXCJzeXN0ZW1cIilcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gIH0sXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbGlzdGVuZXJcclxuIl0sCiAgIm1hcHBpbmdz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QSxrQkFBa0IsSUFBSSxjQUN0QixnQkFBZ0IsSUFBSTtBQUloQyxZQUFJO0FBRUosWUFBSSxVQUFVLFFBQVc7QUFDdkIsY0FBSSxJQUFJLFlBQVksUUFBVztBQUM3QixnQkFDRSxPQUFPLElBQUksWUFBWSxhQUNuQixNQUFNLElBQUksUUFBUSxXQUNsQixJQUFJO0FBQUEscUJBRUQsSUFBSSxjQUFjLFNBQVM7QUFDcEMsZ0JBQUk7QUFBQTtBQUFBLG1CQUVHLElBQUksWUFBWTtBQUN6QixnQkFBTSxVQUFVLE1BQU0sSUFBSSxXQUFXLEtBQUssWUFBWSxPQUFPO0FBRTdELGNBQUksQ0FBQztBQUFTO0FBQUE7QUFHaEIsWUFBSSxVQUFVLFFBQVEsSUFBSSxXQUFXO0FBQ25DLGdCQUFNLFNBQVMsTUFBTSxJQUFJLFVBQ3ZCLEtBQ0EsWUFDQSxPQUNBLFNBQ0EsQ0FBQyxXQUFXLFFBQVEsS0FBSyxJQUFJLFFBQVE7QUFHdkMsY0FBSSxDQUFDO0FBQVE7QUFBQTtBQUFBO0FBQUE7QUFLbkIsUUFBSSxJQUFJLE9BQU87QUFDYixpQkFBVyxRQUFRLElBQUksT0FBTztBQUM1QixjQUFNLE1BQU0sQ0FBQyxXQUFvQixRQUFRLEtBQUssS0FBSyxRQUFRO0FBRTNELFlBQUksQ0FBRSxPQUFPLFNBQVUsSUFBSSxxQkFBcUIsWUFBWTtBQUU1RCxZQUFJLENBQUM7QUFBTyxjQUFJO0FBQUEsaUJBQ1AsT0FBTyxVQUFVO0FBQVcsY0FBSTtBQUFBLGlCQUNoQywwQkFBMEIsS0FBSztBQUFRLGNBQUk7QUFBQSxpQkFDM0MsMkJBQTJCLEtBQUs7QUFBUSxjQUFJO0FBQUEsYUFDaEQ7QUFDSCxjQUFJO0FBQ0oseUJBQWUsUUFBUTtBQUFBO0FBQUE7QUFBQTtBQUs3QixZQUFRLE9BQU8sZUFBZSxLQUFLO0FBRW5DLFFBQUk7QUFDRixZQUFNLElBQUksSUFBSTtBQUFBLGFBQ1AsT0FBUDtBQUNBLFVBQUksTUFBTSxPQUFPLFdBQVc7QUFDNUIsY0FBUSxRQUNMLEtBQ0MsSUFBSSxLQUFLLFVBQVU7QUFBQSxRQUNqQixTQUFTLFVBQ1Asa0JBQU0sWUFBTixtQkFBZSxRQUFRLGVBQWUsUUFBdEMsWUFBNkM7QUFBQSxRQUUvQyxNQUFNO0FBQUEsVUFHVCxNQUFNLENBQUMsV0FBVTtBQUNoQixZQUFJLE1BQU0sUUFBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTTNCLE9BQU8sVUFBVTsiLAogICJuYW1lcyI6IFtdCn0K
