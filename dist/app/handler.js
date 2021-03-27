var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
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
__markAsModule(exports);
__export(exports, {
  Commands: () => Commands,
  castValue: () => castValue,
  checkValue: () => checkValue,
  commands: () => commands,
  commandsPath: () => commandsPath,
  getTypeDescriptionOf: () => getTypeDescriptionOf,
  isCommandMessage: () => isCommandMessage,
  isDirectMessage: () => isDirectMessage,
  isFlag: () => isFlag,
  isGuildMessage: () => isGuildMessage,
  listenersPath: () => listenersPath,
  resolveGivenArgument: () => resolveGivenArgument,
  sendCommandDetails: () => sendCommandDetails,
  validateArguments: () => validateArguments
});
var import_discord = __toModule(require("discord.js"));
var import_path = __toModule(require("path"));
var import_tims = __toModule(require("tims"));
var import_chalk = __toModule(require("chalk"));
var import_regex_parser = __toModule(require("regex-parser"));
var core = __toModule(require("./core"));
var logger = __toModule(require("./logger"));
var _a, _b;
function isFlag(arg) {
  return arg.hasOwnProperty("flag");
}
class Commands extends import_discord.default.Collection {
  resolve(key) {
    return this.find((command) => {
      var _a2;
      return key === command.name || !!((_a2 = command.aliases) == null ? void 0 : _a2.some((alias) => key === alias));
    });
  }
  add(command) {
    validateArguments(command);
    this.set(command.name, command);
  }
}
function resolveGivenArgument(parsedArgs, arg) {
  let usedName = arg.name;
  let given = parsedArgs.hasOwnProperty(arg.name);
  let value = parsedArgs[arg.name];
  if (!given && arg.aliases) {
    if (typeof arg.aliases === "string") {
      usedName = arg.aliases;
      given = parsedArgs.hasOwnProperty(arg.aliases);
      value = parsedArgs[arg.aliases];
    } else {
      for (const alias of arg.aliases) {
        if (parsedArgs.hasOwnProperty(alias)) {
          usedName = alias;
          given = true;
          value = parsedArgs[alias];
          break;
        }
      }
    }
  }
  if (!given && isFlag(arg)) {
    given = parsedArgs.hasOwnProperty(arg.flag);
    value = parsedArgs[arg.flag];
    usedName = arg.flag;
  }
  return {given, usedName, value};
}
async function checkValue(subject, subjectType, value, message) {
  var _a2;
  if (!subject.checkValue)
    return true;
  if (typeof subject.checkValue === "function" ? !await subject.checkValue(value, message) : !subject.checkValue.test(value)) {
    await message.channel.send(new import_discord.default.MessageEmbed().setColor("RED").setAuthor(`Bad ${subjectType} ${typeof subject.checkValue === "function" ? "tested " : "pattern"} "${subject.name}".`, (_a2 = message.client.user) == null ? void 0 : _a2.displayAvatarURL()).setDescription(typeof subject.checkValue === "function" ? core.CODE.stringify({
      content: core.CODE.format(subject.checkValue.toString()),
      lang: "js"
    }) : `Expected pattern: \`${subject.checkValue.source}\``));
    return false;
  }
  return true;
}
async function castValue(subject, subjectType, baseValue, message, setValue) {
  var _a2;
  if (!subject.castValue)
    return true;
  const empty = new Error("The value is empty!");
  try {
    switch (subject.castValue) {
      case "boolean":
        setValue(/true|1|oui|on|o|y|yes/i.test(baseValue != null ? baseValue : ""));
        break;
      case "date":
        if (!baseValue) {
          throw empty;
        } else if (baseValue === "now") {
          setValue(new Date());
        } else if (/^[1-9]\d*$/.test(baseValue)) {
          setValue(Number(baseValue));
        } else {
          setValue(new Date(baseValue));
        }
        break;
      case "json":
        if (baseValue)
          setValue(JSON.parse(baseValue));
        else
          throw empty;
        break;
      case "number":
        setValue(Number(baseValue));
        if (!/-?(?:0|[1-9]\d*)/.test(baseValue != null ? baseValue : ""))
          throw new Error("The value is not a Number!");
        break;
      case "regex":
        if (baseValue)
          setValue((0, import_regex_parser.default)(baseValue));
        else
          throw empty;
        break;
      case "array":
        if (baseValue === void 0)
          setValue([]);
        else
          setValue(baseValue.split(/[,;|]/));
        break;
      default:
        if (baseValue === void 0)
          throw empty;
        else
          setValue(await subject.castValue(baseValue, message));
        break;
    }
  } catch (error) {
    await message.channel.send(new import_discord.default.MessageEmbed().setColor("RED").setAuthor(`Bad ${subjectType} type "${subject.name}".`, (_a2 = message.client.user) == null ? void 0 : _a2.displayAvatarURL()).setDescription(`Cannot cast the value of the "${subject.name}" ${subjectType} to ${typeof subject.castValue === "function" ? "{*custom type*}" : "`" + subject.castValue + "`"}
${core.CODE.stringify({
      content: `Error: ${error.message}`,
      lang: "js"
    })}`));
    return false;
  }
  return true;
}
function validateArguments(command, path2) {
  const help = {
    name: "help",
    flag: "h",
    description: "Get help from the command"
  };
  command.path = path2;
  if (!command.flags)
    command.flags = [help];
  else
    command.flags.push(help);
  for (const flag of command.flags)
    if (flag.flag) {
      if (flag.flag.length !== 1)
        throw new Error(`The "${flag.name}" flag length of "${path2 ? path2 + " " + command.name : command.name}" command must be equal to 1`);
    }
  logger.log(`loaded command ${import_chalk.default.blue((path2 ? path2 + " " : "") + command.name)}`, "handler");
  if (command.subs)
    for (const sub of command.subs)
      validateArguments(sub, path2 ? path2 + " " + command.name : command.name);
}
function getTypeDescriptionOf(arg) {
  if (arg.typeDescription)
    return arg.typeDescription;
  if (!arg.castValue)
    return "string";
  if (typeof arg.castValue === "string") {
    if (arg.castValue === "array")
      return "Array<string>";
    return arg.castValue;
  }
  return "any";
}
async function sendCommandDetails(message, cmd, prefix) {
  var _a2, _b2, _c, _d, _e;
  let pattern = `${prefix}${cmd.path ? cmd.path + " " : ""}${cmd.name}`;
  const positionalList = [];
  const argumentList = [];
  const flagList = [];
  if (cmd.positional) {
    for (const positional of cmd.positional) {
      const dft = positional.default !== void 0 ? `="${await core.scrap(positional.default, message)}"` : "";
      positionalList.push(positional.required && !dft ? `<${positional.name}>` : `[${positional.name}${dft}]`);
    }
  }
  if (cmd.args) {
    for (const arg of cmd.args) {
      const dft = arg.default !== void 0 ? `="${core.scrap(arg.default, message)}"` : "";
      argumentList.push(arg.required ? `\`--${arg.name}${dft}\` (\`${getTypeDescriptionOf(arg)}\`) ${(_a2 = arg.description) != null ? _a2 : ""}` : `\`[--${arg.name}${dft}]\` (\`${getTypeDescriptionOf(arg)}\`) ${(_b2 = arg.description) != null ? _b2 : ""}`);
    }
  }
  if (cmd.flags) {
    for (const flag of cmd.flags) {
      flagList.push(`[--${flag.name}]`);
    }
  }
  const specialPermissions = [];
  if (cmd.botOwner)
    specialPermissions.push("BOT_OWNER");
  if (cmd.guildOwner)
    specialPermissions.push("GUILD_OWNER");
  const embed = new import_discord.default.MessageEmbed().setColor("BLURPLE").setAuthor("Command details", (_c = message.client.user) == null ? void 0 : _c.displayAvatarURL()).setTitle(`${pattern} ${[...positionalList, ...flagList].join(" ")} ${cmd.args ? "[OPTIONS]" : ""}`).setDescription((_e = (_d = cmd.longDescription) != null ? _d : cmd.description) != null ? _e : "no description");
  if (argumentList.length > 0)
    embed.addField("options", argumentList.join("\n"), false);
  if (cmd.aliases)
    embed.addField("aliases", cmd.aliases.map((alias) => `\`${alias}\``).join(", "), true);
  if (cmd.examples)
    embed.addField("examples:", core.CODE.stringify({
      content: cmd.examples.map((example) => prefix + example).join("\n")
    }), false);
  if (cmd.botPermissions)
    embed.addField("bot permissions", cmd.botPermissions.join(", "), true);
  if (cmd.userPermissions)
    embed.addField("user permissions", cmd.userPermissions.join(", "), true);
  if (specialPermissions.length > 0)
    embed.addField("special permissions", specialPermissions.map((perm) => `\`${perm}\``).join(", "), true);
  if (cmd.coolDown)
    embed.addField("cool down", import_tims.default.duration(cmd.coolDown), true);
  if (cmd.subs)
    embed.addField("sub commands:", cmd.subs.map((sub) => {
      var _a3;
      return `**${sub.name}**: ${(_a3 = sub.description) != null ? _a3 : "no description"}`;
    }).join("\n"), true);
  await message.channel.send(embed);
}
function isCommandMessage(message) {
  return !message.system && !!message.channel;
}
function isGuildMessage(message) {
  return !!message.guild && message.channel instanceof import_discord.default.GuildChannel;
}
function isDirectMessage(message) {
  return message.channel instanceof import_discord.default.DMChannel;
}
const commands = new Commands();
const commandsPath = (_a = process.env.COMMANDS_PATH) != null ? _a : import_path.default.join(process.cwd(), "dist", "commands");
const listenersPath = (_b = process.env.LISTENERS_PATH) != null ? _b : import_path.default.join(process.cwd(), "dist", "listeners");
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2FwcC9oYW5kbGVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgRGlzY29yZCBmcm9tIFwiZGlzY29yZC5qc1wiXHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCJcclxuaW1wb3J0IHRpbXMgZnJvbSBcInRpbXNcIlxyXG5pbXBvcnQgY2hhbGsgZnJvbSBcImNoYWxrXCJcclxuaW1wb3J0IHJlZ2V4UGFyc2VyIGZyb20gXCJyZWdleC1wYXJzZXJcIlxyXG5cclxuaW1wb3J0ICogYXMgY29yZSBmcm9tIFwiLi9jb3JlXCJcclxuaW1wb3J0ICogYXMgbG9nZ2VyIGZyb20gXCIuL2xvZ2dlclwiXHJcbmltcG9ydCB5YXJnc1BhcnNlciBmcm9tIFwieWFyZ3MtcGFyc2VyXCJcclxuXHJcbmV4cG9ydCB0eXBlIENvbW1hbmRNZXNzYWdlID0gRGlzY29yZC5NZXNzYWdlICYge1xyXG4gIGFyZ3M6IHsgW25hbWU6IHN0cmluZ106IGFueSB9ICYgYW55W11cclxuICByZXN0OiBzdHJpbmdcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgR3VpbGRNZXNzYWdlID0gQ29tbWFuZE1lc3NhZ2UgJiB7XHJcbiAgY2hhbm5lbDogRGlzY29yZC5UZXh0Q2hhbm5lbCAmIERpc2NvcmQuR3VpbGRDaGFubmVsXHJcbiAgZ3VpbGQ6IERpc2NvcmQuR3VpbGRcclxuICBtZW1iZXI6IERpc2NvcmQuR3VpbGRNZW1iZXJcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgRGlyZWN0TWVzc2FnZSA9IENvbW1hbmRNZXNzYWdlICYge1xyXG4gIGNoYW5uZWw6IERpc2NvcmQuRE1DaGFubmVsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXJndW1lbnQ8TWVzc2FnZSBleHRlbmRzIENvbW1hbmRNZXNzYWdlPiB7XHJcbiAgbmFtZTogc3RyaW5nXHJcbiAgYWxpYXNlcz86IHN0cmluZ1tdIHwgc3RyaW5nXHJcbiAgZGVmYXVsdD86IHN0cmluZyB8ICgobWVzc2FnZTogTWVzc2FnZSkgPT4gc3RyaW5nIHwgUHJvbWlzZTxzdHJpbmc+KVxyXG4gIHJlcXVpcmVkPzogYm9vbGVhblxyXG4gIGNhc3RWYWx1ZT86XHJcbiAgICB8IFwibnVtYmVyXCJcclxuICAgIHwgXCJkYXRlXCJcclxuICAgIHwgXCJqc29uXCJcclxuICAgIHwgXCJib29sZWFuXCJcclxuICAgIHwgXCJyZWdleFwiXHJcbiAgICB8IFwiYXJyYXlcIlxyXG4gICAgfCAoKHZhbHVlOiBzdHJpbmcsIG1lc3NhZ2U6IE1lc3NhZ2UpID0+IHVua25vd24pXHJcbiAgY2hlY2tWYWx1ZT86XHJcbiAgICB8IFJlZ0V4cFxyXG4gICAgfCAoKHZhbHVlOiBzdHJpbmcsIG1lc3NhZ2U6IE1lc3NhZ2UpID0+IGJvb2xlYW4gfCBQcm9taXNlPGJvb2xlYW4+KVxyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmdcclxuICB0eXBlRGVzY3JpcHRpb24/OiBzdHJpbmdcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQb3NpdGlvbmFsPE1lc3NhZ2UgZXh0ZW5kcyBDb21tYW5kTWVzc2FnZT5cclxuICBleHRlbmRzIE9taXQ8QXJndW1lbnQ8TWVzc2FnZT4sIFwiYWxpYXNlc1wiPiB7fVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBGbGFnPE1lc3NhZ2UgZXh0ZW5kcyBDb21tYW5kTWVzc2FnZT5cclxuICBleHRlbmRzIFBpY2s8QXJndW1lbnQ8TWVzc2FnZT4sIFwibmFtZVwiIHwgXCJhbGlhc2VzXCIgfCBcImRlc2NyaXB0aW9uXCI+IHtcclxuICBmbGFnOiBzdHJpbmdcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRmxhZzxNZXNzYWdlIGV4dGVuZHMgQ29tbWFuZE1lc3NhZ2U+KFxyXG4gIGFyZzogQXJndW1lbnQ8TWVzc2FnZT5cclxuKTogYXJnIGlzIEZsYWc8TWVzc2FnZT4ge1xyXG4gIHJldHVybiBhcmcuaGFzT3duUHJvcGVydHkoXCJmbGFnXCIpXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29tbWFuZDxNZXNzYWdlIGV4dGVuZHMgQ29tbWFuZE1lc3NhZ2UgPSBDb21tYW5kTWVzc2FnZT4ge1xyXG4gIG5hbWU6IHN0cmluZ1xyXG4gIGFsaWFzZXM/OiBzdHJpbmdbXVxyXG4gIC8qKlxyXG4gICAqIENvb2wgZG93biBvZiBjb21tYW5kIChpbiBtcylcclxuICAgKi9cclxuICBjb29sRG93bj86IG51bWJlclxyXG4gIC8qKlxyXG4gICAqIFNob3J0IGRlc2NyaXB0aW9uIGRpc3BsYXllZCBpbiBoZWxwIG1lbnVcclxuICAgKi9cclxuICBkZXNjcmlwdGlvbjogc3RyaW5nXHJcbiAgLyoqXHJcbiAgICogRGVzY3JpcHRpb24gZGlzcGxheWVkIGluIGNvbW1hbmQgZGV0YWlsXHJcbiAgICovXHJcbiAgbG9uZ0Rlc2NyaXB0aW9uPzogc3RyaW5nXHJcbiAgZXhhbXBsZXM/OiBzdHJpbmdbXVxyXG4gIGd1aWxkT3duZXI/OiBib29sZWFuXHJcbiAgZ3VpbGRPbmx5PzogYm9vbGVhblxyXG4gIGJvdE93bmVyPzogYm9vbGVhblxyXG4gIGRtT25seT86IGJvb2xlYW5cclxuICB1c2VyUGVybWlzc2lvbnM/OiBEaXNjb3JkLlBlcm1pc3Npb25TdHJpbmdbXVxyXG4gIGJvdFBlcm1pc3Npb25zPzogRGlzY29yZC5QZXJtaXNzaW9uU3RyaW5nW11cclxuICAvKipcclxuICAgKiBZYXJncyBwb3NpdGlvbmFsXHJcbiAgICovXHJcbiAgcG9zaXRpb25hbD86IFBvc2l0aW9uYWw8TWVzc2FnZT5bXVxyXG4gIC8qKlxyXG4gICAqIFlhcmdzIGFyZ3VtZW50cyAoZS5nLiBgLS1teUFyZ3VtZW50PXZhbHVlYClcclxuICAgKi9cclxuICBhcmdzPzogQXJndW1lbnQ8TWVzc2FnZT5bXVxyXG4gIC8qKlxyXG4gICAqIFlhcmdzIGZsYWcgYXJndW1lbnRzIChlLmcuIGAtLW15RmxhZyAtZmApXHJcbiAgICovXHJcbiAgZmxhZ3M/OiBGbGFnPE1lc3NhZ2U+W11cclxuICBydW46IChtZXNzYWdlOiBNZXNzYWdlKSA9PiB1bmtub3duXHJcbiAgLyoqXHJcbiAgICogU3ViLWNvbW1hbmRzXHJcbiAgICovXHJcbiAgc3Vicz86IENvbW1hbmQ8TWVzc2FnZT5bXVxyXG4gIC8qKlxyXG4gICAqIFRoaXMgcGF0aCBpcyBhdXRvbWF0aWNhbGx5IHNldHVwIG9uIGJvdCBydW5uaW5nLlxyXG4gICAqL1xyXG4gIHBhdGg/OiBzdHJpbmdcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgTGlzdGVuZXI8RXZlbnROYW1lIGV4dGVuZHMga2V5b2YgRGlzY29yZC5DbGllbnRFdmVudHM+ID0ge1xyXG4gIGV2ZW50OiBFdmVudE5hbWVcclxuICBydW46ICguLi5hcmdzOiBEaXNjb3JkLkNsaWVudEV2ZW50c1tFdmVudE5hbWVdKSA9PiB1bmtub3duXHJcbiAgb25jZT86IGJvb2xlYW5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbW1hbmRzIGV4dGVuZHMgRGlzY29yZC5Db2xsZWN0aW9uPHN0cmluZywgQ29tbWFuZDxhbnk+PiB7XHJcbiAgcHVibGljIHJlc29sdmU8TWVzc2FnZSBleHRlbmRzIENvbW1hbmRNZXNzYWdlPihcclxuICAgIGtleTogc3RyaW5nXHJcbiAgKTogQ29tbWFuZDxNZXNzYWdlPiB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kKChjb21tYW5kKSA9PiB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAga2V5ID09PSBjb21tYW5kLm5hbWUgfHxcclxuICAgICAgICAhIWNvbW1hbmQuYWxpYXNlcz8uc29tZSgoYWxpYXMpID0+IGtleSA9PT0gYWxpYXMpXHJcbiAgICAgIClcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkPE1lc3NhZ2UgZXh0ZW5kcyBDb21tYW5kTWVzc2FnZT4oY29tbWFuZDogQ29tbWFuZDxNZXNzYWdlPikge1xyXG4gICAgdmFsaWRhdGVBcmd1bWVudHMoY29tbWFuZClcclxuICAgIHRoaXMuc2V0KGNvbW1hbmQubmFtZSwgY29tbWFuZClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlR2l2ZW5Bcmd1bWVudDxNZXNzYWdlIGV4dGVuZHMgQ29tbWFuZE1lc3NhZ2U+KFxyXG4gIHBhcnNlZEFyZ3M6IHlhcmdzUGFyc2VyLkFyZ3VtZW50cyxcclxuICBhcmc6IEFyZ3VtZW50PE1lc3NhZ2U+IHwgRmxhZzxNZXNzYWdlPlxyXG4pOiB7IGdpdmVuOiBib29sZWFuOyB1c2VkTmFtZTogc3RyaW5nOyB2YWx1ZTogYW55IH0ge1xyXG4gIGxldCB1c2VkTmFtZSA9IGFyZy5uYW1lXHJcbiAgbGV0IGdpdmVuID0gcGFyc2VkQXJncy5oYXNPd25Qcm9wZXJ0eShhcmcubmFtZSlcclxuICBsZXQgdmFsdWUgPSBwYXJzZWRBcmdzW2FyZy5uYW1lXVxyXG5cclxuICBpZiAoIWdpdmVuICYmIGFyZy5hbGlhc2VzKSB7XHJcbiAgICBpZiAodHlwZW9mIGFyZy5hbGlhc2VzID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIHVzZWROYW1lID0gYXJnLmFsaWFzZXNcclxuICAgICAgZ2l2ZW4gPSBwYXJzZWRBcmdzLmhhc093blByb3BlcnR5KGFyZy5hbGlhc2VzKVxyXG4gICAgICB2YWx1ZSA9IHBhcnNlZEFyZ3NbYXJnLmFsaWFzZXNdXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKGNvbnN0IGFsaWFzIG9mIGFyZy5hbGlhc2VzKSB7XHJcbiAgICAgICAgaWYgKHBhcnNlZEFyZ3MuaGFzT3duUHJvcGVydHkoYWxpYXMpKSB7XHJcbiAgICAgICAgICB1c2VkTmFtZSA9IGFsaWFzXHJcbiAgICAgICAgICBnaXZlbiA9IHRydWVcclxuICAgICAgICAgIHZhbHVlID0gcGFyc2VkQXJnc1thbGlhc11cclxuICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAoIWdpdmVuICYmIGlzRmxhZyhhcmcpKSB7XHJcbiAgICBnaXZlbiA9IHBhcnNlZEFyZ3MuaGFzT3duUHJvcGVydHkoYXJnLmZsYWcpXHJcbiAgICB2YWx1ZSA9IHBhcnNlZEFyZ3NbYXJnLmZsYWddXHJcbiAgICB1c2VkTmFtZSA9IGFyZy5mbGFnXHJcbiAgfVxyXG5cclxuICByZXR1cm4geyBnaXZlbiwgdXNlZE5hbWUsIHZhbHVlIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrVmFsdWU8TWVzc2FnZSBleHRlbmRzIENvbW1hbmRNZXNzYWdlPihcclxuICBzdWJqZWN0OiBQaWNrPEFyZ3VtZW50PE1lc3NhZ2U+LCBcImNoZWNrVmFsdWVcIiB8IFwibmFtZVwiPixcclxuICBzdWJqZWN0VHlwZTogXCJwb3NpdGlvbmFsXCIgfCBcImFyZ3VtZW50XCIsXHJcbiAgdmFsdWU6IHN0cmluZyxcclxuICBtZXNzYWdlOiBNZXNzYWdlXHJcbik6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gIGlmICghc3ViamVjdC5jaGVja1ZhbHVlKSByZXR1cm4gdHJ1ZVxyXG5cclxuICBpZiAoXHJcbiAgICB0eXBlb2Ygc3ViamVjdC5jaGVja1ZhbHVlID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgPyAhKGF3YWl0IHN1YmplY3QuY2hlY2tWYWx1ZSh2YWx1ZSwgbWVzc2FnZSkpXHJcbiAgICAgIDogIXN1YmplY3QuY2hlY2tWYWx1ZS50ZXN0KHZhbHVlKVxyXG4gICkge1xyXG4gICAgYXdhaXQgbWVzc2FnZS5jaGFubmVsLnNlbmQoXHJcbiAgICAgIG5ldyBEaXNjb3JkLk1lc3NhZ2VFbWJlZCgpXHJcbiAgICAgICAgLnNldENvbG9yKFwiUkVEXCIpXHJcbiAgICAgICAgLnNldEF1dGhvcihcclxuICAgICAgICAgIGBCYWQgJHtzdWJqZWN0VHlwZX0gJHtcclxuICAgICAgICAgICAgdHlwZW9mIHN1YmplY3QuY2hlY2tWYWx1ZSA9PT0gXCJmdW5jdGlvblwiID8gXCJ0ZXN0ZWQgXCIgOiBcInBhdHRlcm5cIlxyXG4gICAgICAgICAgfSBcIiR7c3ViamVjdC5uYW1lfVwiLmAsXHJcbiAgICAgICAgICBtZXNzYWdlLmNsaWVudC51c2VyPy5kaXNwbGF5QXZhdGFyVVJMKClcclxuICAgICAgICApXHJcbiAgICAgICAgLnNldERlc2NyaXB0aW9uKFxyXG4gICAgICAgICAgdHlwZW9mIHN1YmplY3QuY2hlY2tWYWx1ZSA9PT0gXCJmdW5jdGlvblwiXHJcbiAgICAgICAgICAgID8gY29yZS5DT0RFLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBjb3JlLkNPREUuZm9ybWF0KHN1YmplY3QuY2hlY2tWYWx1ZS50b1N0cmluZygpKSxcclxuICAgICAgICAgICAgICAgIGxhbmc6IFwianNcIixcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA6IGBFeHBlY3RlZCBwYXR0ZXJuOiBcXGAke3N1YmplY3QuY2hlY2tWYWx1ZS5zb3VyY2V9XFxgYFxyXG4gICAgICAgIClcclxuICAgIClcclxuXHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcbiAgcmV0dXJuIHRydWVcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNhc3RWYWx1ZTxNZXNzYWdlIGV4dGVuZHMgQ29tbWFuZE1lc3NhZ2U+KFxyXG4gIHN1YmplY3Q6IFBpY2s8QXJndW1lbnQ8TWVzc2FnZT4sIFwiY2FzdFZhbHVlXCIgfCBcIm5hbWVcIj4sXHJcbiAgc3ViamVjdFR5cGU6IFwicG9zaXRpb25hbFwiIHwgXCJhcmd1bWVudFwiLFxyXG4gIGJhc2VWYWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxyXG4gIG1lc3NhZ2U6IE1lc3NhZ2UsXHJcbiAgc2V0VmFsdWU6ICh2YWx1ZTogYW55KSA9PiB1bmtub3duXHJcbik6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gIGlmICghc3ViamVjdC5jYXN0VmFsdWUpIHJldHVybiB0cnVlXHJcblxyXG4gIGNvbnN0IGVtcHR5ID0gbmV3IEVycm9yKFwiVGhlIHZhbHVlIGlzIGVtcHR5IVwiKVxyXG5cclxuICB0cnkge1xyXG4gICAgc3dpdGNoIChzdWJqZWN0LmNhc3RWYWx1ZSkge1xyXG4gICAgICBjYXNlIFwiYm9vbGVhblwiOlxyXG4gICAgICAgIHNldFZhbHVlKC90cnVlfDF8b3VpfG9ufG98eXx5ZXMvaS50ZXN0KGJhc2VWYWx1ZSA/PyBcIlwiKSlcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlIFwiZGF0ZVwiOlxyXG4gICAgICAgIGlmICghYmFzZVZhbHVlKSB7XHJcbiAgICAgICAgICB0aHJvdyBlbXB0eVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYmFzZVZhbHVlID09PSBcIm5vd1wiKSB7XHJcbiAgICAgICAgICBzZXRWYWx1ZShuZXcgRGF0ZSgpKVxyXG4gICAgICAgIH0gZWxzZSBpZiAoL15bMS05XVxcZCokLy50ZXN0KGJhc2VWYWx1ZSkpIHtcclxuICAgICAgICAgIHNldFZhbHVlKE51bWJlcihiYXNlVmFsdWUpKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzZXRWYWx1ZShuZXcgRGF0ZShiYXNlVmFsdWUpKVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlIFwianNvblwiOlxyXG4gICAgICAgIGlmIChiYXNlVmFsdWUpIHNldFZhbHVlKEpTT04ucGFyc2UoYmFzZVZhbHVlKSlcclxuICAgICAgICBlbHNlIHRocm93IGVtcHR5XHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgY2FzZSBcIm51bWJlclwiOlxyXG4gICAgICAgIHNldFZhbHVlKE51bWJlcihiYXNlVmFsdWUpKVxyXG4gICAgICAgIGlmICghLy0/KD86MHxbMS05XVxcZCopLy50ZXN0KGJhc2VWYWx1ZSA/PyBcIlwiKSlcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSB2YWx1ZSBpcyBub3QgYSBOdW1iZXIhXCIpXHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgY2FzZSBcInJlZ2V4XCI6XHJcbiAgICAgICAgaWYgKGJhc2VWYWx1ZSkgc2V0VmFsdWUocmVnZXhQYXJzZXIoYmFzZVZhbHVlKSlcclxuICAgICAgICBlbHNlIHRocm93IGVtcHR5XHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgY2FzZSBcImFycmF5XCI6XHJcbiAgICAgICAgaWYgKGJhc2VWYWx1ZSA9PT0gdW5kZWZpbmVkKSBzZXRWYWx1ZShbXSlcclxuICAgICAgICBlbHNlIHNldFZhbHVlKGJhc2VWYWx1ZS5zcGxpdCgvWyw7fF0vKSlcclxuICAgICAgICBicmVha1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGlmIChiYXNlVmFsdWUgPT09IHVuZGVmaW5lZCkgdGhyb3cgZW1wdHlcclxuICAgICAgICBlbHNlIHNldFZhbHVlKGF3YWl0IHN1YmplY3QuY2FzdFZhbHVlKGJhc2VWYWx1ZSwgbWVzc2FnZSkpXHJcbiAgICAgICAgYnJlYWtcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgYXdhaXQgbWVzc2FnZS5jaGFubmVsLnNlbmQoXHJcbiAgICAgIG5ldyBEaXNjb3JkLk1lc3NhZ2VFbWJlZCgpXHJcbiAgICAgICAgLnNldENvbG9yKFwiUkVEXCIpXHJcbiAgICAgICAgLnNldEF1dGhvcihcclxuICAgICAgICAgIGBCYWQgJHtzdWJqZWN0VHlwZX0gdHlwZSBcIiR7c3ViamVjdC5uYW1lfVwiLmAsXHJcbiAgICAgICAgICBtZXNzYWdlLmNsaWVudC51c2VyPy5kaXNwbGF5QXZhdGFyVVJMKClcclxuICAgICAgICApXHJcbiAgICAgICAgLnNldERlc2NyaXB0aW9uKFxyXG4gICAgICAgICAgYENhbm5vdCBjYXN0IHRoZSB2YWx1ZSBvZiB0aGUgXCIke3N1YmplY3QubmFtZX1cIiAke3N1YmplY3RUeXBlfSB0byAke1xyXG4gICAgICAgICAgICB0eXBlb2Ygc3ViamVjdC5jYXN0VmFsdWUgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICAgICAgID8gXCJ7KmN1c3RvbSB0eXBlKn1cIlxyXG4gICAgICAgICAgICAgIDogXCJgXCIgKyBzdWJqZWN0LmNhc3RWYWx1ZSArIFwiYFwiXHJcbiAgICAgICAgICB9XFxuJHtjb3JlLkNPREUuc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgY29udGVudDogYEVycm9yOiAke2Vycm9yLm1lc3NhZ2V9YCxcclxuICAgICAgICAgICAgbGFuZzogXCJqc1wiLFxyXG4gICAgICAgICAgfSl9YFxyXG4gICAgICAgIClcclxuICAgIClcclxuXHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcbiAgcmV0dXJuIHRydWVcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlQXJndW1lbnRzPE1lc3NhZ2UgZXh0ZW5kcyBDb21tYW5kTWVzc2FnZT4oXHJcbiAgY29tbWFuZDogQ29tbWFuZDxNZXNzYWdlPixcclxuICBwYXRoPzogc3RyaW5nXHJcbik6IHZvaWQgfCBuZXZlciB7XHJcbiAgY29uc3QgaGVscDogRmxhZzxNZXNzYWdlPiA9IHtcclxuICAgIG5hbWU6IFwiaGVscFwiLFxyXG4gICAgZmxhZzogXCJoXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJHZXQgaGVscCBmcm9tIHRoZSBjb21tYW5kXCIsXHJcbiAgfVxyXG4gIGNvbW1hbmQucGF0aCA9IHBhdGhcclxuXHJcbiAgaWYgKCFjb21tYW5kLmZsYWdzKSBjb21tYW5kLmZsYWdzID0gW2hlbHBdXHJcbiAgZWxzZSBjb21tYW5kLmZsYWdzLnB1c2goaGVscClcclxuXHJcbiAgZm9yIChjb25zdCBmbGFnIG9mIGNvbW1hbmQuZmxhZ3MpXHJcbiAgICBpZiAoZmxhZy5mbGFnKVxyXG4gICAgICBpZiAoZmxhZy5mbGFnLmxlbmd0aCAhPT0gMSlcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICBgVGhlIFwiJHtmbGFnLm5hbWV9XCIgZmxhZyBsZW5ndGggb2YgXCIke1xyXG4gICAgICAgICAgICBwYXRoID8gcGF0aCArIFwiIFwiICsgY29tbWFuZC5uYW1lIDogY29tbWFuZC5uYW1lXHJcbiAgICAgICAgICB9XCIgY29tbWFuZCBtdXN0IGJlIGVxdWFsIHRvIDFgXHJcbiAgICAgICAgKVxyXG5cclxuICBsb2dnZXIubG9nKFxyXG4gICAgYGxvYWRlZCBjb21tYW5kICR7Y2hhbGsuYmx1ZSgocGF0aCA/IHBhdGggKyBcIiBcIiA6IFwiXCIpICsgY29tbWFuZC5uYW1lKX1gLFxyXG4gICAgXCJoYW5kbGVyXCJcclxuICApXHJcblxyXG4gIGlmIChjb21tYW5kLnN1YnMpXHJcbiAgICBmb3IgKGNvbnN0IHN1YiBvZiBjb21tYW5kLnN1YnMpXHJcbiAgICAgIHZhbGlkYXRlQXJndW1lbnRzKHN1YiwgcGF0aCA/IHBhdGggKyBcIiBcIiArIGNvbW1hbmQubmFtZSA6IGNvbW1hbmQubmFtZSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFR5cGVEZXNjcmlwdGlvbk9mPE1lc3NhZ2UgZXh0ZW5kcyBDb21tYW5kTWVzc2FnZT4oXHJcbiAgYXJnOiBBcmd1bWVudDxNZXNzYWdlPlxyXG4pIHtcclxuICBpZiAoYXJnLnR5cGVEZXNjcmlwdGlvbikgcmV0dXJuIGFyZy50eXBlRGVzY3JpcHRpb25cclxuICBpZiAoIWFyZy5jYXN0VmFsdWUpIHJldHVybiBcInN0cmluZ1wiXHJcbiAgaWYgKHR5cGVvZiBhcmcuY2FzdFZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBpZiAoYXJnLmNhc3RWYWx1ZSA9PT0gXCJhcnJheVwiKSByZXR1cm4gXCJBcnJheTxzdHJpbmc+XCJcclxuICAgIHJldHVybiBhcmcuY2FzdFZhbHVlXHJcbiAgfVxyXG4gIHJldHVybiBcImFueVwiXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZW5kQ29tbWFuZERldGFpbHM8TWVzc2FnZSBleHRlbmRzIENvbW1hbmRNZXNzYWdlPihcclxuICBtZXNzYWdlOiBNZXNzYWdlLFxyXG4gIGNtZDogQ29tbWFuZDxNZXNzYWdlPixcclxuICBwcmVmaXg6IHN0cmluZ1xyXG4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICBsZXQgcGF0dGVybiA9IGAke3ByZWZpeH0ke2NtZC5wYXRoID8gY21kLnBhdGggKyBcIiBcIiA6IFwiXCJ9JHtjbWQubmFtZX1gXHJcblxyXG4gIGNvbnN0IHBvc2l0aW9uYWxMaXN0OiBzdHJpbmdbXSA9IFtdXHJcbiAgY29uc3QgYXJndW1lbnRMaXN0OiBzdHJpbmdbXSA9IFtdXHJcbiAgY29uc3QgZmxhZ0xpc3Q6IHN0cmluZ1tdID0gW11cclxuXHJcbiAgaWYgKGNtZC5wb3NpdGlvbmFsKSB7XHJcbiAgICBmb3IgKGNvbnN0IHBvc2l0aW9uYWwgb2YgY21kLnBvc2l0aW9uYWwpIHtcclxuICAgICAgY29uc3QgZGZ0ID1cclxuICAgICAgICBwb3NpdGlvbmFsLmRlZmF1bHQgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgPyBgPVwiJHthd2FpdCBjb3JlLnNjcmFwKHBvc2l0aW9uYWwuZGVmYXVsdCwgbWVzc2FnZSl9XCJgXHJcbiAgICAgICAgICA6IFwiXCJcclxuICAgICAgcG9zaXRpb25hbExpc3QucHVzaChcclxuICAgICAgICBwb3NpdGlvbmFsLnJlcXVpcmVkICYmICFkZnRcclxuICAgICAgICAgID8gYDwke3Bvc2l0aW9uYWwubmFtZX0+YFxyXG4gICAgICAgICAgOiBgWyR7cG9zaXRpb25hbC5uYW1lfSR7ZGZ0fV1gXHJcbiAgICAgIClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChjbWQuYXJncykge1xyXG4gICAgZm9yIChjb25zdCBhcmcgb2YgY21kLmFyZ3MpIHtcclxuICAgICAgY29uc3QgZGZ0ID1cclxuICAgICAgICBhcmcuZGVmYXVsdCAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICA/IGA9XCIke2NvcmUuc2NyYXAoYXJnLmRlZmF1bHQsIG1lc3NhZ2UpfVwiYFxyXG4gICAgICAgICAgOiBcIlwiXHJcbiAgICAgIGFyZ3VtZW50TGlzdC5wdXNoKFxyXG4gICAgICAgIGFyZy5yZXF1aXJlZFxyXG4gICAgICAgICAgPyBgXFxgLS0ke2FyZy5uYW1lfSR7ZGZ0fVxcYCAoXFxgJHtnZXRUeXBlRGVzY3JpcHRpb25PZihhcmcpfVxcYCkgJHtcclxuICAgICAgICAgICAgICBhcmcuZGVzY3JpcHRpb24gPz8gXCJcIlxyXG4gICAgICAgICAgICB9YFxyXG4gICAgICAgICAgOiBgXFxgWy0tJHthcmcubmFtZX0ke2RmdH1dXFxgIChcXGAke2dldFR5cGVEZXNjcmlwdGlvbk9mKGFyZyl9XFxgKSAke1xyXG4gICAgICAgICAgICAgIGFyZy5kZXNjcmlwdGlvbiA/PyBcIlwiXHJcbiAgICAgICAgICAgIH1gXHJcbiAgICAgIClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChjbWQuZmxhZ3MpIHtcclxuICAgIGZvciAoY29uc3QgZmxhZyBvZiBjbWQuZmxhZ3MpIHtcclxuICAgICAgZmxhZ0xpc3QucHVzaChgWy0tJHtmbGFnLm5hbWV9XWApXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBzcGVjaWFsUGVybWlzc2lvbnMgPSBbXVxyXG5cclxuICBpZiAoY21kLmJvdE93bmVyKSBzcGVjaWFsUGVybWlzc2lvbnMucHVzaChcIkJPVF9PV05FUlwiKVxyXG4gIGlmIChjbWQuZ3VpbGRPd25lcikgc3BlY2lhbFBlcm1pc3Npb25zLnB1c2goXCJHVUlMRF9PV05FUlwiKVxyXG5cclxuICBjb25zdCBlbWJlZCA9IG5ldyBEaXNjb3JkLk1lc3NhZ2VFbWJlZCgpXHJcbiAgICAuc2V0Q29sb3IoXCJCTFVSUExFXCIpXHJcbiAgICAuc2V0QXV0aG9yKFwiQ29tbWFuZCBkZXRhaWxzXCIsIG1lc3NhZ2UuY2xpZW50LnVzZXI/LmRpc3BsYXlBdmF0YXJVUkwoKSlcclxuICAgIC5zZXRUaXRsZShcclxuICAgICAgYCR7cGF0dGVybn0gJHtbLi4ucG9zaXRpb25hbExpc3QsIC4uLmZsYWdMaXN0XS5qb2luKFwiIFwiKX0gJHtcclxuICAgICAgICBjbWQuYXJncyA/IFwiW09QVElPTlNdXCIgOiBcIlwiXHJcbiAgICAgIH1gXHJcbiAgICApXHJcbiAgICAuc2V0RGVzY3JpcHRpb24oY21kLmxvbmdEZXNjcmlwdGlvbiA/PyBjbWQuZGVzY3JpcHRpb24gPz8gXCJubyBkZXNjcmlwdGlvblwiKVxyXG5cclxuICBpZiAoYXJndW1lbnRMaXN0Lmxlbmd0aCA+IDApXHJcbiAgICBlbWJlZC5hZGRGaWVsZChcIm9wdGlvbnNcIiwgYXJndW1lbnRMaXN0LmpvaW4oXCJcXG5cIiksIGZhbHNlKVxyXG5cclxuICBpZiAoY21kLmFsaWFzZXMpXHJcbiAgICBlbWJlZC5hZGRGaWVsZChcclxuICAgICAgXCJhbGlhc2VzXCIsXHJcbiAgICAgIGNtZC5hbGlhc2VzLm1hcCgoYWxpYXMpID0+IGBcXGAke2FsaWFzfVxcYGApLmpvaW4oXCIsIFwiKSxcclxuICAgICAgdHJ1ZVxyXG4gICAgKVxyXG5cclxuICBpZiAoY21kLmV4YW1wbGVzKVxyXG4gICAgZW1iZWQuYWRkRmllbGQoXHJcbiAgICAgIFwiZXhhbXBsZXM6XCIsXHJcbiAgICAgIGNvcmUuQ09ERS5zdHJpbmdpZnkoe1xyXG4gICAgICAgIGNvbnRlbnQ6IGNtZC5leGFtcGxlcy5tYXAoKGV4YW1wbGUpID0+IHByZWZpeCArIGV4YW1wbGUpLmpvaW4oXCJcXG5cIiksXHJcbiAgICAgIH0pLFxyXG4gICAgICBmYWxzZVxyXG4gICAgKVxyXG5cclxuICBpZiAoY21kLmJvdFBlcm1pc3Npb25zKVxyXG4gICAgZW1iZWQuYWRkRmllbGQoXCJib3QgcGVybWlzc2lvbnNcIiwgY21kLmJvdFBlcm1pc3Npb25zLmpvaW4oXCIsIFwiKSwgdHJ1ZSlcclxuXHJcbiAgaWYgKGNtZC51c2VyUGVybWlzc2lvbnMpXHJcbiAgICBlbWJlZC5hZGRGaWVsZChcInVzZXIgcGVybWlzc2lvbnNcIiwgY21kLnVzZXJQZXJtaXNzaW9ucy5qb2luKFwiLCBcIiksIHRydWUpXHJcblxyXG4gIGlmIChzcGVjaWFsUGVybWlzc2lvbnMubGVuZ3RoID4gMClcclxuICAgIGVtYmVkLmFkZEZpZWxkKFxyXG4gICAgICBcInNwZWNpYWwgcGVybWlzc2lvbnNcIixcclxuICAgICAgc3BlY2lhbFBlcm1pc3Npb25zLm1hcCgocGVybSkgPT4gYFxcYCR7cGVybX1cXGBgKS5qb2luKFwiLCBcIiksXHJcbiAgICAgIHRydWVcclxuICAgIClcclxuXHJcbiAgaWYgKGNtZC5jb29sRG93bilcclxuICAgIGVtYmVkLmFkZEZpZWxkKFwiY29vbCBkb3duXCIsIHRpbXMuZHVyYXRpb24oY21kLmNvb2xEb3duKSwgdHJ1ZSlcclxuXHJcbiAgaWYgKGNtZC5zdWJzKVxyXG4gICAgZW1iZWQuYWRkRmllbGQoXHJcbiAgICAgIFwic3ViIGNvbW1hbmRzOlwiLFxyXG4gICAgICBjbWQuc3Vic1xyXG4gICAgICAgIC5tYXAoKHN1YikgPT4gYCoqJHtzdWIubmFtZX0qKjogJHtzdWIuZGVzY3JpcHRpb24gPz8gXCJubyBkZXNjcmlwdGlvblwifWApXHJcbiAgICAgICAgLmpvaW4oXCJcXG5cIiksXHJcbiAgICAgIHRydWVcclxuICAgIClcclxuXHJcbiAgYXdhaXQgbWVzc2FnZS5jaGFubmVsLnNlbmQoZW1iZWQpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0NvbW1hbmRNZXNzYWdlKFxyXG4gIG1lc3NhZ2U6IERpc2NvcmQuTWVzc2FnZVxyXG4pOiBtZXNzYWdlIGlzIENvbW1hbmRNZXNzYWdlIHtcclxuICByZXR1cm4gIW1lc3NhZ2Uuc3lzdGVtICYmICEhbWVzc2FnZS5jaGFubmVsXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0d1aWxkTWVzc2FnZShcclxuICBtZXNzYWdlOiBDb21tYW5kTWVzc2FnZVxyXG4pOiBtZXNzYWdlIGlzIEd1aWxkTWVzc2FnZSB7XHJcbiAgcmV0dXJuICEhbWVzc2FnZS5ndWlsZCAmJiBtZXNzYWdlLmNoYW5uZWwgaW5zdGFuY2VvZiBEaXNjb3JkLkd1aWxkQ2hhbm5lbFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNEaXJlY3RNZXNzYWdlKFxyXG4gIG1lc3NhZ2U6IENvbW1hbmRNZXNzYWdlXHJcbik6IG1lc3NhZ2UgaXMgRGlyZWN0TWVzc2FnZSB7XHJcbiAgcmV0dXJuIG1lc3NhZ2UuY2hhbm5lbCBpbnN0YW5jZW9mIERpc2NvcmQuRE1DaGFubmVsXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjb21tYW5kcyA9IG5ldyBDb21tYW5kcygpXHJcblxyXG5leHBvcnQgY29uc3QgY29tbWFuZHNQYXRoID1cclxuICBwcm9jZXNzLmVudi5DT01NQU5EU19QQVRIID8/IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCBcImRpc3RcIiwgXCJjb21tYW5kc1wiKVxyXG5leHBvcnQgY29uc3QgbGlzdGVuZXJzUGF0aCA9XHJcbiAgcHJvY2Vzcy5lbnYuTElTVEVORVJTX1BBVEggPz8gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIFwiZGlzdFwiLCBcImxpc3RlbmVyc1wiKVxyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFvQjtBQUNwQixrQkFBaUI7QUFDakIsa0JBQWlCO0FBQ2pCLG1CQUFrQjtBQUNsQiwwQkFBd0I7QUFFeEIsV0FBc0I7QUFDdEIsYUFBd0I7QUFQeEI7QUFxRE8sZ0JBQ0wsS0FDc0I7QUFDdEIsU0FBTyxJQUFJLGVBQWU7QUFBQTtBQXNEckIsdUJBQXVCLHVCQUFRLFdBQWlDO0FBQUEsRUFDOUQsUUFDTCxLQUM4QjtBQUM5QixXQUFPLEtBQUssS0FBSyxDQUFDLFlBQVk7QUFsSGxDO0FBbUhNLGFBQ0UsUUFBUSxRQUFRLFFBQ2hCLENBQUMsQ0FBQyxnQkFBUSxZQUFSLG9CQUFpQixLQUFLLENBQUMsVUFBVSxRQUFRO0FBQUE7QUFBQTtBQUFBLEVBSzFDLElBQW9DLFNBQTJCO0FBQ3BFLHNCQUFrQjtBQUNsQixTQUFLLElBQUksUUFBUSxNQUFNO0FBQUE7QUFBQTtBQUlwQiw4QkFDTCxZQUNBLEtBQ2tEO0FBQ2xELE1BQUksV0FBVyxJQUFJO0FBQ25CLE1BQUksUUFBUSxXQUFXLGVBQWUsSUFBSTtBQUMxQyxNQUFJLFFBQVEs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
