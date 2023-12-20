/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable no-var */
/* eslint-disable complexity */

/* eslint-disable no-redeclare */
import { performanceAbsoluteNow } from "@/faang/utils/performance-absolute-now";

let i = 50;
let j = new Map();
function a(a, b, d) {
  // eslint-disable-next-line no-self-assign
  a = a;
  // eslint-disable-next-line no-self-assign
  b = (b = b)  ? b : "";
  let e = j.get(a);
  e || j.set(a, (e = new Map()));
  a = e.get(b);
  a || e.set(b, (a = new Map()));
  e = a.get(d);
  e || a.set(d, (e = [0, []]));
  e[1][e[0]++ % i] = performanceAbsoluteNow();
}

function k(a, b, c) {
  var d = j.get(a);
  if (!d) return [];
  let e = [];
  for (
    // eslint-disable-next-line no-inner-declarations
    var d = d,
      g = Array.isArray(d),
      h = 0,
      d = g
        ? d
        : d[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();
    ;

  ) {
    // eslint-disable-next-line no-inner-declarations
    var i;
    if (g) {
      if (h >= d.length) break;
      i = d[h++];
    } else {
      h = d.next();
      if (h.done) break;
      i = h.value;
    }
    // eslint-disable-next-line no-self-assign
    i = i;
    let k = i[0];
    i = i[1];
    for (
      // eslint-disable-next-line no-inner-declarations
      var i = i,
        l = Array.isArray(i),
        m = 0,
        i = l
          ? i
          : i[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();
      ;

    ) {
      // eslint-disable-next-line no-inner-declarations
      var n;
      if (l) {
        if (m >= i.length) break;
        n = i[m++];
      } else {
        m = i.next();
        if (m.done) break;
        n = m.value;
      }
      // eslint-disable-next-line no-self-assign
      n = n;
      let o = n[0];
      n = n[1];
      for (
        // eslint-disable-next-line no-inner-declarations
        var n = n[1],
          p = Array.isArray(n),
          q = 0,
          n = p
            ? n
            : n[
                typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
              ]();
        ;

      ) {
        // eslint-disable-next-line no-inner-declarations
        var r;
        if (p) {
          if (q >= n.length) break;
          r = n[q++];
        } else {
          q = n.next();
          if (q.done) break;
          r = q.value;
        }
        // eslint-disable-next-line no-self-assign
        r = r;
        r >= b &&
          r <= c &&
          e.push({
            module: a,
            ref: k || null,
            time: r,
            type: o,
          });
      }
    }
  }
  return e.sort((a, b) => {
    return a.time - b.time;
  });
}
function b(a, b) {
  let c = new Map();
  for (
    // eslint-disable-next-line no-inner-declarations
    var d = j.keys(),
      e = Array.isArray(d),
      f = 0,
      d = e
        ? d
        : d[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();
    ;

  ) {
    // eslint-disable-next-line no-inner-declarations
    var g;
    if (e) {
      if (f >= d.length) break;
      g = d[f++];
    } else {
      f = d.next();
      if (f.done) break;
      g = f.value;
    }
    // eslint-disable-next-line no-self-assign
    g = g;
    let h = k(g, a, b);
    h.length && c.set(g, h);
  }
  return c;
}

export const JSResourceEvents = {
  getAllModuleEvents: b,
  getEvents: k,
  notify: a,
};
