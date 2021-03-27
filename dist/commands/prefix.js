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
var import_prefixes = __toModule(require("../tables/prefixes"));
const command = {
  name: "prefix",
  guildOwner: true,
  guildOnly: true,
  description: "Edit or show the bot prefix",
  positional: [
    {
      name: "prefix",
      checkValue: (value) => value.length < 10 && /^\S/.test(value),
      description: "The new prefix"
    }
  ],
  async run(message) {
    const prefix = message.args.prefix;
    if (!prefix)
      return message.channel.send(`My current prefix for "**${message.guild}**" is \`${await app.prefix(message.guild)}\``);
    await import_prefixes.default.query.insert({
      guild_id: message.guild.id,
      prefix
    }).onConflict("guild_id").merge();
    await message.channel.send(`My new prefix for "**${message.guild}**" is \`${prefix}\``);
  }
};
module.exports = command;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NvbW1hbmRzL3ByZWZpeC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0ICogYXMgYXBwIGZyb20gXCIuLi9hcHBcIlxyXG5pbXBvcnQgcHJlZml4ZXMgZnJvbSBcIi4uL3RhYmxlcy9wcmVmaXhlc1wiXHJcblxyXG5jb25zdCBjb21tYW5kOiBhcHAuQ29tbWFuZDxhcHAuR3VpbGRNZXNzYWdlPiA9IHtcclxuICBuYW1lOiBcInByZWZpeFwiLFxyXG4gIGd1aWxkT3duZXI6IHRydWUsXHJcbiAgZ3VpbGRPbmx5OiB0cnVlLFxyXG4gIGRlc2NyaXB0aW9uOiBcIkVkaXQgb3Igc2hvdyB0aGUgYm90IHByZWZpeFwiLFxyXG4gIHBvc2l0aW9uYWw6IFtcclxuICAgIHtcclxuICAgICAgbmFtZTogXCJwcmVmaXhcIixcclxuICAgICAgY2hlY2tWYWx1ZTogKHZhbHVlKSA9PiB2YWx1ZS5sZW5ndGggPCAxMCAmJiAvXlxcUy8udGVzdCh2YWx1ZSksXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBuZXcgcHJlZml4XCIsXHJcbiAgICB9LFxyXG4gIF0sXHJcbiAgYXN5bmMgcnVuKG1lc3NhZ2UpIHtcclxuICAgIGNvbnN0IHByZWZpeCA9IG1lc3NhZ2UuYXJncy5wcmVmaXhcclxuXHJcbiAgICBpZiAoIXByZWZpeClcclxuICAgICAgcmV0dXJuIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKFxyXG4gICAgICAgIGBNeSBjdXJyZW50IHByZWZpeCBmb3IgXCIqKiR7bWVzc2FnZS5ndWlsZH0qKlwiIGlzIFxcYCR7YXdhaXQgYXBwLnByZWZpeChcclxuICAgICAgICAgIG1lc3NhZ2UuZ3VpbGRcclxuICAgICAgICApfVxcYGBcclxuICAgICAgKVxyXG5cclxuICAgIGF3YWl0IHByZWZpeGVzLnF1ZXJ5XHJcbiAgICAgIC5pbnNlcnQoe1xyXG4gICAgICAgIGd1aWxkX2lkOiBtZXNzYWdlLmd1aWxkLmlkLFxyXG4gICAgICAgIHByZWZpeDogcHJlZml4LFxyXG4gICAgICB9KVxyXG4gICAgICAub25Db25mbGljdChcImd1aWxkX2lkXCIpXHJcbiAgICAgIC5tZXJnZSgpXHJcblxyXG4gICAgYXdhaXQgbWVzc2FnZS5jaGFubmVsLnNlbmQoXHJcbiAgICAgIGBNeSBuZXcgcHJlZml4IGZvciBcIioqJHttZXNzYWdlLmd1aWxkfSoqXCIgaXMgXFxgJHtwcmVmaXh9XFxgYFxyXG4gICAgKVxyXG4gIH0sXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY29tbWFuZFxyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxVQUFxQjtBQUNyQixzQkFBcUI7QUFFckIsTUFBTSxVQUF5QztBQUFBLEVBQzdDLE1BQU07QUFBQSxFQUNOLFlBQVk7QUFBQSxFQUNaLFdBQVc7QUFBQSxFQUNYLGFBQWE7QUFBQSxFQUNiLFlBQVk7QUFBQSxJQUNWO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixZQUFZLENBQUMsVUFBVSxNQUFNLFNBQVMsTUFBTSxNQUFNLEtBQUs7QUFBQSxNQUN2RCxhQUFhO0FBQUE7QUFBQTtBQUFBLFFBR1gsSUFBSSxTQUFTO0FBQ2pCLFVBQU0sU0FBUyxRQUFRLEtBQUs7QUFFNUIsUUFBSSxDQUFDO0FBQ0gsYUFBTyxRQUFRLFFBQVEsS0FDckIsNEJBQTRCLFFBQVEsaUJBQWlCLE1BQU0sSUFBSSxPQUM3RCxRQUFRO0FBSWQsVUFBTSx3QkFBUyxNQUNaLE9BQU87QUFBQSxNQUNOLFVBQVUsUUFBUSxNQUFNO0FBQUEsTUFDeEI7QUFBQSxPQUVELFdBQVcsWUFDWDtBQUVILFVBQU0sUUFBUSxRQUFRLEtBQ3BCLHdCQUF3QixRQUFRLGlCQUFpQjtBQUFBO0FBQUE7QUFLdkQsT0FBTyxVQUFVOyIsCiAgIm5hbWVzIjogW10KfQo=
