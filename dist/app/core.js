var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var __assign = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
  CODE: () => CODE,
  cache: () => cache,
  dayjs: () => import_dayjs.default,
  resizeText: () => resizeText,
  rootPath: () => rootPath,
  scrap: () => scrap
});
var import_path = __toModule(require("path"));
var import_prettier = __toModule(require("prettier"));
var import_dayjs = __toModule(require("dayjs"));
var import_utc = __toModule(require("dayjs/plugin/utc"));
var import_timezone = __toModule(require("dayjs/plugin/timezone"));
var import_toObject = __toModule(require("dayjs/plugin/toObject"));
function scrap(item, ...args) {
  return typeof item === "function" ? item(...args) : item;
}
function rootPath(...path) {
  return (0, import_path.join)(process.cwd(), ...path);
}
const cache = new class {
  constructor() {
    this.data = {};
  }
  get(key) {
    return this.data[key];
  }
  set(key, value) {
    this.data[key] = value;
  }
  ensure(key, defaultValue) {
    let value = this.get(key);
    if (value === void 0) {
      value = defaultValue;
      this.set(key, value);
    }
    return value;
  }
}();
const CODE = {
  pattern: /^```(\S+)?\s(.+[^\\])```$/is,
  parse(raw) {
    const match = this.pattern.exec(raw);
    if (!match)
      return;
    return {
      lang: match[1],
      content: match[2]
    };
  },
  stringify({lang, content}) {
    return "```" + (lang != null ? lang : "") + "\n" + content + "\n```";
  },
  format(raw, options) {
    return import_prettier.default.format(raw, __assign({
      semi: false
    }, options != null ? options : {}));
  }
};
(() => {
  return Promise.resolve().then(() => __toModule(require(`dayjs/locale/${process.env.LOCALE}`))).then(() => import_dayjs.default.locale(process.env.LOCALE));
})();
import_dayjs.default.extend(import_utc.default);
import_dayjs.default.extend(import_timezone.default);
import_dayjs.default.extend(import_toObject.default);
import_dayjs.default.utc(1);
if (process.env.TIMEZONE)
  import_dayjs.default.tz.setDefault(process.env.TIMEZONE);
