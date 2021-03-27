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
const listener = {
  event: "messageDelete",
  async run(message) {
    const paginator = app.Paginator.getByMessage(message);
    if (paginator)
      return paginator.deactivate();
  }
};
module.exports = listener;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2xpc3RlbmVycy9tZXNzYWdlRGVsZXRlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgKiBhcyBhcHAgZnJvbSBcIi4uL2FwcFwiXHJcblxyXG5jb25zdCBsaXN0ZW5lcjogYXBwLkxpc3RlbmVyPFwibWVzc2FnZURlbGV0ZVwiPiA9IHtcclxuICBldmVudDogXCJtZXNzYWdlRGVsZXRlXCIsXHJcbiAgYXN5bmMgcnVuKG1lc3NhZ2UpIHtcclxuICAgIGNvbnN0IHBhZ2luYXRvciA9IGFwcC5QYWdpbmF0b3IuZ2V0QnlNZXNzYWdlKG1lc3NhZ2UpXHJcblxyXG4gICAgaWYgKHBhZ2luYXRvcikgcmV0dXJuIHBhZ2luYXRvci5kZWFjdGl2YXRlKClcclxuICB9LFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3RlbmVyXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFVBQXFCO0FBRXJCLE1BQU0sV0FBMEM7QUFBQSxFQUM5QyxPQUFPO0FBQUEsUUFDRCxJQUFJLFNBQVM7QUFDakIsVUFBTSxZQUFZLElBQUksVUFBVSxhQUFhO0FBRTdDLFFBQUk7QUFBVyxhQUFPLFVBQVU7QUFBQTtBQUFBO0FBSXBDLE9BQU8sVUFBVTsiLAogICJuYW1lcyI6IFtdCn0K
