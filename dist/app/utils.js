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
  prefix: () => prefix
});
var import_prefixes = __toModule(require("../tables/prefixes"));
async function prefix(guild) {
  let prefix2 = process.env.PREFIX;
  if (guild) {
    const prefixData = await import_prefixes.default.query.where("guild_id", guild.id).select().first();
    if (prefixData) {
      prefix2 = prefixData.prefix;
    }
  }
  return prefix2;
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2FwcC91dGlscy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IERpc2NvcmQgZnJvbSBcImRpc2NvcmQuanNcIlxyXG5cclxuaW1wb3J0IHByZWZpeGVzIGZyb20gXCIuLi90YWJsZXMvcHJlZml4ZXNcIlxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByZWZpeChndWlsZD86IERpc2NvcmQuR3VpbGQpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gIGxldCBwcmVmaXggPSBwcm9jZXNzLmVudi5QUkVGSVggYXMgc3RyaW5nXHJcbiAgaWYgKGd1aWxkKSB7XHJcbiAgICBjb25zdCBwcmVmaXhEYXRhID0gYXdhaXQgcHJlZml4ZXMucXVlcnlcclxuICAgICAgLndoZXJlKFwiZ3VpbGRfaWRcIiwgZ3VpbGQuaWQpXHJcbiAgICAgIC5zZWxlY3QoKVxyXG4gICAgICAuZmlyc3QoKVxyXG4gICAgaWYgKHByZWZpeERhdGEpIHtcclxuICAgICAgcHJlZml4ID0gcHJlZml4RGF0YS5wcmVmaXhcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHByZWZpeFxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBLHNCQUFxQjtBQUVyQixzQkFBNkIsT0FBd0M7QUFDbkUsTUFBSSxVQUFTLFFBQVEsSUFBSTtBQUN6QixNQUFJLE9BQU87QUFDVCxVQUFNLGFBQWEsTUFBTSx3QkFBUyxNQUMvQixNQUFNLFlBQVksTUFBTSxJQUN4QixTQUNBO0FBQ0gsUUFBSSxZQUFZO0FBQ2QsZ0JBQVMsV0FBVztBQUFBO0FBQUE7QUFHeEIsU0FBTztBQUFBOyIsCiAgIm5hbWVzIjogW10KfQo=
