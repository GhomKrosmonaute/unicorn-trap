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
  createLogger: () => createLogger,
  error: () => error,
  log: () => log,
  logLevelColors: () => logLevelColors,
  loggerPattern: () => loggerPattern,
  success: () => success,
  warn: () => warn
});
var import_chalk = __toModule(require("chalk"));
var import_dayjs = __toModule(require("dayjs"));
const logLevelColors = {
  warn: "#ffa600",
  error: "#ff0000",
  info: "#00ffff",
  success: "#00ff00"
};
const loggerPattern = (text, level, section) => {
  return `${import_chalk.default.grey((0, import_dayjs.default)().format("DD/MM/YY HH:mm"))} ${import_chalk.default.hex(logLevelColors[level])(level.toUpperCase())}${section ? " " + import_chalk.default.magentaBright(`${section}`) : ""} ${text}`;
};
function log(text, section) {
  console.log(loggerPattern(text, "info", section));
}
function error(text, section, full) {
  console.error(loggerPattern(text instanceof Error ? text.message.split("\n")[0] : text, "error", section));
  if (full && text instanceof Error)
    console.error(text);
}
function warn(text, section) {
  console.warn(loggerPattern(text, "warn", section));
}
function success(text, section) {
  console.log(loggerPattern(text, "success", section));
}
function createLogger(section) {
  return {
    log: (text) => log(text, section),
    error: (text, full) => error(text, section, full),
    warn: (text) => warn(text, section),
    success: (text) => success(text, section)
  };
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2FwcC9sb2dnZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBjaGFsayBmcm9tIFwiY2hhbGtcIlxyXG5pbXBvcnQgZGF5anMgZnJvbSBcImRheWpzXCJcclxuXHJcbmV4cG9ydCBjb25zdCBsb2dMZXZlbENvbG9ycyA9IHtcclxuICB3YXJuOiBcIiNmZmE2MDBcIixcclxuICBlcnJvcjogXCIjZmYwMDAwXCIsXHJcbiAgaW5mbzogXCIjMDBmZmZmXCIsXHJcbiAgc3VjY2VzczogXCIjMDBmZjAwXCIsXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIExvZ0xldmVsID0ga2V5b2YgdHlwZW9mIGxvZ0xldmVsQ29sb3JzXHJcblxyXG5leHBvcnQgY29uc3QgbG9nZ2VyUGF0dGVybiA9IChcclxuICB0ZXh0OiBzdHJpbmcsXHJcbiAgbGV2ZWw6IExvZ0xldmVsLFxyXG4gIHNlY3Rpb24/OiBzdHJpbmdcclxuKSA9PiB7XHJcbiAgcmV0dXJuIGAke2NoYWxrLmdyZXkoZGF5anMoKS5mb3JtYXQoXCJERC9NTS9ZWSBISDptbVwiKSl9ICR7Y2hhbGsuaGV4KFxyXG4gICAgbG9nTGV2ZWxDb2xvcnNbbGV2ZWxdXHJcbiAgKShsZXZlbC50b1VwcGVyQ2FzZSgpKX0ke1xyXG4gICAgc2VjdGlvbiA/IFwiIFwiICsgY2hhbGsubWFnZW50YUJyaWdodChgJHtzZWN0aW9ufWApIDogXCJcIlxyXG4gIH0gJHt0ZXh0fWBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxvZyh0ZXh0OiBzdHJpbmcsIHNlY3Rpb24/OiBzdHJpbmcpIHtcclxuICBjb25zb2xlLmxvZyhsb2dnZXJQYXR0ZXJuKHRleHQsIFwiaW5mb1wiLCBzZWN0aW9uKSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGVycm9yKHRleHQ6IHN0cmluZyB8IEVycm9yLCBzZWN0aW9uPzogc3RyaW5nLCBmdWxsPzogYm9vbGVhbikge1xyXG4gIGNvbnNvbGUuZXJyb3IoXHJcbiAgICBsb2dnZXJQYXR0ZXJuKFxyXG4gICAgICB0ZXh0IGluc3RhbmNlb2YgRXJyb3IgPyB0ZXh0Lm1lc3NhZ2Uuc3BsaXQoXCJcXG5cIilbMF0gOiB0ZXh0LFxyXG4gICAgICBcImVycm9yXCIsXHJcbiAgICAgIHNlY3Rpb25cclxuICAgIClcclxuICApXHJcbiAgaWYgKGZ1bGwgJiYgdGV4dCBpbnN0YW5jZW9mIEVycm9yKSBjb25zb2xlLmVycm9yKHRleHQpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB3YXJuKHRleHQ6IHN0cmluZywgc2VjdGlvbj86IHN0cmluZykge1xyXG4gIGNvbnNvbGUud2Fybihsb2dnZXJQYXR0ZXJuKHRleHQsIFwid2FyblwiLCBzZWN0aW9uKSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHN1Y2Nlc3ModGV4dDogc3RyaW5nLCBzZWN0aW9uPzogc3RyaW5nKSB7XHJcbiAgY29uc29sZS5sb2cobG9nZ2VyUGF0dGVybih0ZXh0LCBcInN1Y2Nlc3NcIiwgc2VjdGlvbikpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMb2dnZXIoc2VjdGlvbj86IHN0cmluZykge1xyXG4gIHJldHVybiB7XHJcbiAgICBsb2c6ICh0ZXh0OiBzdHJpbmcpID0+IGxvZyh0ZXh0LCBzZWN0aW9uKSxcclxuICAgIGVycm9yOiAodGV4dDogc3RyaW5nLCBmdWxsPzogYm9vbGVhbikgPT4gZXJyb3IodGV4dCwgc2VjdGlvbiwgZnVsbCksXHJcbiAgICB3YXJuOiAodGV4dDogc3RyaW5nKSA9PiB3YXJuKHRleHQsIHNlY3Rpb24pLFxyXG4gICAgc3VjY2VzczogKHRleHQ6IHN0cmluZykgPT4gc3VjY2Vzcyh0ZXh0LCBzZWN0aW9uKSxcclxuICB9XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQWtCO0FBQ2xCLG1CQUFrQjtBQUVYLE1BQU0saUJBQWlCO0FBQUEsRUFDNUIsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLEVBQ1AsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBO0FBS0osTUFBTSxnQkFBZ0IsQ0FDM0IsTUFDQSxPQUNBLFlBQ0c7QUFDSCxTQUFPLEdBQUcscUJBQU0sS0FBSyw0QkFBUSxPQUFPLHNCQUFzQixxQkFBTSxJQUM5RCxlQUFlLFFBQ2YsTUFBTSxpQkFDTixVQUFVLE1BQU0scUJBQU0sY0FBYyxHQUFHLGFBQWEsTUFDbEQ7QUFBQTtBQUdDLGFBQWEsTUFBYyxTQUFrQjtBQUNsRCxVQUFRLElBQUksY0FBYyxNQUFNLFFBQVE7QUFBQTtBQUduQyxlQUFlLE1BQXNCLFNBQWtCLE1BQWdCO0FBQzVFLFVBQVEsTUFDTixjQUNFLGdCQUFnQixRQUFRLEtBQUssUUFBUSxNQUFNLE1BQU0sS0FBSyxNQUN0RCxTQUNBO0FBR0osTUFBSSxRQUFRLGdCQUFnQjtBQUFPLFlBQVEsTUFBTTtBQUFBO0FBRzVDLGNBQWMsTUFBYyxTQUFrQjtBQUNuRCxVQUFRLEtBQUssY0FBYyxNQUFNLFFBQVE7QUFBQTtBQUdwQyxpQkFBaUIsTUFBYyxTQUFrQjtBQUN0RCxVQUFRLElBQUksY0FBYyxNQUFNLFdBQVc7QUFBQTtBQUd0QyxzQkFBc0IsU0FBa0I7QUFDN0MsU0FBTztBQUFBLElBQ0wsS0FBSyxDQUFDLFNBQWlCLElBQUksTUFBTTtBQUFBLElBQ2pDLE9BQU8sQ0FBQyxNQUFjLFNBQW1CLE1BQU0sTUFBTSxTQUFTO0FBQUEsSUFDOUQsTUFBTSxDQUFDLFNBQWlCLEtBQUssTUFBTTtBQUFBLElBQ25DLFNBQVMsQ0FBQyxTQUFpQixRQUFRLE1BQU07QUFBQTtBQUFBOyIsCiAgIm5hbWVzIjogW10KfQo=