function resizeText(text, size, before = false) {
  text = String(text);
  if (text.length < size) {
    return before ? " ".repeat(size - text.length) + text : text + " ".repeat(size - text.length);
  } else if (text.length > size) {
    return text.slice(0, size);
  } else {
    return text;
  }
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2FwcC9jb3JlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIlxyXG5cclxuaW1wb3J0IHByZXR0aWVyIGZyb20gXCJwcmV0dGllclwiXHJcbmltcG9ydCBkYXlqcyBmcm9tIFwiZGF5anNcIlxyXG5pbXBvcnQgdXRjIGZyb20gXCJkYXlqcy9wbHVnaW4vdXRjXCJcclxuaW1wb3J0IHRpbWV6b25lIGZyb20gXCJkYXlqcy9wbHVnaW4vdGltZXpvbmVcIlxyXG5pbXBvcnQgdG9PYmplY3QgZnJvbSBcImRheWpzL3BsdWdpbi90b09iamVjdFwiXHJcblxyXG4vKipcclxuICogUmVzb2x2ZSBgVGAgdmFsdWUgZnJvbSBgVCB8ICgoKSA9PiBUKWBcclxuICogQHBhcmFtIGl0ZW0gLSByZXNvbHZhYmxlXHJcbiAqIEBwYXJhbSBhcmdzIC0gcGFyYW1ldGVycyBmb3IgcmVzb2x2YWJsZSBmdW5jdGlvblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNjcmFwPFQsIEEgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPihcclxuICBpdGVtOiBUIHwgKCguLi5hcmdzOiBBKSA9PiBUKSxcclxuICAuLi5hcmdzOiBBXHJcbik6IFQge1xyXG4gIC8vIEB0cy1pZ25vcmVcclxuICByZXR1cm4gdHlwZW9mIGl0ZW0gPT09IFwiZnVuY3Rpb25cIiA/IGl0ZW0oLi4uYXJncykgOiBpdGVtXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNYWtlIGEgcGF0aCBmcm9tIHJvb3Qgb2YgcHJvamVjdCBhbmQgcmV0dXJuIGl0XHJcbiAqIEBwYXJhbSBwYXRoXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcm9vdFBhdGgoLi4ucGF0aDogc3RyaW5nW10pOiBzdHJpbmcge1xyXG4gIHJldHVybiBqb2luKHByb2Nlc3MuY3dkKCksIC4uLnBhdGgpXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTaW1wbGUgY2FjaGUgZm9yIG1hbmFnZSB0ZW1wb3JhcnkgdmFsdWVzXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY2FjaGUgPSBuZXcgKGNsYXNzIHtcclxuICBwcml2YXRlIGRhdGE6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7fVxyXG5cclxuICBnZXQ8VD4oa2V5OiBzdHJpbmcpOiBUIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGFba2V5XVxyXG4gIH1cclxuXHJcbiAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICB0aGlzLmRhdGFba2V5XSA9IHZhbHVlXHJcbiAgfVxyXG5cclxuICBlbnN1cmU8VD4oa2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZTogVCk6IFQge1xyXG4gICAgbGV0IHZhbHVlID0gdGhpcy5nZXQ8VD4oa2V5KVxyXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdmFsdWUgPSBkZWZhdWx0VmFsdWVcclxuICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZSlcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZVxyXG4gIH1cclxufSkoKVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb2RlIHtcclxuICBsYW5nPzogc3RyaW5nXHJcbiAgY29udGVudDogc3RyaW5nXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBDT0RFID0ge1xyXG4gIHBhdHRlcm46IC9eYGBgKFxcUyspP1xccyguK1teXFxcXF0pYGBgJC9pcyxcclxuICAvKipcclxuICAgKiBleHRyYWN0IHRoZSBjb2RlIGZyb20gY29kZSBibG9jayBhbmQgcmV0dXJuIGNvZGVcclxuICAgKi9cclxuICBwYXJzZShyYXc6IHN0cmluZyk6IENvZGUgfCB1bmRlZmluZWQge1xyXG4gICAgY29uc3QgbWF0Y2ggPSB0aGlzLnBhdHRlcm4uZXhlYyhyYXcpXHJcbiAgICBpZiAoIW1hdGNoKSByZXR1cm5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGxhbmc6IG1hdGNoWzFdLFxyXG4gICAgICBjb250ZW50OiBtYXRjaFsyXSxcclxuICAgIH1cclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIGluamVjdCB0aGUgY29kZSBpbiB0aGUgY29kZSBibG9jayBhbmQgcmV0dXJuIGNvZGUgYmxvY2tcclxuICAgKi9cclxuICBzdHJpbmdpZnkoeyBsYW5nLCBjb250ZW50IH06IENvZGUpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFwiYGBgXCIgKyAobGFuZyA/PyBcIlwiKSArIFwiXFxuXCIgKyBjb250ZW50ICsgXCJcXG5gYGBcIlxyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogZm9ybWF0IHRoZSBjb2RlIHVzaW5nIHByZXR0aWVyIGFuZCByZXR1cm4gaXRcclxuICAgKi9cclxuICBmb3JtYXQocmF3OiBzdHJpbmcsIG9wdGlvbnM/OiBwcmV0dGllci5PcHRpb25zKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBwcmV0dGllci5mb3JtYXQocmF3LCB7XHJcbiAgICAgIHNlbWk6IGZhbHNlLFxyXG4gICAgICAuLi4ob3B0aW9ucyA/PyB7fSksXHJcbiAgICB9KVxyXG4gIH0sXHJcbn1cclxuOygoKSA9PiB7XHJcbiAgcmV0dXJuIGltcG9ydChgZGF5anMvbG9jYWxlLyR7cHJvY2Vzcy5lbnYuTE9DQUxFfWApLnRoZW4oKCkgPT5cclxuICAgIGRheWpzLmxvY2FsZShwcm9jZXNzLmVudi5MT0NBTEUpXHJcbiAgKVxyXG59KSgpXHJcblxyXG5kYXlqcy5leHRlbmQodXRjKVxyXG5kYXlqcy5leHRlbmQodGltZXpvbmUpXHJcbmRheWpzLmV4dGVuZCh0b09iamVjdClcclxuZGF5anMudXRjKDEpXHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuVElNRVpPTkUpIGRheWpzLnR6LnNldERlZmF1bHQocHJvY2Vzcy5lbnYuVElNRVpPTkUpXHJcblxyXG5leHBvcnQgeyBkYXlqcyB9XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVzaXplVGV4dChcclxuICB0ZXh0OiBzdHJpbmcgfCBudW1iZXIsXHJcbiAgc2l6ZTogbnVtYmVyLFxyXG4gIGJlZm9yZSA9IGZhbHNlXHJcbik6IHN0cmluZyB7XHJcbiAgdGV4dCA9IFN0cmluZyh0ZXh0KVxyXG4gIGlmICh0ZXh0Lmxlbmd0aCA8IHNpemUpIHtcclxuICAgIHJldHVybiBiZWZvcmVcclxuICAgICAgPyBcIiBcIi5yZXBlYXQoc2l6ZSAtIHRleHQubGVuZ3RoKSArIHRleHRcclxuICAgICAgOiB0ZXh0ICsgXCIgXCIucmVwZWF0KHNpemUgLSB0ZXh0Lmxlbmd0aClcclxuICB9IGVsc2UgaWYgKHRleHQubGVuZ3RoID4gc2l6ZSkge1xyXG4gICAgcmV0dXJuIHRleHQuc2xpY2UoMCwgc2l6ZSlcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHRleHRcclxuICB9XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBQXFCO0FBRXJCLHNCQUFxQjtBQUNyQixtQkFBa0I7QUFDbEIsaUJBQWdCO0FBQ2hCLHNCQUFxQjtBQUNyQixzQkFBcUI7QUFPZCxlQUNMLFNBQ0csTUFDQTtBQUVILFNBQU8sT0FBTyxTQUFTLGFBQWEsS0FBSyxHQUFHLFFBQVE7QUFBQTtBQU8vQyxxQkFBcUIsTUFBd0I7QUFDbEQsU0FBTyxzQkFBSyxRQUFRLE9BQU8sR0FBRztBQUFBO0FBTXpCLE1BQU0sUUFBUSxJQUFLLE1BQU07QUFBQSxFQUFOLGNBaEMxQjtBQWlDVSxnQkFBK0I7QUFBQTtBQUFBLEVBRXZDLElBQU8sS0FBNEI7QUFDakMsV0FBTyxLQUFLLEtBQUs7QUFBQTtBQUFBLEVBR25CLElBQUksS0FBYSxPQUFZO0FBQzNCLFNBQUssS0FBSyxPQUFPO0FBQUE7QUFBQSxFQUduQixPQUFVLEtBQWEsY0FBb0I7QUFDekMsUUFBSSxRQUFRLEtBQUssSUFBTztBQUN4QixRQUFJLFVBQVUsUUFBVztBQUN2QixjQUFRO0FBQ1IsV0FBSyxJQUFJLEtBQUs7QUFBQTtBQUVoQixXQUFPO0FBQUE7QUFBQTtBQVNKLE1BQU0sT0FBTztBQUFBLEVBQ2xCLFNBQVM7QUFBQSxFQUlULE1BQU0sS0FBK0I7QUFDbkMsVUFBTSxRQUFRLEtBQUssUUFBUSxLQUFLO0FBQ2hDLFFBQUksQ0FBQztBQUFPO0FBQ1osV0FBTztBQUFBLE1BQ0wsTUFBTSxNQUFNO0FBQUEsTUFDWixTQUFTLE1BQU07QUFBQTtBQUFBO0FBQUEsRUFNbkIsVUFBVSxDQUFFLE1BQU0sVUFBeUI7QUFDekMsV0FBTyxRQUFTLHVCQUFRLE1BQU0sT0FBTyxVQUFVO0FBQUE7QUFBQSxFQUtqRCxPQUFPLEtBQWEsU0FBb0M7QUFDdEQsV0FBTyx3QkFBUyxPQUFPLEtBQUs7QUFBQSxNQUMxQixNQUFNO0FBQUEsT0FDRiw0QkFBVztBQUFBO0FBQUE7QUFJcEIsQUFBQyxPQUFNO0FBQ04sU0FBTyw2QkFBTyxXQUFQLFFBQU8sZ0JBQWdCLFFBQVEsSUFBSSxZQUFVLEtBQUssTUFDdkQscUJBQU0sT0FBTyxRQUFRLElBQUk7QUFBQTtBQUk3QixxQkFBTSxPQUFPO0FBQ2IscUJBQU0sT0FBTztBQUNiLHFCQUFNLE9BQU87QUFDYixxQkFBTSxJQUFJO0FBRVYsSUFBSSxRQUFRLElBQUk7QUFBVSx1QkFBTSxHQUFHLFdBQVcsUUFBUSxJQUFJO0FBSW5ELG9CQUNMLE1BQ0EsTUFDQSxTQUFTLE9BQ0Q7QUFDUixTQUFPLE9BQU87QUFDZCxNQUFJLEtBQUssU0FBUyxNQUFNO0FBQ3RCLFdBQU8sU0FDSCxJQUFJLE9BQU8sT0FBTyxLQUFLLFVBQVUsT0FDakMsT0FBTyxJQUFJLE9BQU8sT0FBTyxLQUFLO0FBQUEsYUFDekIsS0FBSyxTQUFTLE1BQU07QUFDN0IsV0FBTyxLQUFLLE1BQU0sR0FBRztBQUFBLFNBQ2hCO0FBQ0wsV0FBTztBQUFBO0FBQUE7IiwKICAibmFtZXMiOiBbXQp9Cg==
