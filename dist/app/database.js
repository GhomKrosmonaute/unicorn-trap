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
  Table: () => Table,
  db: () => db,
  tables: () => tables,
  tablesPath: () => tablesPath
});
var import_knex = __toModule(require("knex"));
var import_path = __toModule(require("path"));
var import_chalk = __toModule(require("chalk"));
var import_fs = __toModule(require("fs"));
var logger = __toModule(require("./logger"));
var _a;
const dataDirectory = import_path.default.join(process.cwd(), "data");
if (!import_fs.default.existsSync(dataDirectory))
  import_fs.default.mkdirSync(dataDirectory);
const db = (0, import_knex.default)({
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: import_path.default.join(process.cwd(), "data", "sqlite3.db")
  }
});
class Table {
  constructor(options) {
    this.options = options;
  }
  get query() {
    return db(this.options.name);
  }
  async make() {
    try {
      await db.schema.createTable(this.options.name, this.options.colMaker);
      logger.log(`created table ${import_chalk.default.blue(this.options.name)}`, "database");
    } catch (error) {
      logger.log(`loaded table ${import_chalk.default.blue(this.options.name)}`, "database");
    }
    return this;
  }
}
const tablesPath = (_a = process.env.TABLES_PATH) != null ? _a : import_path.default.join(process.cwd(), "dist", "tables");
const tables = new Map();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2FwcC9kYXRhYmFzZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IGtuZXggZnJvbSBcImtuZXhcIlxyXG5pbXBvcnQgeyBLbmV4IH0gZnJvbSBcImtuZXhcIlxyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiXHJcbmltcG9ydCBjaGFsayBmcm9tIFwiY2hhbGtcIlxyXG5pbXBvcnQgZnMgZnJvbSBcImZzXCJcclxuaW1wb3J0ICogYXMgbG9nZ2VyIGZyb20gXCIuL2xvZ2dlclwiXHJcblxyXG5jb25zdCBkYXRhRGlyZWN0b3J5ID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIFwiZGF0YVwiKVxyXG5cclxuaWYoIWZzLmV4aXN0c1N5bmMoZGF0YURpcmVjdG9yeSkpIGZzLm1rZGlyU3luYyhkYXRhRGlyZWN0b3J5KVxyXG5cclxuLyoqXHJcbiAqIFdlbGNvbWUgdG8gdGhlIGRhdGFiYXNlIGZpbGUhXHJcbiAqIFlvdSBjYW4gZ2V0IHRoZSBkb2NzIG9mICoqa25leCoqIFtoZXJlXShodHRwOi8va25leGpzLm9yZy8pXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IGRiID0ga25leCh7XHJcbiAgY2xpZW50OiBcInNxbGl0ZTNcIixcclxuICB1c2VOdWxsQXNEZWZhdWx0OiB0cnVlLFxyXG4gIGNvbm5lY3Rpb246IHtcclxuICAgIGZpbGVuYW1lOiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgXCJkYXRhXCIsIFwic3FsaXRlMy5kYlwiKVxyXG4gIH1cclxufSlcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGFibGVPcHRpb25zIHtcclxuICBuYW1lOiBzdHJpbmdcclxuICBjb2xNYWtlcjogKHRhYmxlOiBLbmV4LkNyZWF0ZVRhYmxlQnVpbGRlcikgPT4gdm9pZFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGU8VHlwZT4ge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBvcHRpb25zOiBUYWJsZU9wdGlvbnMpIHt9XHJcblxyXG4gIGdldCBxdWVyeSgpIHtcclxuICAgIHJldHVybiBkYjxUeXBlPih0aGlzLm9wdGlvbnMubmFtZSlcclxuICB9XHJcblxyXG4gIGFzeW5jIG1ha2UoKTogUHJvbWlzZTx0aGlzPiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCBkYi5zY2hlbWEuY3JlYXRlVGFibGUodGhpcy5vcHRpb25zLm5hbWUsIHRoaXMub3B0aW9ucy5jb2xNYWtlcilcclxuICAgICAgbG9nZ2VyLmxvZyhgY3JlYXRlZCB0YWJsZSAke2NoYWxrLmJsdWUodGhpcy5vcHRpb25zLm5hbWUpfWAsIFwiZGF0YWJhc2VcIilcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGxvZ2dlci5sb2coYGxvYWRlZCB0YWJsZSAke2NoYWxrLmJsdWUodGhpcy5vcHRpb25zLm5hbWUpfWAsIFwiZGF0YWJhc2VcIilcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdGFibGVzUGF0aCA9XHJcbiAgcHJvY2Vzcy5lbnYuVEFCTEVTX1BBVEggPz8gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIFwiZGlzdFwiLCBcInRhYmxlc1wiKVxyXG5cclxuZXhwb3J0IGNvbnN0IHRhYmxlcyA9IG5ldyBNYXA8c3RyaW5nLCBUYWJsZTxhbnk+PigpXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUFpQjtBQUVqQixrQkFBaUI7QUFDakIsbUJBQWtCO0FBQ2xCLGdCQUFlO0FBQ2YsYUFBd0I7QUFMeEI7QUFPQSxNQUFNLGdCQUFnQixvQkFBSyxLQUFLLFFBQVEsT0FBTztBQUUvQyxJQUFHLENBQUMsa0JBQUcsV0FBVztBQUFnQixvQkFBRyxVQUFVO0FBT3hDLE1BQU0sS0FBSyx5QkFBSztBQUFBLEVBQ3JCLFFBQVE7QUFBQSxFQUNSLGtCQUFrQjtBQUFBLEVBQ2xCLFlBQVk7QUFBQSxJQUNWLFVBQVUsb0JBQUssS0FBSyxRQUFRLE9BQU8sUUFBUTtBQUFBO0FBQUE7QUFTeEMsWUFBa0I7QUFBQSxFQUN2QixZQUE0QixTQUF1QjtBQUF2QjtBQUFBO0FBQUEsTUFFeEIsUUFBUTtBQUNWLFdBQU8sR0FBUyxLQUFLLFFBQVE7QUFBQTtBQUFBLFFBR3pCLE9BQXNCO0FBQzFCLFFBQUk7QUFDRixZQUFNLEdBQUcsT0FBTyxZQUFZLEtBQUssUUFBUSxNQUFNLEtBQUssUUFBUTtBQUM1RCxhQUFPLElBQUksaUJBQWlCLHFCQUFNLEtBQUssS0FBSyxRQUFRLFNBQVM7QUFBQSxhQUN0RCxPQUFQO0FBQ0EsYUFBTyxJQUFJLGdCQUFnQixxQkFBTSxLQUFLLEtBQUssUUFBUSxTQUFTO0FBQUE7QUFFOUQsV0FBTztBQUFBO0FBQUE7QUFJSixNQUFNLGFBQ1gsY0FBUSxJQUFJLGdCQUFaLFlBQTJCLG9CQUFLLEtBQUssUUFBUSxPQUFPLFFBQVE7QUFFdkQsTUFBTSxTQUFTLElBQUk7IiwKICAibmFtZXMiOiBbXQp9Cg==
