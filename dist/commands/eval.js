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
var import_discord_eval = __toModule(require("discord-eval.ts"));
var import_child_process = __toModule(require("child_process"));
var import_util = __toModule(require("util"));
var app = __toModule(require("../app"));
const exec = import_util.default.promisify(import_child_process.default.exec);
const packageJson = require(app.rootPath("package.json"));
const alreadyInstalled = (pack) => packageJson.dependencies.hasOwnProperty(pack) || packageJson.devDependencies.hasOwnProperty(pack);
const command = {
  name: "eval",
  botOwner: true,
  aliases: ["js", "code", "run", "="],
  description: "JS code evaluator",
  args: [
    {
      name: "packages",
      aliases: ["use", "u", "req", "require", "import", "i"],
      castValue: "array",
      description: "NPM packages I want to includes in my code"
    }
  ],
  flags: [
    {
      name: "muted",
      aliases: ["mute", "silent"],
      flag: "m",
      description: "Disable message feedback"
    }
  ],
  async run(message) {
    const installed = new Set();
    if (message.args.packages.length > 0) {
      const given = new Set(message.args.packages.filter((p) => p));
      for (const pack of given) {
        if (alreadyInstalled(pack)) {
          await message.channel.send(`\u2705 **${pack}** - installed`);
          installed.add(pack);
        } else {
          let log;
          try {
            log = await message.channel.send(`<a:wait:560972897376665600> **${pack}** - install...`);
            await exec(`npm i ${pack}@latest`);
            await log.edit(`\u2705 **${pack}** - installed`);
            installed.add(pack);
          } catch (error) {
            if (log)
              await log.edit(`\u274C **${pack}** - error`);
            else
              await message.channel.send(`\u274C **${pack}** - error`);
          }
        }
      }
    }
    if (app.CODE.pattern.test(message.rest))
      message.rest = message.rest.replace(app.CODE.pattern, "$2");
    if (message.rest.split("\n").length === 1 && !/const|let|return/.test(message.rest)) {
      message.rest = "return " + message.rest;
    }
    message.rest = `
      ${message.rest.includes("app") ? 'const _path = require("path");const _root = process.cwd();const _app_path = _path.join(_root, "dist", "app.js");const app = require(_app_path);' : ""} ${message.args.packages.length > 0 ? `const req = {${[...installed].map((pack) => `"${pack}": require("${pack}")`).join(", ")}};` : ""} ${message.rest}`;
    await (0, import_discord_eval.default)(message.rest, message, message.args.muted);
    for (const pack of installed) {
      if (alreadyInstalled(pack))
        continue;
      let log;
      try {
        log = await message.channel.send(`<a:wait:560972897376665600> **${pack}** - uninstall...`);
        await exec(`npm remove --purge ${pack}`);
        await log.edit(`\u{1F5D1}\uFE0F **${pack}** - uninstalled`);
      } catch (error) {
        if (log)
          await log.edit(`\u274C **${pack}** - error`);
        else
          await message.channel.send(`\u274C **${pack}** - error`);
      }
    }
    return message.channel.send(`\u2705 process completed`);
  }
};
module.exports = command;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NvbW1hbmRzL2V2YWwudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBkaXNjb3JkRXZhbCBmcm9tIFwiZGlzY29yZC1ldmFsLnRzXCJcclxuaW1wb3J0IGNwIGZyb20gXCJjaGlsZF9wcm9jZXNzXCJcclxuaW1wb3J0IHV0aWwgZnJvbSBcInV0aWxcIlxyXG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcIi4uL2FwcFwiXHJcblxyXG5jb25zdCBleGVjID0gdXRpbC5wcm9taXNpZnkoY3AuZXhlYylcclxuXHJcbmNvbnN0IHBhY2thZ2VKc29uID0gcmVxdWlyZShhcHAucm9vdFBhdGgoXCJwYWNrYWdlLmpzb25cIikpXHJcblxyXG5jb25zdCBhbHJlYWR5SW5zdGFsbGVkID0gKHBhY2s6IHN0cmluZyk6IGJvb2xlYW4gPT5cclxuICBwYWNrYWdlSnNvbi5kZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkocGFjaykgfHxcclxuICBwYWNrYWdlSnNvbi5kZXZEZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkocGFjaylcclxuXHJcbmNvbnN0IGNvbW1hbmQ6IGFwcC5Db21tYW5kID0ge1xyXG4gIG5hbWU6IFwiZXZhbFwiLFxyXG4gIGJvdE93bmVyOiB0cnVlLFxyXG4gIGFsaWFzZXM6IFtcImpzXCIsIFwiY29kZVwiLCBcInJ1blwiLCBcIj1cIl0sXHJcbiAgZGVzY3JpcHRpb246IFwiSlMgY29kZSBldmFsdWF0b3JcIixcclxuICBhcmdzOiBbXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6IFwicGFja2FnZXNcIixcclxuICAgICAgYWxpYXNlczogW1widXNlXCIsIFwidVwiLCBcInJlcVwiLCBcInJlcXVpcmVcIiwgXCJpbXBvcnRcIiwgXCJpXCJdLFxyXG4gICAgICBjYXN0VmFsdWU6IFwiYXJyYXlcIixcclxuICAgICAgZGVzY3JpcHRpb246IFwiTlBNIHBhY2thZ2VzIEkgd2FudCB0byBpbmNsdWRlcyBpbiBteSBjb2RlXCIsXHJcbiAgICB9LFxyXG4gIF0sXHJcbiAgZmxhZ3M6IFtcclxuICAgIHtcclxuICAgICAgbmFtZTogXCJtdXRlZFwiLFxyXG4gICAgICBhbGlhc2VzOiBbXCJtdXRlXCIsIFwic2lsZW50XCJdLFxyXG4gICAgICBmbGFnOiBcIm1cIixcclxuICAgICAgZGVzY3JpcHRpb246IFwiRGlzYWJsZSBtZXNzYWdlIGZlZWRiYWNrXCIsXHJcbiAgICB9LFxyXG4gIF0sXHJcbiAgYXN5bmMgcnVuKG1lc3NhZ2UpIHtcclxuICAgIGNvbnN0IGluc3RhbGxlZCA9IG5ldyBTZXQ8c3RyaW5nPigpXHJcblxyXG4gICAgaWYgKG1lc3NhZ2UuYXJncy5wYWNrYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGdpdmVuID0gbmV3IFNldDxzdHJpbmc+KFxyXG4gICAgICAgIG1lc3NhZ2UuYXJncy5wYWNrYWdlcy5maWx0ZXIoKHA6IHN0cmluZykgPT4gcClcclxuICAgICAgKVxyXG5cclxuICAgICAgZm9yIChjb25zdCBwYWNrIG9mIGdpdmVuKSB7XHJcbiAgICAgICAgaWYgKGFscmVhZHlJbnN0YWxsZWQocGFjaykpIHtcclxuICAgICAgICAgIGF3YWl0IG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGBcdTI3MDUgKioke3BhY2t9KiogLSBpbnN0YWxsZWRgKVxyXG4gICAgICAgICAgaW5zdGFsbGVkLmFkZChwYWNrKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBsZXQgbG9nXHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsb2cgPSBhd2FpdCBtZXNzYWdlLmNoYW5uZWwuc2VuZChcclxuICAgICAgICAgICAgICBgPGE6d2FpdDo1NjA5NzI4OTczNzY2NjU2MDA+ICoqJHtwYWNrfSoqIC0gaW5zdGFsbC4uLmBcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICBhd2FpdCBleGVjKGBucG0gaSAke3BhY2t9QGxhdGVzdGApXHJcbiAgICAgICAgICAgIGF3YWl0IGxvZy5lZGl0KGBcdTI3MDUgKioke3BhY2t9KiogLSBpbnN0YWxsZWRgKVxyXG4gICAgICAgICAgICBpbnN0YWxsZWQuYWRkKHBhY2spXHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBpZiAobG9nKSBhd2FpdCBsb2cuZWRpdChgXHUyNzRDICoqJHtwYWNrfSoqIC0gZXJyb3JgKVxyXG4gICAgICAgICAgICBlbHNlIGF3YWl0IG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGBcdTI3NEMgKioke3BhY2t9KiogLSBlcnJvcmApXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGFwcC5DT0RFLnBhdHRlcm4udGVzdChtZXNzYWdlLnJlc3QpKVxyXG4gICAgICBtZXNzYWdlLnJlc3QgPSBtZXNzYWdlLnJlc3QucmVwbGFjZShhcHAuQ09ERS5wYXR0ZXJuLCBcIiQyXCIpXHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBtZXNzYWdlLnJlc3Quc3BsaXQoXCJcXG5cIikubGVuZ3RoID09PSAxICYmXHJcbiAgICAgICEvY29uc3R8bGV0fHJldHVybi8udGVzdChtZXNzYWdlLnJlc3QpXHJcbiAgICApIHtcclxuICAgICAgbWVzc2FnZS5yZXN0ID0gXCJyZXR1cm4gXCIgKyBtZXNzYWdlLnJlc3RcclxuICAgIH1cclxuXHJcbiAgICBtZXNzYWdlLnJlc3QgPSBgXHJcbiAgICAgICR7XHJcbiAgICAgICAgbWVzc2FnZS5yZXN0LmluY2x1ZGVzKFwiYXBwXCIpXHJcbiAgICAgICAgICA/ICdjb25zdCBfcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO2NvbnN0IF9yb290ID0gcHJvY2Vzcy5jd2QoKTtjb25zdCBfYXBwX3BhdGggPSBfcGF0aC5qb2luKF9yb290LCBcImRpc3RcIiwgXCJhcHAuanNcIik7Y29uc3QgYXBwID0gcmVxdWlyZShfYXBwX3BhdGgpOydcclxuICAgICAgICAgIDogXCJcIlxyXG4gICAgICB9ICR7XHJcbiAgICAgIG1lc3NhZ2UuYXJncy5wYWNrYWdlcy5sZW5ndGggPiAwXHJcbiAgICAgICAgPyBgY29uc3QgcmVxID0geyR7Wy4uLmluc3RhbGxlZF1cclxuICAgICAgICAgICAgLm1hcCgocGFjaykgPT4gYFwiJHtwYWNrfVwiOiByZXF1aXJlKFwiJHtwYWNrfVwiKWApXHJcbiAgICAgICAgICAgIC5qb2luKFwiLCBcIil9fTtgXHJcbiAgICAgICAgOiBcIlwiXHJcbiAgICB9ICR7bWVzc2FnZS5yZXN0fWBcclxuXHJcbiAgICBhd2FpdCBkaXNjb3JkRXZhbChtZXNzYWdlLnJlc3QsIG1lc3NhZ2UsIG1lc3NhZ2UuYXJncy5tdXRlZClcclxuXHJcbiAgICBmb3IgKGNvbnN0IHBhY2sgb2YgaW5zdGFsbGVkKSB7XHJcbiAgICAgIGlmIChhbHJlYWR5SW5zdGFsbGVkKHBhY2spKSBjb250aW51ZVxyXG4gICAgICBsZXQgbG9nXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgbG9nID0gYXdhaXQgbWVzc2FnZS5jaGFubmVsLnNlbmQoXHJcbiAgICAgICAgICBgPGE6d2FpdDo1NjA5NzI4OTczNzY2NjU2MDA+ICoqJHtwYWNrfSoqIC0gdW5pbnN0YWxsLi4uYFxyXG4gICAgICAgIClcclxuICAgICAgICBhd2FpdCBleGVjKGBucG0gcmVtb3ZlIC0tcHVyZ2UgJHtwYWNrfWApXHJcbiAgICAgICAgYXdhaXQgbG9nLmVkaXQoYFx1RDgzRFx1REREMVx1RkUwRiAqKiR7cGFja30qKiAtIHVuaW5zdGFsbGVkYClcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAobG9nKSBhd2FpdCBsb2cuZWRpdChgXHUyNzRDICoqJHtwYWNrfSoqIC0gZXJyb3JgKVxyXG4gICAgICAgIGVsc2UgYXdhaXQgbWVzc2FnZS5jaGFubmVsLnNlbmQoYFx1Mjc0QyAqKiR7cGFja30qKiAtIGVycm9yYClcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtZXNzYWdlLmNoYW5uZWwuc2VuZChgXHUyNzA1IHByb2Nlc3MgY29tcGxldGVkYClcclxuICB9LFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNvbW1hbmRcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMEJBQXdCO0FBQ3hCLDJCQUFlO0FBQ2Ysa0JBQWlCO0FBQ2pCLFVBQXFCO0FBRXJCLE1BQU0sT0FBTyxvQkFBSyxVQUFVLDZCQUFHO0FBRS9CLE1BQU0sY0FBYyxRQUFRLElBQUksU0FBUztBQUV6QyxNQUFNLG1CQUFtQixDQUFDLFNBQ3hCLFlBQVksYUFBYSxlQUFlLFNBQ3hDLFlBQVksZ0JBQWdCLGVBQWU7QUFFN0MsTUFBTSxVQUF1QjtBQUFBLEVBQzNCLE1BQU07QUFBQSxFQUNOLFVBQVU7QUFBQSxFQUNWLFNBQVMsQ0FBQyxNQUFNLFFBQVEsT0FBTztBQUFBLEVBQy9CLGFBQWE7QUFBQSxFQUNiLE1BQU07QUFBQSxJQUNKO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixTQUFTLENBQUMsT0FBTyxLQUFLLE9BQU8sV0FBVyxVQUFVO0FBQUEsTUFDbEQsV0FBVztBQUFBLE1BQ1gsYUFBYTtBQUFBO0FBQUE7QUFBQSxFQUdqQixPQUFPO0FBQUEsSUFDTDtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sU0FBUyxDQUFDLFFBQVE7QUFBQSxNQUNsQixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUE7QUFBQTtBQUFBLFFBR1gsSUFBSSxTQUFTO0FBQ2pCLFVBQU0sWUFBWSxJQUFJO0FBRXRCLFFBQUksUUFBUSxLQUFLLFNBQVMsU0FBUyxHQUFHO0FBQ3BDLFlBQU0sUUFBUSxJQUFJLElBQ2hCLFFBQVEsS0FBSyxTQUFTLE9BQU8sQ0FBQyxNQUFjO0FBRzlDLGlCQUFXLFFBQVEsT0FBTztBQUN4QixZQUFJLGlCQUFpQixPQUFPO0FBQzFCLGdCQUFNLFFBQVEsUUFBUSxLQUFLLFlBQU87QUFDbEMsb0JBQVUsSUFBSTtBQUFBLGVBQ1Q7QUFDTCxjQUFJO0FBQ0osY0FBSTtBQUNGLGtCQUFNLE1BQU0sUUFBUSxRQUFRLEtBQzFCLGlDQUFpQztBQUVuQyxrQkFBTSxLQUFLLFNBQVM7QUFDcEIsa0JBQU0sSUFBSSxLQUFLLFlBQU87QUFDdEIsc0JBQVUsSUFBSTtBQUFBLG1CQUNQLE9BQVA7QUFDQSxnQkFBSTtBQUFLLG9CQUFNLElBQUksS0FBSyxZQUFPO0FBQUE7QUFDMUIsb0JBQU0sUUFBUSxRQUFRLEtBQUssWUFBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTS9DLFFBQUksSUFBSSxLQUFLLFFBQVEsS0FBSyxRQUFRO0FBQ2hDLGNBQVEsT0FBTyxRQUFRLEtBQUssUUFBUSxJQUFJLEtBQUssU0FBUztBQUV4RCxRQUNFLFFBQVEsS0FBSyxNQUFNLE1BQU0sV0FBVyxLQUNwQyxDQUFDLG1CQUFtQixLQUFLLFFBQVEsT0FDakM7QUFDQSxjQUFRLE9BQU8sWUFBWSxRQUFRO0FBQUE7QUFHckMsWUFBUSxPQUFPO0FBQUEsUUFFWCxRQUFRLEtBQUssU0FBUyxTQUNsQixvSkFDQSxNQUVOLFFBQVEsS0FBSyxTQUFTLFNBQVMsSUFDM0IsZ0JBQWdCLENBQUMsR0FBRyxXQUNqQixJQUFJLENBQUMsU0FBUyxJQUFJLG1CQUFtQixVQUNyQyxLQUFLLFlBQ1IsTUFDRixRQUFRO0FBRVosVUFBTSxpQ0FBWSxRQUFRLE1BQU0sU0FBUyxRQUFRLEtBQUs7QUFFdEQsZUFBVyxRQUFRLFdBQVc7QUFDNUIsVUFBSSxpQkFBaUI7QUFBTztBQUM1QixVQUFJO0FBQ0osVUFBSTtBQUNGLGNBQU0sTUFBTSxRQUFRLFFBQVEsS0FDMUIsaUNBQWlDO0FBRW5DLGNBQU0sS0FBSyxzQkFBc0I7QUFDakMsY0FBTSxJQUFJLEtBQUsscUJBQVM7QUFBQSxlQUNqQixPQUFQO0FBQ0EsWUFBSTtBQUFLLGdCQUFNLElBQUksS0FBSyxZQUFPO0FBQUE7QUFDMUIsZ0JBQU0sUUFBUSxRQUFRLEtBQUssWUFBTztBQUFBO0FBQUE7QUFJM0MsV0FBTyxRQUFRLFFBQVEsS0FBSztBQUFBO0FBQUE7QUFJaEMsT0FBTyxVQUFVOyIsCiAgIm5hbWVzIjogW10KfQo=
