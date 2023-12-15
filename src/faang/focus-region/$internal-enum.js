/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
let g = Object.prototype.hasOwnProperty
let h = typeof WeakMap === 'function' ? new WeakMap() : new Map();

function i(a) {
  let b = h.get(a);
  if (b !== void 0)
    return b;
  let c = new Map();
  Object.getOwnPropertyNames(a).forEach(function (b) {
    c.set(a[b], b)
  });
  try {
    h.set(a, c)
    // eslint-disable-next-line no-catch-shadow
  } catch (a) { }
  return c
}

let j = Object.freeze(Object.defineProperties(Object.create(null), {
  cast: {
    value: function (a) {
      return this.isValid(a) ? a : void 0
    }
  },
  getName: {
    value: function (a) {
      return i(this).get(a)
    }
  },
  isValid: {
    value: function (a) {
      return i(this).has(a)
    }
  },
  members: {
    value: function () {
      return i(this).keys()
    }
  }
}));

function a(a) {
  let b = Object.create(j);
  for (let c in a)
    g.call(a, c) && Object.defineProperty(b, c, {
      value: a[c]
    });
  return Object.freeze(b)
}

let k = Object.freeze(Object.defineProperties(Object.create(null), {
  cast: {
    value: j.cast
  },
  getName: {
    value: function (a) {
      return a
    }
  },
  isValid: {
    value: function (a) {
      return typeof a === 'string' ? g.call(this, a) : !1
    }
  },
  members: {
    value: function () {
      return Object.getOwnPropertyNames(this).values()
    }
  }
}));

a.Mirrored = function (a) {
  let b = Object.create(k);
  for (let c = 0, d = a.length; c < d; ++c)
    Object.defineProperty(b, a[c], {
      value: a[c]
    });
  return Object.freeze(b)
}

Object.freeze(a.Mirrored);

export const InternalEnum = Object.freeze(a)
