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
  default: () => prefixes_default
});
var app = __toModule(require("../app"));
const table = new app.Table({
  name: "prefixes",
  colMaker: (table2) => {
    table2.string("guild_id").unique();
    table2.string("prefix");
  }
});
var prefixes_default = table;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3RhYmxlcy9wcmVmaXhlcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0ICogYXMgYXBwIGZyb20gXCIuLi9hcHBcIlxyXG5cclxuY29uc3QgdGFibGUgPSBuZXcgYXBwLlRhYmxlPHtcclxuICBndWlsZF9pZDogc3RyaW5nXHJcbiAgcHJlZml4OiBzdHJpbmdcclxufT4oe1xyXG4gIG5hbWU6IFwicHJlZml4ZXNcIixcclxuICBjb2xNYWtlcjogKHRhYmxlKSA9PiB7XHJcbiAgICB0YWJsZS5zdHJpbmcoXCJndWlsZF9pZFwiKS51bmlxdWUoKVxyXG4gICAgdGFibGUuc3RyaW5nKFwicHJlZml4XCIpXHJcbiAgfSxcclxufSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhYmxlXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBQXFCO0FBRXJCLE1BQU0sUUFBUSxJQUFJLElBQUksTUFHbkI7QUFBQSxFQUNELE1BQU07QUFBQSxFQUNOLFVBQVUsQ0FBQyxXQUFVO0FBQ25CLFdBQU0sT0FBTyxZQUFZO0FBQ3pCLFdBQU0sT0FBTztBQUFBO0FBQUE7QUFJakIsSUFBTyxtQkFBUTsiLAogICJuYW1lcyI6IFtdCn0K
