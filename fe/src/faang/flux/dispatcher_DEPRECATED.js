/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { FBLogger } from "../error";
import { invariant } from "../utils";

let i = "ID_";

export class Dispatcher_DEPRECATED {
  constructor() {
    this.$1 = new Map();
    this.$2 = false;
    this.$3 = new Map();
    this.$4 = new Map();
    this.$5 = 1;
  }

  register = function (a, b) {
    b = this.__genID(b);
    this.$1.set(b, a);
    return b;
  };

  unregister = function (a) {
    this.$1.get(a) || invariant(0, 1331, a);
    this.$1["delete"](a);
  };

  waitFor = function (a) {
    this.$2 || invariant(0, 1332);
    for (let b = 0; b < a.length; b++) {
      let c = a[b];
      if (this.$4.get(c)) {
        this.$3.get(c) || invariant(0, 2380, c);
        continue;
      }
      this.$1.get(c) || invariant(0, 2381, c);
      this.$7(c);
    }
  };

  dispatch = function (a) {
    let b = this;
    k(this.$2, this.$6, a);
    this.$8(a);
    try {
      this.$1.forEach((a, c) => {
        if (b.$4.get(c)) return;
        b.$7(c);
      });
    } finally {
      this.$9();
    }
  };

  isDispatching = function () {
    return this.$2;
  };

  $7 = function (a) {
    this.$4.set(a, !0);
    let b = this.$1.get(a);
    b && this.__invokeCallback(a, b, this.$6);
    this.$3.set(a, !0);
  };

  __invokeCallback = function (a, b, c) {
    b(c);
  };

  $8 = function (a) {
    for (
      // eslint-disable-next-line no-inner-declarations, no-var
      var b = this.$1.keys(),
        c = Array.isArray(b),
        d = 0,
        b = c
          ? b
          : b[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();
      ;

    ) {
      // eslint-disable-next-line no-inner-declarations, no-var
      var e;
      if (c) {
        if (d >= b.length) break;
        e = b[d++];
      } else {
        d = b.next();
        if (d.done) break;
        e = d.value;
      }
      // eslint-disable-next-line no-self-assign
      e = e;
      this.$4.set(e, !1);
      this.$3.set(e, !1);
    }
    this.$6 = a;
    this.$2 = !0;
  };

  $9 = function () {
    delete this.$6;
    this.$2 = !1;
  };

  __genID = function (a) {
    let b = a ? a + "_" : i;
    a = a || b + this.$5++;
    while (this.$1.get(a)) a = b + this.$5++;
    return a;
  };
}

function j(a) {
  let b = "<unknown>";
  if (!a) return b;
  if (typeof a.type === "string") return a.type;
  if (typeof a.actionType === "string") return a.actionType;
  if (!a.action) return b;
  if (typeof a.action.type === "string") return a.action.type;
  return typeof a.action.actionType === "string" ? a.action.actionType : b;
}

function k(a, b, d) {
  if (a) {
    a = new Error("Cannot dispatch in the middle of a dispatch");
    FBLogger("flux_dispatcher")
      .catching(a)
      .mustfix(
        "Tried to dispatch action %s while already dispatching %s",
        j(d),
        j(b)
      );
    throw a;
  }
}
