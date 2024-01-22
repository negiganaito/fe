/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { invariant } from "../utils";

export class EventHolder {
  constructor() {
    this.$1 = {};
    this.$2 = [];
  }

  holdEvent = function (a) {
    this.$1[a] = this.$1[a] || [];
    let b = this.$1[a];
    let c = {
      eventType: a,
      index: b.length,
    };
    for (
      // eslint-disable-next-line no-inner-declarations, no-var
      var d = arguments.length, e = new Array(d > 1 ? d - 1 : 0), f = 1;
      f < d;
      f++
    )
      e[f - 1] = arguments[f];
    b.push(e);
    return c;
  };

  emitToListener = function (a, b, c) {
    let d = this;
    let e = this.$1[a];
    if (!e) return;
    e.forEach((e, f) => {
      if (!e) return;
      d.$2.push({
        eventType: a,
        index: f,
      });
      b.apply(c, e);
      d.$2.pop();
    });
  };

  releaseCurrentEvent = function () {
    this.$2.length || invariant(0, 1764);
    this.releaseEvent(this.$2[this.$2.length - 1]);
  };
  releaseEvent = function (a) {
    delete this.$1[a.eventType][a.index];
  };
  releaseEventType = function (a) {
    this.$1[a] = [];
  };
}
