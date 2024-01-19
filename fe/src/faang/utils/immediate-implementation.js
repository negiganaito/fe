/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable no-sequences */

export const ImmediateImplementation = {};

const ImmediateImplementationExperiments = {
  prefer_message_channel: true,
};

(function (c, d) {
  let e = 1;
  let g = {};
  let h = {};
  let i = h;
  let j = !1;
  let k = c.document;
  let l;
  let m;
  let n;
  let o = "setImmediate$" + Math.random() + "$";
  function p() {
    let a = c.event;
    return !a
      ? !1
      : (a.isTrusted &&
          [
            "change",
            "click",
            "contextmenu",
            "dblclick",
            "mouseup",
            "pointerup",
            "reset",
            "submit",
            "touchend",
          ].includes(a.type)) ||
          (a.type === "message" &&
            a.source === c &&
            typeof a.data === "string" &&
            a.data.indexOf(o) === 0);
  }
  function q(a) {
    let b = a[0];
    a = Array.prototype.slice.call(a, 1);
    g[e] = function () {
      b.apply(void 0, a);
    };
    i = i.next = {
      handle: e++,
    };
    return i.handle;
  }
  function r() {
    let a;
    let b;
    while (!j && (a = h.next)) {
      h = a;
      if ((b = g[a.handle])) {
        j = !0;
        try {
          b(), (j = !1);
        } finally {
          s(a.handle), j && ((j = !1), h.next && l(r));
        }
      }
    }
  }
  function s(a) {
    delete g[a];
  }
  function d() {
    if (c.postMessage && !c.importScripts) {
      let a = !0;
      let b = function b() {
        (a = !1),
          c.removeEventListener
            ? c.removeEventListener("message", b, !1)
            : c.detachEvent("onmessage", b);
      };
      if (c.addEventListener) c.addEventListener("message", b, !1);
      else if (c.attachEvent) c.attachEvent("onmessage", b);
      else return !1;
      c.postMessage("", "*");
      return a;
    }
  }
  function t() {
    let a = function (a) {
      a.source === c &&
        typeof a.data === "string" &&
        a.data.indexOf(o) === 0 &&
        r();
    };
    c.addEventListener
      ? c.addEventListener("message", a, !1)
      : c.attachEvent("onmessage", a);
    l = function () {
      let a = q(arguments);
      c.originalPostMessage
        ? c.originalPostMessage(o + a, "*")
        : c.postMessage(o + a, "*");
      return a;
    };
    m = l;
  }
  function u() {
    let a = new MessageChannel();
    let b = !1;
    a.port1.onmessage = function (a) {
      (b = !1), r();
    };
    l = function () {
      let c = q(arguments);
      b || (a.port2.postMessage(c), (b = !0));
      return c;
    };
    n = l;
  }
  function v() {
    let a = k.documentElement;
    l = function () {
      let b = q(arguments);
      let c = k.createElement("script");
      c.onreadystatechange = function () {
        (c.onreadystatechange = null), a.removeChild(c), (c = null), r();
      };
      a.appendChild(c);
      return b;
    };
  }
  function w() {
    l = function () {
      setTimeout(r, 0);
      return q(arguments);
    };
  }
  d()
    ? c.MessageChannel &&
      ImmediateImplementationExperiments.prefer_message_channel
      ? (t(),
        u(),
        (l = function () {
          if (p()) return m.apply(null, arguments);
          else return n.apply(null, arguments);
        }))
      : t()
    : c.MessageChannel
    ? u()
    : k && k.createElement && "onreadystatechange" in k.createElement("script")
    ? v()
    : w();
  ImmediateImplementation.setImmediate = l;
  ImmediateImplementation.clearImmediate = s;
})(
  // eslint-disable-next-line no-restricted-globals
  typeof self === "undefined"
    ? typeof a === "undefined"
      ? // eslint-disable-next-line no-invalid-this
        this
      : window
    : // eslint-disable-next-line no-restricted-globals
      self
);
