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
var import_figlet = __toModule(require("figlet"));
var import_path = __toModule(require("path"));
var import_boxen = __toModule(require("boxen"));
var import_chalk = __toModule(require("chalk"));
var app = __toModule(require("../app"));
const listener = {
  event: "ready",
  once: true,
  async run() {
    app.log("Ok i'm ready!", "system");
    (0, import_figlet.default)(require(import_path.default.join(process.cwd(), "package.json")).name, (err, value) => {
      if (err)
        return;
      console.log((0, import_boxen.default)(import_chalk.default.blueBright(value), {
        float: "center",
        borderStyle: {
          topLeft: " ",
          topRight: " ",
          bottomLeft: " ",
          bottomRight: " ",
          horizontal: " ",
          vertical: " "
        }
      }));
    });
  }
};
module.exports = listener;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2xpc3RlbmVycy9yZWFkeS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IGZpZ2xldCBmcm9tIFwiZmlnbGV0XCJcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIlxyXG5pbXBvcnQgYm94ZW4gZnJvbSBcImJveGVuXCJcclxuaW1wb3J0IGNoYWxrIGZyb20gXCJjaGFsa1wiXHJcblxyXG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcIi4uL2FwcFwiXHJcblxyXG5jb25zdCBsaXN0ZW5lcjogYXBwLkxpc3RlbmVyPFwicmVhZHlcIj4gPSB7XHJcbiAgZXZlbnQ6IFwicmVhZHlcIixcclxuICBvbmNlOiB0cnVlLFxyXG4gIGFzeW5jIHJ1bigpIHtcclxuICAgIGFwcC5sb2coXCJPayBpJ20gcmVhZHkhXCIsIFwic3lzdGVtXCIpXHJcbiAgICBmaWdsZXQoXHJcbiAgICAgIHJlcXVpcmUocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIFwicGFja2FnZS5qc29uXCIpKS5uYW1lLFxyXG4gICAgICAoZXJyLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGlmIChlcnIpIHJldHVyblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgYm94ZW4oY2hhbGsuYmx1ZUJyaWdodCh2YWx1ZSksIHtcclxuICAgICAgICAgICAgZmxvYXQ6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgIGJvcmRlclN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgdG9wTGVmdDogXCIgXCIsXHJcbiAgICAgICAgICAgICAgdG9wUmlnaHQ6IFwiIFwiLFxyXG4gICAgICAgICAgICAgIGJvdHRvbUxlZnQ6IFwiIFwiLFxyXG4gICAgICAgICAgICAgIGJvdHRvbVJpZ2h0OiBcIiBcIixcclxuICAgICAgICAgICAgICBob3Jpem9udGFsOiBcIiBcIixcclxuICAgICAgICAgICAgICB2ZXJ0aWNhbDogXCIgXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIClcclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH0sXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbGlzdGVuZXJcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW1CO0FBQ25CLGtCQUFpQjtBQUNqQixtQkFBa0I7QUFDbEIsbUJBQWtCO0FBRWxCLFVBQXFCO0FBRXJCLE1BQU0sV0FBa0M7QUFBQSxFQUN0QyxPQUFPO0FBQUEsRUFDUCxNQUFNO0FBQUEsUUFDQSxNQUFNO0FBQ1YsUUFBSSxJQUFJLGlCQUFpQjtBQUN6QiwrQkFDRSxRQUFRLG9CQUFLLEtBQUssUUFBUSxPQUFPLGlCQUFpQixNQUNsRCxDQUFDLEtBQUssVUFBVTtBQUNkLFVBQUk7QUFBSztBQUNULGNBQVEsSUFDTiwwQkFBTSxxQkFBTSxXQUFXLFFBQVE7QUFBQSxRQUM3QixPQUFPO0FBQUEsUUFDUCxhQUFhO0FBQUEsVUFDWCxTQUFTO0FBQUEsVUFDVCxVQUFVO0FBQUEsVUFDVixZQUFZO0FBQUEsVUFDWixhQUFhO0FBQUEsVUFDYixZQUFZO0FBQUEsVUFDWixVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVN4QixPQUFPLFVBQVU7IiwKICAibmFtZXMiOiBbXQp9Cg==
