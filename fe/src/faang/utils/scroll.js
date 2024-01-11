/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
function g(a, b) {
  return !!b && (a === b.documentElement || a === b.body);
}

function a(a) {
  let b;
  if (!a) return 0;
  let c = a.ownerDocument;
  // eslint-disable-next-line no-return-assign
  return g(a, c)
    ? (!c ? void 0 : !(b = c.body) ? void 0 : b.scrollTop) ||
        (!c ? void 0 : !(b = c.documentElement) ? void 0 : b.scrollTop) ||
        0
    : a.scrollTop || 0;
}

function b(a, b) {
  if (!a) return;
  let c = a.ownerDocument;
  g(a, c)
    ? ((!c ? void 0 : c.body) && (c.body.scrollTop = b || 0),
      (!c ? void 0 : c.documentElement) &&
        (c.documentElement.scrollTop = b || 0))
    : (a.scrollTop = b || 0);
}

function c(a) {
  let b;
  let c = a.ownerDocument;
  // eslint-disable-next-line no-return-assign
  return g(a, c)
    ? (!c ? void 0 : !(b = c.body) ? void 0 : b.scrollLeft) ||
        (!c ? void 0 : !(b = c.documentElement) ? void 0 : b.scrollLeft) ||
        0
    : a.scrollLeft || 0;
}

function d(a, b) {
  let c = a.ownerDocument;
  g(a, c)
    ? ((!c ? void 0 : c.body) && (c.body.scrollLeft = b || 0),
      (!c ? void 0 : c.documentElement) &&
        (c.documentElement.scrollLeft = b || 0))
    : (a.scrollLeft = b || 0);
}

export const Scroll = {
  getTop: a,
  setTop: b,
  getLeft: c,
  setLeft: d,
};
