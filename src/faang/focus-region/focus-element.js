/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { getTabbableNodes } from "./get-tabbable-nodes";

/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
let h = !1;
let i = !1;
let j = !1;
let k = 500;
function l() {
  try {
    let a = document.createElement("div");
    a.addEventListener(
      "focus",
      (a) => {
        a.preventDefault();
        a.stopPropagation();
      },
      !0
    );
    a.focus(
      Object.defineProperty({}, "preventScroll", {
        // eslint-disable-next-line getter-return
        get: () => {
          i = !0;
        },
      })
    );
    // eslint-disable-next-line no-catch-shadow
  } catch (a) {}
}
function m(a) {
  a = a.parentElement;
  let b = [];
  let c = document.scrollingElement || document.documentElement;
  while (a && a !== c) {
    let d = a;
    let e = d.offsetHeight;
    d = d.offsetWidth;
    (e < a.scrollHeight || d < a.scrollWidth) &&
      b.push([a, a.scrollTop, a.scrollLeft]);
    a = a.parentElement;
  }
  c && b.push([c, c.scrollTop, c.scrollLeft]);
  return b;
}
function n(a) {
  for (let b = 0; b < a.length; b++) {
    let c = a[b];
    let d = c[0];
    let e = c[1];
    c = c[2];
    d.scrollTop = e;
    d.scrollLeft = c;
  }
}
function a(a, b) {
  a = Array.isArray(a) ? a : [a];
  for (let c = 0; c < a.length; c++) {
    let d = b.DO_NOT_USE_queryAllNodes(a[c]);
    if (d) return d;
  }
  return null;
}
function o(a, b) {
  a = Array.isArray(a) ? a : [a];
  for (let c = 0; c < a.length; c++) {
    let d = b.DO_NOT_USE_queryFirstNode(a[c]);
    if (d) return d;
  }
  return null;
}
function b(a, b, c) {
  c = c || {};
  let d = c.preventScroll;
  let e = c.focusWithoutUserIntent;
  c = c.focusWithAutoFocus;
  a = o(a, b);
  a &&
    p(a, {
      focusWithAutoFocus: c,
      focusWithoutUserIntent: e,
      preventScroll: d,
    });
}
function d() {
  return h;
}
function e(a) {
  return a._focusWithAutoFocus === !0;
}
function p(a, b) {
  b = b || {};
  let c = b.preventScroll;
  let d = b.focusWithoutUserIntent;
  b = b.focusWithAutoFocus;
  if (a) {
    j || ((j = !0), l());
    let e = a._tabIndexState;
    if (e && e.canTab === !1) return;
    e = e ? e.value : a.tabIndex;
    a.tabIndex = -1;
    let f = h;
    c = c || !1;
    b === !0 &&
      ((a._focusWithAutoFocus = !0),
      window.setTimeout(() => {
        a._focusWithAutoFocus = !1;
      }, k));
    try {
      h = d || !1;
      b = a.__lexicalEditor;
      if (b !== void 0) b.focus();
      else if (!c) t(a);
      else if (i)
        t(a, {
          preventScroll: !0,
        });
      else {
        d = m(a);
        t(a);
        n(d);
      }
      // eslint-disable-next-line no-catch-shadow
    } catch (a) {
    } finally {
      h = f;
    }
    a.tabIndex = e;
  }
}
function f(a, b, d) {
  a = getTabbableNodes(a, b);
  b = a[0];
  let e = a[2];
  let f = a[3];
  a = a[4];
  a &&
    a !== e &&
    b &&
    p(b[f + 1], {
      preventScroll: d,
    });
}
function q(a, b, d) {
  a = getTabbableNodes(a, b);
  b = a[0];
  let e = a[1];
  let f = a[3];
  a = a[4];
  a &&
    a !== e &&
    b &&
    p(b[f - 1], {
      preventScroll: d,
    });
}

// eslint-disable-next-line max-params
function r(a, b, d, e, f) {
  a = getTabbableNodes(a, b);
  b = a[0];
  let g = a[1];
  let h = a[2];
  let i = a[3];
  a = a[4];
  if (!a || !b) return;
  a === h
    ? f
      ? f()
      : e === !0 && (p(g), d.preventDefault(), d.stopPropagation())
    : (p(b[i + 1]), d.preventDefault(), d.stopPropagation());
}

// eslint-disable-next-line max-params
function s(a, b, d, e, f) {
  a = getTabbableNodes(a, b);
  b = a[0];
  let g = a[1];
  let h = a[2];
  let i = a[3];
  a = a[4];
  if (!a || !b) return;
  a === g
    ? f
      ? f()
      : e === !0 && (p(h), d.preventDefault(), d.stopPropagation())
    : (p(b[i - 1]), d.preventDefault(), d.stopPropagation());
}
let t = function (a, b) {
  (a.focus || HTMLElement.prototype.focus).call(a, b);
};

export const FocusManager = {
  focusElement: p,
  focusFirst: b,
  focusNext: f,
  focusNextContained: r,
  focusPrevious: q,
  focusPreviousContained: s,
  getAllNodesFromOneOrManyQueries: a,
  getFirstNodeFromOneOrManyQueries: o,
  isFocusingWithoutUserIntent: d,
  wasElementAutoFocused: e,
};
