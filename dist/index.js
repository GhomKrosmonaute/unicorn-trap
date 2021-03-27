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
var import_discord = __toModule(require("discord.js"));
var import_dotenv = __toModule(require("dotenv"));
var import_chalk = __toModule(require("chalk"));
var import_promises = __toModule(require("fs/promises"));
var import_path = __toModule(require("path"));
var app = __toModule(require("./app"));
import_dotenv.default.config();
for (const key of ["TOKEN", "PREFIX", "OWNER"]) {
  if (!process.env[key] || /^{{.+}}$/.test(process.env[key])) {
    throw new Error("You need to add " + key + " value in your .env file.");
  }
}
const client = new import_discord.default.Client();
(async () => {
  await import_promises.default.readdir(app.tablesPath).then((files) => {
    return Promise.all(files.map(async (filename) => {
      const tableFile = await Promise.resolve().then(() => __toModule(require(import_path.default.join(app.tablesPath, filename))));
      const table = tableFile.default;
      app.tables.set(table.options.name, await table.make());
    }));
  });
  await import_promises.default.readdir(app.commandsPath).then((files) => files.forEach((filename) => {
    app.commands.add(require(import_path.default.join(app.commandsPath, filename)));
  }));
  await import_promises.default.readdir(app.listenersPath).then((files) => files.forEach((filename) => {
    const listener = require(import_path.default.join(app.listenersPath, filename));
    client[listener.once ? "once" : "on"](listener.event, listener.run);
    app.log(`loaded event ${import_chalk.default.yellow(listener.once ? "once" : "on")} ${import_chalk.default.blue(listener.event)}`, "handler");
  }));
  client.login(process.env.TOKEN).catch(() => {
    throw new Error("Invalid Discord token given.");
  });
})().catch((error) => app.error(error, "system", true));
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgRGlzY29yZCBmcm9tIFwiZGlzY29yZC5qc1wiXHJcbmltcG9ydCBkb3RlbnYgZnJvbSBcImRvdGVudlwiXHJcbmltcG9ydCBjaGFsayBmcm9tIFwiY2hhbGtcIlxyXG5pbXBvcnQgZnMgZnJvbSBcImZzL3Byb21pc2VzXCJcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIlxyXG5cclxuZG90ZW52LmNvbmZpZygpXHJcblxyXG5mb3IgKGNvbnN0IGtleSBvZiBbXCJUT0tFTlwiLCBcIlBSRUZJWFwiLCBcIk9XTkVSXCJdKSB7XHJcbiAgaWYgKCFwcm9jZXNzLmVudltrZXldIHx8IC9ee3suK319JC8udGVzdChwcm9jZXNzLmVudltrZXldIGFzIHN0cmluZykpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIllvdSBuZWVkIHRvIGFkZCBcIiArIGtleSArIFwiIHZhbHVlIGluIHlvdXIgLmVudiBmaWxlLlwiKVxyXG4gIH1cclxufVxyXG5cclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCIuL2FwcFwiXHJcblxyXG5jb25zdCBjbGllbnQgPSBuZXcgRGlzY29yZC5DbGllbnQoKVxyXG5cclxuOyhhc3luYyAoKSA9PiB7XHJcbiAgLy8gbG9hZCB0YWJsZXNcclxuICBhd2FpdCBmcy5yZWFkZGlyKGFwcC50YWJsZXNQYXRoKS50aGVuKChmaWxlcykgPT4ge1xyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFxyXG4gICAgICBmaWxlcy5tYXAoYXN5bmMgKGZpbGVuYW1lKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGFibGVGaWxlID0gYXdhaXQgaW1wb3J0KHBhdGguam9pbihhcHAudGFibGVzUGF0aCwgZmlsZW5hbWUpKVxyXG4gICAgICAgIGNvbnN0IHRhYmxlOiBhcHAuVGFibGU8YW55PiA9IHRhYmxlRmlsZS5kZWZhdWx0XHJcbiAgICAgICAgYXBwLnRhYmxlcy5zZXQodGFibGUub3B0aW9ucy5uYW1lLCBhd2FpdCB0YWJsZS5tYWtlKCkpXHJcbiAgICAgIH0pXHJcbiAgICApXHJcbiAgfSlcclxuXHJcbiAgLy8gbG9hZCBjb21tYW5kc1xyXG4gIGF3YWl0IGZzLnJlYWRkaXIoYXBwLmNvbW1hbmRzUGF0aCkudGhlbigoZmlsZXMpID0+XHJcbiAgICBmaWxlcy5mb3JFYWNoKChmaWxlbmFtZSkgPT4ge1xyXG4gICAgICBhcHAuY29tbWFuZHMuYWRkKHJlcXVpcmUocGF0aC5qb2luKGFwcC5jb21tYW5kc1BhdGgsIGZpbGVuYW1lKSkpXHJcbiAgICB9KVxyXG4gIClcclxuXHJcbiAgLy8gbG9hZCBsaXN0ZW5lcnNcclxuICBhd2FpdCBmcy5yZWFkZGlyKGFwcC5saXN0ZW5lcnNQYXRoKS50aGVuKChmaWxlcykgPT5cclxuICAgIGZpbGVzLmZvckVhY2goKGZpbGVuYW1lKSA9PiB7XHJcbiAgICAgIGNvbnN0IGxpc3RlbmVyOiBhcHAuTGlzdGVuZXI8YW55PiA9IHJlcXVpcmUocGF0aC5qb2luKFxyXG4gICAgICAgIGFwcC5saXN0ZW5lcnNQYXRoLFxyXG4gICAgICAgIGZpbGVuYW1lXHJcbiAgICAgICkpXHJcbiAgICAgIGNsaWVudFtsaXN0ZW5lci5vbmNlID8gXCJvbmNlXCIgOiBcIm9uXCJdKGxpc3RlbmVyLmV2ZW50LCBsaXN0ZW5lci5ydW4pXHJcbiAgICAgIGFwcC5sb2coXHJcbiAgICAgICAgYGxvYWRlZCBldmVudCAke2NoYWxrLnllbGxvdyhcclxuICAgICAgICAgIGxpc3RlbmVyLm9uY2UgPyBcIm9uY2VcIiA6IFwib25cIlxyXG4gICAgICAgICl9ICR7Y2hhbGsuYmx1ZShsaXN0ZW5lci5ldmVudCl9YCxcclxuICAgICAgICBcImhhbmRsZXJcIlxyXG4gICAgICApXHJcbiAgICB9KVxyXG4gIClcclxuXHJcbiAgLy8gc3RhcnQgY2xpZW50XHJcbiAgY2xpZW50LmxvZ2luKHByb2Nlc3MuZW52LlRPS0VOKS5jYXRjaCgoKSA9PiB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIERpc2NvcmQgdG9rZW4gZ2l2ZW4uXCIpXHJcbiAgfSlcclxufSkoKS5jYXRjaCgoZXJyb3IpID0+IGFwcC5lcnJvcihlcnJvciwgXCJzeXN0ZW1cIiwgdHJ1ZSkpXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFCQUFvQjtBQUNwQixvQkFBbUI7QUFDbkIsbUJBQWtCO0FBQ2xCLHNCQUFlO0FBQ2Ysa0JBQWlCO0FBVWpCLFVBQXFCO0FBUnJCLHNCQUFPO0FBRVAsV0FBVyxPQUFPLENBQUMsU0FBUyxVQUFVLFVBQVU7QUFDOUMsTUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLFdBQVcsS0FBSyxRQUFRLElBQUksT0FBaUI7QUFDcEUsVUFBTSxJQUFJLE1BQU0scUJBQXFCLE1BQU07QUFBQTtBQUFBO0FBTS9DLE1BQU0sU0FBUyxJQUFJLHVCQUFRO0FBRTFCLEFBQUMsYUFBWTtBQUVaLFFBQU0sd0JBQUcsUUFBUSxJQUFJLFlBQVksS0FBSyxDQUFDLFVBQVU7QUFDL0MsV0FBTyxRQUFRLElBQ2IsTUFBTSxJQUFJLE9BQU8sYUFBYTtBQUM1QixZQUFNLFlBQVksTUFBTSw2QkFBTyxXQUFQLFFBQU8sb0JBQUssS0FBSyxJQUFJLFlBQVk7QUFDekQsWUFBTSxRQUF3QixVQUFVO0FBQ3hDLFVBQUksT0FBTyxJQUFJLE1BQU0sUUFBUSxNQUFNLE1BQU0sTUFBTTtBQUFBO0FBQUE7QUFNckQsUUFBTSx3QkFBRyxRQUFRLElBQUksY0FBYyxLQUFLLENBQUMsVUFDdkMsTUFBTSxRQUFRLENBQUMsYUFBYTtBQUMxQixRQUFJLFNBQVMsSUFBSSxRQUFRLG9CQUFLLEtBQUssSUFBSSxjQUFjO0FBQUE7QUFLekQsUUFBTSx3QkFBRyxRQUFRLElBQUksZUFBZSxLQUFLLENBQUMsVUFDeEMsTUFBTSxRQUFRLENBQUMsYUFBYTtBQUMxQixVQUFNLFdBQThCLFFBQVEsb0JBQUssS0FDL0MsSUFBSSxlQUNKO0FBRUYsV0FBTyxTQUFTLE9BQU8sU0FBUyxNQUFNLFNBQVMsT0FBTyxTQUFTO0FBQy9ELFFBQUksSUFDRixnQkFBZ0IscUJBQU0sT0FDcEIsU0FBUyxPQUFPLFNBQVMsU0FDdEIscUJBQU0sS0FBSyxTQUFTLFVBQ3pCO0FBQUE7QUFNTixTQUFPLE1BQU0sUUFBUSxJQUFJLE9BQU8sTUFBTSxNQUFNO0FBQzFDLFVBQU0sSUFBSSxNQUFNO0FBQUE7QUFBQSxLQUVmLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxPQUFPLFVBQVU7IiwKICAibmFtZXMiOiBbXQp9Cg==
