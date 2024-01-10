/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import removeFromArray from "fbjs/lib/removeFromArray";

import { unrecoverableViolation } from "@/faang/error";
/* eslint-disable no-sequences */
/* eslint-disable no-invalid-this */

/* eslint-disable camelcase */
let h = {};
function i(a) {
  let b = !1;
  return function () {
    b || (a(), (b = !0));
  };
}

export class XPlatReactToasterStateManager {
  constructor(a) {
    let b = a.callbackScheduler;
    a = a.maxQueuedToasts;
    this.$1 = 0;
    this.$2 = new Map();
    this.$3 = [];
    this.$4 = [];
    this.$5 = null;
    this.$7 = b;
    this.$6 = a;
  }

  push = function (a, b) {
    let c = "toast-" + this.$1++;
    b = {
      duration: b,
      expired: !1,
      id: c,
      shown: !1,
      timer: null,
      value: a,
    };
    this.$8({
      node: b,
      type: "PUSH",
    });
    return c;
  };
  replace = function (a, b) {
    this.$8({
      id: a,
      type: "REPLACE",
      value: b,
    });
  };
  shown = function (a) {
    this.$8({
      id: a,
      type: "SHOWN",
    });
  };
  delete = function (a) {
    this.$8({
      id: a,
      type: "DELETE",
    });
  };
  expire = function (a) {
    this.$8({
      id: a,
      type: "EXPIRE",
    });
  };
  hidden = function (a) {
    this.$8({
      id: a,
      type: "HIDDEN",
    });
  };
  stopTimer = function (a) {
    this.$8({
      id: a,
      type: "STOP_TIMER",
    });
  };
  resetTimer = function (a) {
    this.$8({
      id: a,
      type: "RESET_TIMER",
    });
  };
  getState = function () {
    return Object.fromEntries(this.$2);
  };
  getEmptyState = function () {
    return h;
  };
  addListener = function (a) {
    let b = this;
    this.$3.push(a);
    return {
      remove: i(() => {
        removeFromArray(b.$3, a);
      }),
    };
  };
  $9 = function (a) {
    (!this.$5 || a.priority > this.$5.priority) && (this.$5 = a);
  };
  registerView = function (a, b) {
    let d = this;
    b === void 0 && (b = 1);
    let e = {
      handler: a,
      priority: b,
    };
    this.$4.push(e);
    this.$9(e);
    this.$10();
    return {
      remove: i(() => {
        removeFromArray(d.$4, e),
          d.$5 === e &&
            ((d.$5 = null),
            d.$4.forEach((a) => {
              return d.$9(a);
            }));
      }),
    };
  };
  // eslint-disable-next-line complexity
  $8 = function (a) {
    let b = this.$2;
    switch (a.type) {
      case "PUSH":
        // eslint-disable-next-line no-inner-declarations, no-var
        var c = a.node;
        this.$2 = new Map([].concat(Array.from(this.$2), [[c.id, c]]));
        if (this.$6 !== 0) {
          c = Array.from(this.$2.values()).filter((a) => {
            return !a.shown && !a.expired;
          });
          if (c.length > this.$6) {
            c = c[0];
            this["delete"](c.id);
          }
        }
        break;
      case "SHOWN":
        if (this.$2.has(a.id) && !this.$11(a.id).shown) {
          c = { ...this.$11(a.id), shown: !0 };
          this.$2 = new Map(
            [].concat(Array.from(this.$2), [[a.id, this.$12(c)]])
          );
        }
        break;
      case "EXPIRE":
        if (this.$2.has(a.id)) {
          c = { ...this.$11(a.id), expired: !0 };
          this.$2 = new Map(
            [].concat(Array.from(this.$2), [[a.id, this.$13(c)]])
          );
          this.$14(c);
        }
        break;
      case "HIDDEN":
        if (this.$2.has(a.id)) {
          c = this.$11(a.id);
          (c.shown || c.expired) &&
            ((this.$2 = new Map(this.$2)),
            this.$2["delete"](a.id),
            this.$13(c));
        }
        break;
      case "DELETE":
        if (this.$2.has(a.id)) {
          c = this.$11(a.id);
          this.$2 = new Map(this.$2);
          this.$2["delete"](a.id);
          this.$13(c);
        }
        break;
      case "REPLACE":
        if (this.$2.has(a.id)) {
          c = this.$11(a.id);
          this.$2 = new Map(
            [].concat(Array.from(this.$2), [[a.id, { ...c, value: a.value }]])
          );
        }
        break;
      case "STOP_TIMER":
        if (this.$2.has(a.id) && this.$15(this.$11(a.id))) {
          c = { ...this.$11(a.id) };
          this.$2 = new Map(
            [].concat(Array.from(this.$2), [[a.id, this.$13(c)]])
          );
        }
        break;
      case "RESET_TIMER":
        if (this.$2.has(a.id) && !this.$15(this.$11(a.id))) {
          c = { ...this.$11(a.id) };
          this.$2 = new Map(
            [].concat(Array.from(this.$2), [[a.id, this.$12(c)]])
          );
        }
        break;
      default:
        a.type;
    }
    b !== this.$2 && this.$10();
  };
  $10 = function () {
    let a = this;
    this.$3.forEach((b) => {
      return a.$7(() => {
        b();
      });
    });
    this.$4.forEach((b) => {
      return a.$7(() => {
        b.handler(b === a.$5 ? a.getState() : a.getEmptyState());
      });
    });
  };
  $12 = function (a) {
    let b = this;
    a.duration &&
      !a.timer &&
      (a.timer = setTimeout(() => {
        b.expire(a.id);
      }, a.duration));
    return a;
  };
  $13 = function (a) {
    a.timer && (clearTimeout(a.timer), (a.timer = null));
    return a;
  };
  $14 = function (a) {
    let b = this;
    this.$13(a);
    let d = a.id;
    setTimeout(() => {
      b["delete"](d);
    }, 1e3);
  };
  $15 = function (a) {
    return a.timer;
  };
  $11 = function (a) {
    a = this.$2.get(a);
    if (!a)
      throw unrecoverableViolation(
        "Toast with given identifier was not found",
        "comet_ui"
      );
    return a;
  };

