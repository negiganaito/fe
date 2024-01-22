/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

export class EventEmitterWithHolding {
  constructor(a, b) {
    this.$2 = a;
    this.$3 = b;
    this.$1 = null;
    this.$5 = [];
    this.$4 = 0;
  }

  addListener = function (a, b, c) {
    return this.$2.addListener(a, b, c);
  };
  once = function (a, b, c) {
    return this.$2.once(a, b, c);
  };

  addRetroactiveListener = function (a, b, c) {
    let d = this.$2.addListener(a, b, c);
    let e = this.$5;
    e.push(!1);
    this.$4++;
    this.$3.emitToListener(a, b, c);
    this.$4--;
    e[e.length - 1] && d.remove();
    e.pop();
    return d;
  };
  removeAllListeners = function (a) {
    this.$2.removeAllListeners(a);
  };

  removeCurrentListener = function () {
    if (this.$4) {
      let a = this.$5;
      a[a.length - 1] = !0;
    } else this.$2.removeCurrentListener();
  };

  listeners = function (a) {
    return this.$2.listeners(a);
  };

  emit = function (a) {
    let b;
    for (
      // eslint-disable-next-line no-inner-declarations, no-var
      var c = arguments.length, d = new Array(c > 1 ? c - 1 : 0), e = 1;
      e < c;
      e++
    )
      d[e - 1] = arguments[e];
    (b = this.$2).emit.apply(b, [a].concat(d));
  };

  emitAndHold = function (a) {
    let b;
    let c;
    for (
      // eslint-disable-next-line no-inner-declarations, no-var
      var d = arguments.length, e = new Array(d > 1 ? d - 1 : 0), f = 1;
      f < d;
      f++
    )
      e[f - 1] = arguments[f];
    this.$1 = (b = this.$3).holdEvent.apply(b, [a].concat(e));
    (c = this.$2).emit.apply(c, [a].concat(e));
    this.$1 = null;
  };
  releaseCurrentEvent = function () {
    this.$1
      ? this.$3.releaseEvent(this.$1)
      : this.$4 > 0 && this.$3.releaseCurrentEvent();
  };
  releaseHeldEventType = function (a) {
    this.$3.releaseEventType(a);
  };
}
