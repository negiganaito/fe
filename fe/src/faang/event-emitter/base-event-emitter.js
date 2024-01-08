/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import emptyFunction from "fbjs/lib/emptyFunction";

import { ErrorGuard, unrecoverableViolation } from "@/faang/error";

import { EmitterSubscription } from "./emitter-subscription";
import { EventSubscriptionVendor } from "./event-subscription-vendor";

export class BaseEventEmitter {
  constructor() {
    this.$2 = new EventSubscriptionVendor();
    this.$1 = null;
  }

  addListener(a, c, d) {
    // return this.$2.addSubscription(a, new EmitterSubscription(this.$2, c, d))
    return this.$2.addSubscription(a, new EmitterSubscription(this.$2, c, d));
  }

  removeListener(a) {
    this.$2.removeSubscription(a);
  }

  once(a, b, c) {
    let d = this;
    return this.addListener(a, function () {
      d.removeCurrentListener();
      b.apply(c, arguments);
    });
  }

  removeAllListeners(a) {
    this.$2.removeAllSubscriptions(a);
  }

  removeCurrentListener() {
    if (!this.$1)
      // throw b('unrecoverableViolation')(
      //   'Not in an emitting cycle; there is no current subscription',
      //   'emitter',
      // )
      throw unrecoverableViolation(
        "Not in an emitting cycle; there is no current subscription",
        "emitter"
      );
    this.$2.removeSubscription(this.$1);
  }

  listeners(a) {
    a = this.$2.getSubscriptionsForType(a);
    return a
      ? a.filter(emptyFunction.thatReturnsTrue).map((a) => {
          return a.listener;
        })
      : [];
  }

  emit(a) {
    let b = this.$2.getSubscriptionsForType(a);
    if (b) {
      let c = Object.keys(b);
      let d;
      for (let e = 0; e < c.length; e++) {
        let f = c[e];
        let g = b[f];
        if (g) {
          this.$1 = g;
          if (d === null) {
            d = [g, a];
            for (
              let h = 0, i = arguments.length <= 1 ? 0 : arguments.length - 1;
              h < i;
              h++
            )
              d[h + 2] =
                h + 1 < 1 || arguments.length <= h + 1
                  ? void 0
                  : arguments[h + 1];
          } else d[0] = g;
          this.__emitToSubscription.apply(this, d);
        }
      }
      this.$1 = null;
    }
  }

  __emitToSubscription(a, c) {
    for (
      // eslint-disable-next-line no-inner-declarations, no-var
      var d = arguments.length, e = new Array(d > 2 ? d - 2 : 0), f = 2;
      f < d;
      f++
    )
      e[f - 2] = arguments[f];
    ErrorGuard.applyWithGuard(a.listener, a.context, e, {
      name: "EventEmitter " + c + " event",
    });
  }
}