  static $16 = null;

  static getInstance = function (b) {
    !this.$16 && (this.$16 = new XPlatReactToasterStateManager(b));
    return this.$16;
  };
  static resetInstance_DO_NOT_USE = function () {
    this.$16 = null;
  };
}

// const XPlatReactToasterStateManager = (function () {
//   function a(a) {
//     let b = a.callbackScheduler;
//     a = a.maxQueuedToasts;
//     this.$1 = 0;
//     this.$2 = new Map();
//     this.$3 = [];
//     this.$4 = [];
//     this.$5 = null;
//     this.$7 = b;
//     this.$6 = a;
//   }
//   let b = a.prototype;
//   b.push = function (a, b) {
//     let c = "toast-" + this.$1++;
//     b = {
//       duration: b,
//       expired: !1,
//       id: c,
//       shown: !1,
//       timer: null,
//       value: a,
//     };
//     this.$8({
//       node: b,
//       type: "PUSH",
//     });
//     return c;
//   };
//   b.replace = function (a, b) {
//     this.$8({
//       id: a,
//       type: "REPLACE",
//       value: b,
//     });
//   };
//   b.shown = function (a) {
//     this.$8({
//       id: a,
//       type: "SHOWN",
//     });
//   };
//   b["delete"] = function (a) {
//     this.$8({
//       id: a,
//       type: "DELETE",
//     });
//   };
//   b.expire = function (a) {
//     this.$8({
//       id: a,
//       type: "EXPIRE",
//     });
//   };
//   b.hidden = function (a) {
//     this.$8({
//       id: a,
//       type: "HIDDEN",
//     });
//   };
//   b.stopTimer = function (a) {
//     this.$8({
//       id: a,
//       type: "STOP_TIMER",
//     });
//   };
//   b.resetTimer = function (a) {
//     this.$8({
//       id: a,
//       type: "RESET_TIMER",
//     });
//   };
//   b.getState = function () {
//     return Object.fromEntries(this.$2);
//   };
//   b.getEmptyState = function () {
//     return h;
//   };
//   b.addListener = function (a) {
//     let b = this;
//     this.$3.push(a);
//     return {
//       remove: i(() => {
//         removeFromArray(b.$3, a);
//       }),
//     };
//   };
//   b.$9 = function (a) {
//     (!this.$5 || a.priority > this.$5.priority) && (this.$5 = a);
//   };
//   b.registerView = function (a, b) {
//     let d = this;
//     b === void 0 && (b = 1);
//     let e = {
//       handler: a,
//       priority: b,
//     };
//     this.$4.push(e);
//     this.$9(e);
//     this.$10();
//     return {
//       remove: i(() => {
//         removeFromArray(d.$4, e),
//           d.$5 === e &&
//             ((d.$5 = null),
//             d.$4.forEach((a) => {
//               return d.$9(a);
//             }));
//       }),
//     };
//   };
//   // eslint-disable-next-line complexity
//   b.$8 = function (a) {
//     let b = this.$2;
//     switch (a.type) {
//       case "PUSH":
//         // eslint-disable-next-line no-inner-declarations, no-var
//         var c = a.node;
//         this.$2 = new Map([].concat(Array.from(this.$2), [[c.id, c]]));
//         if (this.$6 !== 0) {
//           c = Array.from(this.$2.values()).filter((a) => {
//             return !a.shown && !a.expired;
//           });
//           if (c.length > this.$6) {
//             c = c[0];
//             this["delete"](c.id);
//           }
//         }
//         break;
//       case "SHOWN":
//         if (this.$2.has(a.id) && !this.$11(a.id).shown) {
//           c = { ...this.$11(a.id), shown: !0 };
//           this.$2 = new Map(
//             [].concat(Array.from(this.$2), [[a.id, this.$12(c)]])
//           );
//         }
//         break;
//       case "EXPIRE":
//         if (this.$2.has(a.id)) {
//           c = { ...this.$11(a.id), expired: !0 };
//           this.$2 = new Map(
//             [].concat(Array.from(this.$2), [[a.id, this.$13(c)]])
//           );
//           this.$14(c);
//         }
//         break;
//       case "HIDDEN":
//         if (this.$2.has(a.id)) {
//           c = this.$11(a.id);
//           (c.shown || c.expired) &&
//             ((this.$2 = new Map(this.$2)),
//             this.$2["delete"](a.id),
//             this.$13(c));
//         }
//         break;
//       case "DELETE":
//         if (this.$2.has(a.id)) {
//           c = this.$11(a.id);
//           this.$2 = new Map(this.$2);
//           this.$2["delete"](a.id);
//           this.$13(c);
//         }
//         break;
//       case "REPLACE":
//         if (this.$2.has(a.id)) {
//           c = this.$11(a.id);
//           this.$2 = new Map(
//             [].concat(Array.from(this.$2), [[a.id, { ...c, value: a.value }]])
//           );
//         }
//         break;
//       case "STOP_TIMER":
//         if (this.$2.has(a.id) && this.$15(this.$11(a.id))) {
//           c = { ...this.$11(a.id) };
//           this.$2 = new Map(
//             [].concat(Array.from(this.$2), [[a.id, this.$13(c)]])
//           );
//         }
//         break;
//       case "RESET_TIMER":
//         if (this.$2.has(a.id) && !this.$15(this.$11(a.id))) {
//           c = { ...this.$11(a.id) };
//           this.$2 = new Map(
//             [].concat(Array.from(this.$2), [[a.id, this.$12(c)]])
//           );
//         }
//         break;
//       default:
//         a.type;
//     }
//     b !== this.$2 && this.$10();
//   };
//   b.$10 = function () {
//     let a = this;
//     this.$3.forEach((b) => {
//       return a.$7(() => {
//         b();
//       });
//     });
//     this.$4.forEach((b) => {
//       return a.$7(() => {
//         b.handler(b === a.$5 ? a.getState() : a.getEmptyState());
//       });
//     });
//   };
//   b.$12 = function (a) {
//     let b = this;
//     a.duration &&
//       !a.timer &&
//       (a.timer = setTimeout(() => {
//         b.expire(a.id);
//       }, a.duration));
//     return a;
//   };
//   b.$13 = function (a) {
//     a.timer && (clearTimeout(a.timer), (a.timer = null));
//     return a;
//   };
//   b.$14 = function (a) {
//     let b = this;
//     this.$13(a);
//     let d = a.id;
//     setTimeout(() => {
//       b["delete"](d);
//     }, 1e3);
//   };
//   b.$15 = function (a) {
//     return a.timer;
//   };
//   b.$11 = function (a) {
//     a = this.$2.get(a);
//     if (!a)
//       throw unrecoverableViolation(
//         "Toast with given identifier was not found",
//         "comet_ui"
//       );
//     return a;
//   };
//   a.getInstance = function (b) {
//     !a.$16 && (a.$16 = new a(b));
//     return a.$16;
//   };
//   a.resetInstance_DO_NOT_USE = function () {
//     a.$16 = null;
//   };
//   return a;
// })();
