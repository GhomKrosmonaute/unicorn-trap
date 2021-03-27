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
  Paginator: () => Paginator
});
var import_events = __toModule(require("events"));
const _Paginator = class extends import_events.default.EventEmitter {
  constructor(pages, channel, filter, idlTime = 6e4, customEmojis) {
    super();
    this.pages = pages;
    this.channel = channel;
    this.filter = filter;
    this.idlTime = idlTime;
    this.pageIndex = 0;
    this.emojis = {
      previous: "\u25C0\uFE0F",
      next: "\u25B6\uFE0F",
      start: "\u23EA",
      end: "\u23E9"
    };
    if (pages.length === 0)
      return;
    if (idlTime)
      this.idlTime = idlTime;
    if (customEmojis)
      Object.assign(this.emojis, customEmojis);
    this.deactivation = this.resetDeactivationTimeout();
    channel.send(this.currentPage).then(async (message) => {
      this.messageID = message.id;
      if (this.pages.length > 1)
        for (const key of ["start", "previous", "next", "end"])
          await message.react(this.emojis[key]);
    });
    _Paginator.paginations.push(this);
  }
  get currentPage() {
    return this.pages[this.pageIndex];
  }
  render() {
    var _a;
    if (this.messageID) {
      (_a = this.channel.messages.cache.get(this.messageID)) == null ? void 0 : _a.edit(this.currentPage).catch();
    }
  }
  handleReaction(reaction, user) {
    if (!this.filter(reaction, user))
      return;
    const {emoji} = reaction;
    const emojiID = emoji.id || emoji.name;
    let currentKey = null;
    for (const key in this.emojis) {
      if (this.emojis[key] === emojiID) {
        currentKey = key;
      }
    }
    if (currentKey) {
      switch (currentKey) {
        case "start":
          this.pageIndex = 0;
          break;
        case "end":
          this.pageIndex = this.pages.length - 1;
          break;
        case "next":
          this.pageIndex++;
          if (this.pageIndex > this.pages.length - 1) {
            this.pageIndex = 0;
          }
          break;
        case "previous":
          this.pageIndex--;
          if (this.pageIndex < 0) {
            this.pageIndex = this.pages.length - 1;
          }
      }
      this.render();
      this.deactivation = this.resetDeactivationTimeout();
      reaction.users.remove(user).catch();
    }
  }
  resetDeactivationTimeout() {
    clearTimeout(this.deactivation);
    return setTimeout(() => this.deactivate().catch(), this.idlTime);
  }
  async deactivate() {
    var _a;
    if (!this.messageID)
      return;
    clearTimeout(this.deactivation);
    const message = await this.channel.messages.cache.get(this.messageID);
    if (message && message.channel.type === "text")
      await ((_a = message.reactions) == null ? void 0 : _a.removeAll());
    _Paginator.paginations = _Paginator.paginations.filter((paginator) => {
      return paginator.messageID !== this.messageID;
    });
  }
  static getByMessage(message) {
    return this.paginations.find((paginator) => {
      return paginator.messageID === message.id;
    });
  }
  static divider(items, itemCountByDivision) {
    const divided = [];
    const divisionCount = Math.ceil(items.length / itemCountByDivision);
    for (let i = 0; i < divisionCount; i++) {
      divided.push(items.slice(itemCountByDivision * i, itemCountByDivision * (i + 1)));
    }
    return divided;
  }
};
let Paginator = _Paginator;
Paginator.paginations = [];
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2FwcC9wYWdpbmF0aW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgRXZlbnRzIGZyb20gXCJldmVudHNcIlxyXG5pbXBvcnQgRGlzY29yZCBmcm9tIFwiZGlzY29yZC5qc1wiXHJcblxyXG4vKiogQXMgU25vd2ZsYWtlcyBvciBpY29ucyAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFBhZ2luYXRvckVtb2ppcyB7XHJcbiAgcHJldmlvdXM6IHN0cmluZ1xyXG4gIG5leHQ6IHN0cmluZ1xyXG4gIHN0YXJ0OiBzdHJpbmdcclxuICBlbmQ6IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGFnaW5hdG9yIGV4dGVuZHMgRXZlbnRzLkV2ZW50RW1pdHRlciB7XHJcbiAgc3RhdGljIHBhZ2luYXRpb25zOiBQYWdpbmF0b3JbXSA9IFtdXHJcblxyXG4gIHByaXZhdGUgcGFnZUluZGV4ID0gMFxyXG4gIHByaXZhdGUgZGVhY3RpdmF0aW9uPzogTm9kZUpTLlRpbWVvdXRcclxuICBtZXNzYWdlSUQ6IHN0cmluZyB8IHVuZGVmaW5lZFxyXG4gIGVtb2ppczogUGFnaW5hdG9yRW1vamlzID0ge1xyXG4gICAgcHJldmlvdXM6IFwiXHUyNUMwXHVGRTBGXCIsXHJcbiAgICBuZXh0OiBcIlx1MjVCNlx1RkUwRlwiLFxyXG4gICAgc3RhcnQ6IFwiXHUyM0VBXCIsXHJcbiAgICBlbmQ6IFwiXHUyM0U5XCIsXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKiBAcGFyYW0gcGFnZXMgLSBBcnJheSBvZiBwYWdlc1xyXG4gICAqIEBwYXJhbSB7VGV4dENoYW5uZWwgfCBETUNoYW5uZWwgfCBOZXdzQ2hhbm5lbH0gY2hhbm5lbCAtIENoYW5uZWwgd2hlcmUgc2VuZCB0aGUgcGFnaW5hdG9yIG1lc3NhZ2VcclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmaWx0ZXIgLSBVc2VkIHRvIGZpbHRlciB3aGF0IHJlYWN0aW9uTWVzc2FnZSBpcyB2YWxpZFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpZGxUaW1lIC0gVGltZSBiZXR3ZWVuIGxhc3QgYWN0aW9uIGFuZCBwYWdpbmF0b3IgZGVhY3RpdmF0aW9uIGluIG1pbGxpc2Vjb25kcy4gKGRlZmF1bHQ6IDEgbWluKVxyXG4gICAqIEBwYXJhbSB7UGFydGlhbDxQYWdpbmF0b3JFbW9qaXM+fSBjdXN0b21FbW9qaXMgLSBDdXN0b20gZW1vamlzIHRvIG92ZXJ3cml0ZVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIHBhZ2VzOiAoRGlzY29yZC5NZXNzYWdlRW1iZWQgfCBzdHJpbmcpW10sXHJcbiAgICBwdWJsaWMgY2hhbm5lbDpcclxuICAgICAgfCBEaXNjb3JkLlRleHRDaGFubmVsXHJcbiAgICAgIHwgRGlzY29yZC5ETUNoYW5uZWxcclxuICAgICAgfCBEaXNjb3JkLk5ld3NDaGFubmVsLFxyXG4gICAgcHVibGljIGZpbHRlcjogKFxyXG4gICAgICByZWFjdGlvbjogRGlzY29yZC5NZXNzYWdlUmVhY3Rpb24sXHJcbiAgICAgIHVzZXI6IERpc2NvcmQuVXNlciB8IERpc2NvcmQuUGFydGlhbFVzZXJcclxuICAgICkgPT4gYm9vbGVhbixcclxuICAgIHB1YmxpYyBpZGxUaW1lOiBudW1iZXIgPSA2MDAwMCxcclxuICAgIGN1c3RvbUVtb2ppcz86IFBhcnRpYWw8UGFnaW5hdG9yRW1vamlzPlxyXG4gICkge1xyXG4gICAgc3VwZXIoKVxyXG5cclxuICAgIGlmIChwYWdlcy5sZW5ndGggPT09IDApIHJldHVyblxyXG5cclxuICAgIGlmIChpZGxUaW1lKSB0aGlzLmlkbFRpbWUgPSBpZGxUaW1lXHJcblxyXG4gICAgaWYgKGN1c3RvbUVtb2ppcykgT2JqZWN0LmFzc2lnbih0aGlzLmVtb2ppcywgY3VzdG9tRW1vamlzKVxyXG5cclxuICAgIHRoaXMuZGVhY3RpdmF0aW9uID0gdGhpcy5yZXNldERlYWN0aXZhdGlvblRpbWVvdXQoKVxyXG5cclxuICAgIGNoYW5uZWwuc2VuZCh0aGlzLmN1cnJlbnRQYWdlKS50aGVuKGFzeW5jIChtZXNzYWdlKSA9PiB7XHJcbiAgICAgIHRoaXMubWVzc2FnZUlEID0gbWVzc2FnZS5pZFxyXG5cclxuICAgICAgaWYgKHRoaXMucGFnZXMubGVuZ3RoID4gMSlcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBbXCJzdGFydFwiLCBcInByZXZpb3VzXCIsIFwibmV4dFwiLCBcImVuZFwiXSlcclxuICAgICAgICAgIGF3YWl0IG1lc3NhZ2UucmVhY3QodGhpcy5lbW9qaXNba2V5IGFzIGtleW9mIFBhZ2luYXRvckVtb2ppc10pXHJcbiAgICB9KVxyXG5cclxuICAgIFBhZ2luYXRvci5wYWdpbmF0aW9ucy5wdXNoKHRoaXMpXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldCBjdXJyZW50UGFnZSgpOiBEaXNjb3JkLk1lc3NhZ2VFbWJlZCB8IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5wYWdlc1t0aGlzLnBhZ2VJbmRleF1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVuZGVyKCkge1xyXG4gICAgaWYgKHRoaXMubWVzc2FnZUlEKSB7XHJcbiAgICAgIHRoaXMuY2hhbm5lbC5tZXNzYWdlcy5jYWNoZVxyXG4gICAgICAgIC5nZXQodGhpcy5tZXNzYWdlSUQpXHJcbiAgICAgICAgPy5lZGl0KHRoaXMuY3VycmVudFBhZ2UpXHJcbiAgICAgICAgLmNhdGNoKClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYW5kbGVSZWFjdGlvbihcclxuICAgIHJlYWN0aW9uOiBEaXNjb3JkLk1lc3NhZ2VSZWFjdGlvbixcclxuICAgIHVzZXI6IERpc2NvcmQuVXNlciB8IERpc2NvcmQuUGFydGlhbFVzZXJcclxuICApIHtcclxuICAgIGlmICghdGhpcy5maWx0ZXIocmVhY3Rpb24sIHVzZXIpKSByZXR1cm5cclxuXHJcbiAgICBjb25zdCB7IGVtb2ppIH0gPSByZWFjdGlvblxyXG4gICAgY29uc3QgZW1vamlJRCA9IGVtb2ppLmlkIHx8IGVtb2ppLm5hbWVcclxuXHJcbiAgICBsZXQgY3VycmVudEtleToga2V5b2YgUGFnaW5hdG9yRW1vamlzIHwgbnVsbCA9IG51bGxcclxuICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuZW1vamlzKSB7XHJcbiAgICAgIGlmICh0aGlzLmVtb2ppc1trZXkgYXMga2V5b2YgUGFnaW5hdG9yRW1vamlzXSA9PT0gZW1vamlJRCkge1xyXG4gICAgICAgIGN1cnJlbnRLZXkgPSBrZXkgYXMga2V5b2YgUGFnaW5hdG9yRW1vamlzXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoY3VycmVudEtleSkge1xyXG4gICAgICBzd2l0Y2ggKGN1cnJlbnRLZXkpIHtcclxuICAgICAgICBjYXNlIFwic3RhcnRcIjpcclxuICAgICAgICAgIHRoaXMucGFnZUluZGV4ID0gMFxyXG4gICAgICAgICAgYnJlYWtcclxuICAgICAgICBjYXNlIFwiZW5kXCI6XHJcbiAgICAgICAgICB0aGlzLnBhZ2VJbmRleCA9IHRoaXMucGFnZXMubGVuZ3RoIC0gMVxyXG4gICAgICAgICAgYnJlYWtcclxuICAgICAgICBjYXNlIFwibmV4dFwiOlxyXG4gICAgICAgICAgdGhpcy5wYWdlSW5kZXgrK1xyXG4gICAgICAgICAgaWYgKHRoaXMucGFnZUluZGV4ID4gdGhpcy5wYWdlcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZUluZGV4ID0gMFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWtcclxuICAgICAgICBjYXNlIFwicHJldmlvdXNcIjpcclxuICAgICAgICAgIHRoaXMucGFnZUluZGV4LS1cclxuICAgICAgICAgIGlmICh0aGlzLnBhZ2VJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlSW5kZXggPSB0aGlzLnBhZ2VzLmxlbmd0aCAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5yZW5kZXIoKVxyXG5cclxuICAgICAgdGhpcy5kZWFjdGl2YXRpb24gPSB0aGlzLnJlc2V0RGVhY3RpdmF0aW9uVGltZW91dCgpXHJcblxyXG4gICAgICByZWFjdGlvbi51c2Vycy5yZW1vdmUodXNlciBhcyBEaXNjb3JkLlVzZXIpLmNhdGNoKClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVzZXREZWFjdGl2YXRpb25UaW1lb3V0KCkge1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuZGVhY3RpdmF0aW9uIGFzIE5vZGVKUy5UaW1lb3V0KVxyXG4gICAgcmV0dXJuIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kZWFjdGl2YXRlKCkuY2F0Y2goKSwgdGhpcy5pZGxUaW1lKVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGRlYWN0aXZhdGUoKSB7XHJcbiAgICBpZiAoIXRoaXMubWVzc2FnZUlEKSByZXR1cm5cclxuXHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5kZWFjdGl2YXRpb24gYXMgTm9kZUpTLlRpbWVvdXQpXHJcblxyXG4gICAgLy8gcmVtb3ZlIHJlYWN0aW9ucyBpZiBtZXNzYWdlIGlzIG5vdCBkZWxldGVkIGFuZCBpZiBpcyBpbiBndWlsZFxyXG4gICAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IHRoaXMuY2hhbm5lbC5tZXNzYWdlcy5jYWNoZS5nZXQodGhpcy5tZXNzYWdlSUQpXHJcbiAgICBpZiAobWVzc2FnZSAmJiBtZXNzYWdlLmNoYW5uZWwudHlwZSA9PT0gXCJ0ZXh0XCIpXHJcbiAgICAgIGF3YWl0IG1lc3NhZ2UucmVhY3Rpb25zPy5yZW1vdmVBbGwoKVxyXG5cclxuICAgIFBhZ2luYXRvci5wYWdpbmF0aW9ucyA9IFBhZ2luYXRvci5wYWdpbmF0aW9ucy5maWx0ZXIoKHBhZ2luYXRvcikgPT4ge1xyXG4gICAgICByZXR1cm4gcGFnaW5hdG9yLm1lc3NhZ2VJRCAhPT0gdGhpcy5tZXNzYWdlSURcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldEJ5TWVzc2FnZShcclxuICAgIG1lc3NhZ2U6IERpc2NvcmQuTWVzc2FnZSB8IERpc2NvcmQuUGFydGlhbE1lc3NhZ2VcclxuICApOiBQYWdpbmF0b3IgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMucGFnaW5hdGlvbnMuZmluZCgocGFnaW5hdG9yKSA9PiB7XHJcbiAgICAgIHJldHVybiBwYWdpbmF0b3IubWVzc2FnZUlEID09PSBtZXNzYWdlLmlkXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBkaXZpZGVyPFQ+KGl0ZW1zOiBUW10sIGl0ZW1Db3VudEJ5RGl2aXNpb246IG51bWJlcik6IFRbXVtdIHtcclxuICAgIGNvbnN0IGRpdmlkZWQ6IFRbXVtdID0gW11cclxuICAgIGNvbnN0IGRpdmlzaW9uQ291bnQgPSBNYXRoLmNlaWwoaXRlbXMubGVuZ3RoIC8gaXRlbUNvdW50QnlEaXZpc2lvbilcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGl2aXNpb25Db3VudDsgaSsrKSB7XHJcbiAgICAgIGRpdmlkZWQucHVzaChcclxuICAgICAgICBpdGVtcy5zbGljZShpdGVtQ291bnRCeURpdmlzaW9uICogaSwgaXRlbUNvdW50QnlEaXZpc2lvbiAqIChpICsgMSkpXHJcbiAgICAgIClcclxuICAgIH1cclxuICAgIHJldHVybiBkaXZpZGVkXHJcbiAgfVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG9CQUFtQjtBQVdaLGlDQUF3QixzQkFBTyxhQUFhO0FBQUEsRUFxQmpELFlBQ1MsT0FDQSxTQUlBLFFBSUEsVUFBa0IsS0FDekIsY0FDQTtBQUNBO0FBWk87QUFDQTtBQUlBO0FBSUE7QUE1QkQscUJBQVk7QUFHcEIsa0JBQTBCO0FBQUEsTUFDeEIsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsS0FBSztBQUFBO0FBMEJMLFFBQUksTUFB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
