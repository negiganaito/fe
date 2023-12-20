/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable no-redeclare */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */

import { useCallback, useLayoutEffect, useRef } from "react";
import ReactDOMComet from "react-dom";

import { FBLogger } from "@/faang/error";
import { uniqueID } from "@/faang/utils";

export function useResizeObserver(a) {
  let b = useRef(null);
  let c = useRef(a);
  useLayoutEffect(() => {
    c.current = a;
  }, [a]);
  return useCallback((d) => {
    let a = function (a, b, d) {
      c.current && c.current(a, b, d);
    };
    d = !d ? null : p(d, a);
    b.current && b.current();
    b.current = d;
  }, []);
}
let l = null;
let m = new Map();
function n() {
  !l && (l = new ResizeObserver(o));
  return l;
}
function o(a) {
  let b = new Map();
  let e = new Map(
    a.map((a) => {
      let d = a.contentRect;
      // if (c('gkx')('1470120')) {
      //   let e = b.get(a.target);
      //   if (e == null) {
      //     let f = x(a.target);
      //     b.set(a.target, f);
      //     d = f
      //   } else
      //     d = e
      // }
      return [a.target, d];
    })
  );
  let f = new Set(m.keys());
  ReactDOMComet.unstable_batchedUpdates(() => {
    for (
      // eslint-disable-next-line no-inner-declarations
      var a = e,
        b = Array.isArray(a),
        d = 0,
        a = b
          ? a
          : a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();
      ;

    ) {
      // eslint-disable-next-line no-inner-declarations
      var g;
      if (b) {
        if (d >= a.length) break;
        g = a[d++];
      } else {
        d = a.next();
        if (d.done) break;
        g = d.value;
      }
      // eslint-disable-next-line no-self-assign
      g = g;
      let h = g[0];
      g = g[1];
      // eslint-disable-next-line no-inner-declarations
      var i = m.get(h);
      if (i )
        for (
          // eslint-disable-next-line no-inner-declarations
          var i = i,
            j = Array.isArray(i),
            k = 0,
            i = j
              ? i
              : i[
                  typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                ]();
          ;

        ) {
          // eslint-disable-next-line no-inner-declarations
          var l;
          if (j) {
            if (k >= i.length) break;
            l = i[k++];
          } else {
            k = i.next();
            if (k.done) break;
            l = k.value;
          }
          // eslint-disable-next-line no-self-assign
          l = l;
          l = l[1];
          try {
            l(g, h, e);
            // eslint-disable-next-line no-catch-shadow
          } catch (a) {
            FBLogger("useResizeObserver").catching(a);
          }
        }
      else
        f.has(h) ||
          FBLogger("useResizeObserver").mustfix(
            "ResizeObserver observed resizing of an element that it should not be observing"
          );
    }
  });
}
function p(a, b) {
  let d;
  let e = uniqueID();
  // eslint-disable-next-line no-cond-assign
  d = (d = m.get(a))  ? d : new Map();
  d.set(e, b);
  m.set(a, d);
  n().observe(a);
  return q(a, e);
}
function q(a, b) {
  return function () {
    let c = m.get(a);
    if (!c) return;
    c.delete(b);
    c.size === 0 && (n().unobserve(a), m.delete(a));
  };
}
function r(a) {
  return parseFloat(a) || 0;
}
function s(a) {
  // eslint-disable-next-line no-return-assign, no-cond-assign
  return (a =
    !a
      ? void 0
      : !(a = a.ownerDocument) 
      ? void 0
      : a.defaultView) 
    ? a
    : window;
}
// eslint-disable-next-line max-params
function t(a, b, c, d) {
  return {
    height: d,
    width: c,
    x: a,
    y: b,
  };
}
let u = t(0, 0, 0, 0);
function v(a) {
  let b = ["top", "right", "bottom", "left"];
  let c = {};
  for (let d = 0; d < b.length; d++) {
    let e = b[d];
    let f = a["padding-" + e];
    c[e] = r(f);
  }
  return c;
}
function w(a) {
  for (
    // eslint-disable-next-line no-inner-declarations
    var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1;
    d < b;
    d++
  )
    c[d - 1] = arguments[d];
  return c.reduce((b, c) => {
    c = a["border-" + c + "-width"];
    return b + r(c);
  }, 0);
}
function x(a) {
  let b = a.clientWidth;
  let c = a.clientHeight;
  if (!b && !c) return u;
  a = s(a).getComputedStyle(a);
  let d = v(a);
  let e = d.left + d.right;
  let f = d.top + d.bottom;
  let g = r(a.width);
  let h = r(a.height);
  a.boxSizing === "border-box" &&
    (Math.round(g + e) !== b && (g -= w(a, "left", "right") + e),
    Math.round(h + f) !== c && (h -= w(a, "top", "bottom") + f));
  return t(d.left, d.top, g, h);
}
