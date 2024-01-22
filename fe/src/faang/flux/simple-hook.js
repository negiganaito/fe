/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

export class SimpleHook {
  constructor() {
    this.__callbacks = [];
    this.call = this.$2;
  }

  hasCallback(a) {
    let b = this.__callbacks;
    return (
      b.length > 0 &&
      (a ||
        b.some((b) => {
          return b === a || b.$1 === a;
        }))
    );
  }

  add(a, b) {
    let c = this;
    let d;
    if ((!b ? void 0 : b.once) === !0) {
      b = function () {
        c.remove(d);
        a.apply(null, arguments);
      };
      b.$1 = a;
      d = b;
    } else d = a;
    this.__callbacks.push(d);
    return d;
  }

  removeLast() {
    return this.__callbacks.pop();
  }

  remove(a) {
    return this.removeIf((b) => {
      return b === a;
    });
  }

  removeIf(a) {
    let b = this.__callbacks;
    this.__callbacks = b.filter((b) => {
      return !a(b);
    });
    return b.length > this.__callbacks.length;
  }

  clear() {
    this.__callbacks = [];
  }

  $2() {
    let a = this.__callbacks;
    for (let b = 0, c = a.length; b < c; ++b) {
      let d = a[b];
      d.apply(null, arguments);
    }
  }
}
