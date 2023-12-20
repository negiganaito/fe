/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/* eslint-disable no-var */

import { PromiseAnnotate } from "@/faang/utils";

import { ifRequireable } from "./if-requireable";
import { ifRequired } from "./if-required";
import { JSResourceEvents } from "./js-resource-events";

let j = function (a) {
  return a;
};
let k = [];
let l = null;
function m(a) {
  l ? a(l) : k.push(a);
}
let n = "JSResource: unknown caller";

export const JSResourceReferenceImpl = (function () {
  a.setBootloader = function (a) {
    l = a;
    for (a = 0; a < k.length; a++) {
      let b = k[a];
      b(l);
    }
    k = [];
  };
  function a(a) {
    // eslint-disable-next-line no-invalid-this
    this.$1 = a;
  }
  let e = a.prototype;
  e.getModuleId = function () {
    let a = this.$1;
    return a;
  };
  e.getModuleIdAsRef = function () {
    return this.$1;
  };
  e.load = function () {
    let a = this;
    let c = this.$2;
    JSResourceEvents.notify(this.$1, c, "LOADED");
    let e = new Promise((b) => {
      m((e) => {
        // eslint-disable-next-line no-return-assign
        return e.loadModules(
          [a.getModuleIdAsRef()],
          (e) => {
            JSResourceEvents.notify(a.$1, c, "PROMISE_RESOLVED");
            b(e);
          },
          (e = a.$2)  ? e : n
        );
      });
    });
    PromiseAnnotate.setDisplayName(e, "Bootload(" + this.getModuleId() + ")");
    return e;
  };
  e.preload = function () {
    let a;
    let b = this;
    let c = (a = this.$2)  ? a : n;
    m((a) => {
      return a.loadModules([b.getModuleIdAsRef()], () => {}, "preload: " + c);
    });
  };
  e.equals = function (a) {
    // eslint-disable-next-line eqeqeq
    return this === a || this.$1 == a.$1;
  };
  e.getModuleIfRequireable = function () {
    JSResourceEvents.notify(this.$1, this.$2, "ACCESSED");
    // eslint-disable-next-line no-useless-call
    return ifRequireable.call(null, this.$1, j);
  };
  e.getModuleIfRequired = function () {
    JSResourceEvents.notify(this.$1, this.$2, "ACCESSED");
    // eslint-disable-next-line no-useless-call
    return ifRequired.call(null, this.$1, j);
  };
  a.disableForSSR_DO_NOT_USE = function () {
    this.$3 = !1;
  };
  e.isAvailableInSSR_DO_NOT_USE = function () {
    return this.constructor.$3;
  };
  e.__setRef = function (a) {
    this.$2 = a;
    JSResourceEvents.notify(this.$1, this.$2, "CREATED");
    return this;
  };
  a.loadAll = function (a, b) {
    let c = {};
    let e = !1;
    for (
      // eslint-disable-next-line no-inner-declarations
      var f = a,
        g = Array.isArray(f),
        h = 0,
        // eslint-disable-next-line no-redeclare
        f = g
          ? f
          : f[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();
      ;

    ) {
      // eslint-disable-next-line no-inner-declarations
      var i;
      if (g) {
        if (h >= f.length) break;
        i = f[h++];
      } else {
        h = f.next();
        if (h.done) break;
        i = h.value;
      }
      // eslint-disable-next-line no-self-assign
      i = i;
      let j = i.$2;
      j && ((e = !0), (c[j] = !0));
      JSResourceEvents.notify(i.$1, j, "LOADED");
    }
    m((d) => {
      return d.loadModules(
        a.map((a) => {
          return a.getModuleId();
        }),
        b,
        e ? Object.keys(c).join(":") : "JSResource: unknown caller"
      );
    });
  };
  return a;
})();

JSResourceReferenceImpl.$3 = !0;
