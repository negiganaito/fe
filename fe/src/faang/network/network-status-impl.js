/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { NetworkHeartbeat } from "./network-heartbeat";

const performanceNow = require("fbjs/lib/performanceNow");

let h;
let j = [];
// eslint-disable-next-line no-restricted-globals
let k = typeof window !== "undefined" ? window : self;
let l = !k ? void 0 : !(h = k.navigator) ? void 0 : h.onLine;
let m = 2;
let n = 5e3;
let o = [];
let p = [];
let q = 0;
let r = !0;
let s = !1;
let t = !1;
let u = function () {
  y(r, !0);
};
let v = function () {
  y(s, !0);
};
function w() {
  let a = j.slice();
  a.forEach((a) => {
    a({
      online: l,
    });
  });
}
function x(a) {
  a = j.indexOf(a);
  a > -1 && j.splice(a, 1);
}
function y(a, b) {
  b === void 0 && (b = !1);
  let c = l === a;
  b = !b && a === r && NetworkHeartbeat.isHeartbeatPending();
  if (c || b) return;
  t = t || a === s;
  l = a;
  l || NetworkHeartbeat.maybeStartHeartbeat(u, v);
  w();
}
function z() {
  let a = performanceNow();
  o = o.filter((b) => {
    return A(b.startTime, a);
  });
  p = p.filter((b) => {
    return A(b.startTime, a);
  });
  return p.length / o.length < m;
}

// eslint-disable-next-line no-var
var A = function (a, b) {
  return a > b - n;
};

function a() {
  return l;
}
function b(a) {
  j.push(a);
  let b = !1;
  return {
    remove: function () {
      b || ((b = !0), x(a));
    },
  };
}
function e() {
  let a = performanceNow();
  o.push({
    startTime: a,
  });
  NetworkHeartbeat.maybeStartHeartbeat(u, v, z);
}
function f() {
  let a = performanceNow();
  p.push({
    startTime: a,
  });
  A(q, a) ||
    ((p = p.filter((b) => {
      return A(b.startTime, a);
    })),
    (q = a));
}
function B() {
  return t;
}
k.addEventListener("online", () => {
  y(r);
});
k.addEventListener("offline", () => {
  y(s);
});

export const NetworkStatusImpl = {
  isOnline: a,
  onChange: b,
  reportError: e,
  reportSuccess: f,
  wasOffline: B,
};
