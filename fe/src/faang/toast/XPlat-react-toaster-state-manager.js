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
let emptyState = {};
function i(a) {
  let b = !1;
  return function () {
    b || (a(), (b = !0));
  };
}

export class XPlatReactToasterStateManager {
  constructor({ callbackScheduler, maxQueuedToasts }) {
    // let b = a.callbackScheduler;
    // a = a.maxQueuedToasts;
    this.$1 = 0;
    this.$2 = new Map();
    this.$3 = [];
    this.$4 = [];
    this.$5 = null;
    this.$7 = callbackScheduler;
    this.$6 = maxQueuedToasts;
  }

  push(value, duration) {
    let id = "toast-" + this.$1++;
    const toast = {
      duration: duration,
      expired: false,
      id: id,
      shown: false,
      timer: null,
      value: value,
    };
    this.$8({
      node: toast,
      type: "PUSH",
    });
    return id;
  }

  replace(id, value) {
    this.$8({
      id: id,
      type: "REPLACE",
      value: value,
    });
  }

  shown(id) {
    this.$8({
      id: id,
      type: "SHOWN",
    });
  }

  delete(id) {
    this.$8({
      id: id,
      type: "DELETE",
    });
  }

  expire(id) {
    this.$8({
      id: id,
      type: "EXPIRE",
    });
  }

  hidden(id) {
    this.$8({
      id: id,
      type: "HIDDEN",
    });
  }

  stopTimer(id) {
    this.$8({
      id: id,
      type: "STOP_TIMER",
    });
  }

  resetTimer(id) {
    this.$8({
      id: id,
      type: "RESET_TIMER",
    });
  }

  getState() {
    return Object.fromEntries(this.$2);
  }

  getEmptyState() {
    return emptyState;
  }

  addListener(listener) {
    let _this = this;
    this.$3.push(listener);
    return {
      remove: i(() => {
        removeFromArray(_this.$3, listener);
      }),
    };
  }

  $9(obj) {
    if (!this.$5 || obj.priority > this.$5.priority) {
      this.$5 = obj;
    }

    // (!this.$5 || a.priority > this.$5.priority) && (this.$5 = a);
  }

  registerView(handler, priority = 1) {
    let _this = this;
    // b === void 0 && (b = 1);
    let obj = {
      handler: handler,
      priority: priority,
    };
    this.$4.push(obj);
    this.$9(obj);
    this.$10();
    return {
      remove: i(() => {
        removeFromArray(_this.$4, obj),
          _this.$5 === obj &&
            ((_this.$5 = null),
            _this.$4.forEach((a) => {
              return _this.$9(a);
            }));
      }),
    };
  }

  // eslint-disable-next-line complexity
  $8(toastAction) {
    let b = this.$2;
    switch (toastAction.type) {
      case "PUSH":
        // eslint-disable-next-line no-inner-declarations, no-var
        var c = toastAction.node;
        this.$2 = new Map([].concat(Array.from(this.$2), [[c.id, c]]));
        if (this.$6 !== 0) {
          c = Array.from(this.$2.values()).filter((a) => {
            return !a.shown && !a.expired;
          });
          if (c.length > this.$6) {
            c = c[0];
            this.delete(c.id);
          }
        }
        break;
      case "SHOWN":
        if (this.$2.has(toastAction.id) && !this.$11(toastAction.id).shown) {
          c = { ...this.$11(toastAction.id), shown: !0 };
          this.$2 = new Map(
            [].concat(Array.from(this.$2), [[toastAction.id, this.$12(c)]])
          );
        }
        break;
      case "EXPIRE":
        if (this.$2.has(toastAction.id)) {
          c = { ...this.$11(toastAction.id), expired: !0 };
          this.$2 = new Map(
            [].concat(Array.from(this.$2), [[toastAction.id, this.$13(c)]])
          );
          this.$14(c);
        }
        break;
      case "HIDDEN":
        if (this.$2.has(toastAction.id)) {
          c = this.$11(toastAction.id);
          (c.shown || c.expired) &&
            ((this.$2 = new Map(this.$2)),
            this.$2.delete(toastAction.id),
            this.$13(c));
        }
        break;
      case "DELETE":
        if (this.$2.has(toastAction.id)) {
          c = this.$11(toastAction.id);
          this.$2 = new Map(this.$2);
          this.$2.delete(toastAction.id);
          this.$13(c);
        }
        break;
      case "REPLACE":
        if (this.$2.has(toastAction.id)) {
          c = this.$11(toastAction.id);
          this.$2 = new Map(
            [].concat(Array.from(this.$2), [
              [toastAction.id, { ...c, value: toastAction.value }],
            ])
          );
        }
        break;
      case "STOP_TIMER":
        if (this.$2.has(toastAction.id) && this.$15(this.$11(toastAction.id))) {
          c = { ...this.$11(toastAction.id) };
          this.$2 = new Map(
            [].concat(Array.from(this.$2), [[toastAction.id, this.$13(c)]])
          );
        }
        break;
      case "RESET_TIMER":
        if (
          this.$2.has(toastAction.id) &&
          !this.$15(this.$11(toastAction.id))
        ) {
          c = { ...this.$11(toastAction.id) };
          this.$2 = new Map(
            [].concat(Array.from(this.$2), [[toastAction.id, this.$12(c)]])
          );
        }
        break;
      default:
        toastAction.type;
    }
    b !== this.$2 && this.$10();
  }

  $10() {
    let _this = this;
    this.$3.forEach((b) => {
      return _this.$7(() => {
        b();
      });
    });
    this.$4.forEach((b) => {
      return _this.$7(() => {
        b.handler(b === _this.$5 ? _this.getState() : _this.getEmptyState());
      });
    });
  }

  $12(toast) {
    let _this = this;
    toast.duration &&
      !toast.timer &&
      (toast.timer = setTimeout(() => {
        _this.expire(toast.id);
      }, toast.duration));
    return toast;
  }

  $13(toast) {
    if (toast.timer) {
      clearTimeout(toast.timer);
      toast.timer = null;
    }
    return toast;
  }

  $14(toast) {
    let _this = this;
    this.$13(toast);
    let d = toast.id;
    setTimeout(() => {
      _this.delete(d);
    }, 1e3);
  }

  $15(toast) {
    return toast.timer !== null;
  }

  $11(a) {
    a = this.$2.get(a);
    if (!a)
      throw unrecoverableViolation(
        "Toast with given identifier was not found",
        "comet_ui"
      );
    return a;
  }

  static $16 = null;

  static getInstance(b) {
    !XPlatReactToasterStateManager.$16 &&
      (XPlatReactToasterStateManager.$16 = new XPlatReactToasterStateManager(
        b
      ));
    return this.$16;
  }
  static resetInstance_DO_NOT_USE() {
    XPlatReactToasterStateManager.$16 = null;
  }
}
