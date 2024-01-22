/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import nullthrows from "fbjs/lib/nullthrows";

import { shallowArrayEqual } from "../utils/shallow-array-equal";

import { getUniformDispatcher } from "./get-uniform-dispatcher";

export class FluxContainerSubscriptions {
  constructor(a) {
    this.$1 = [];
    this.$4 = a ? a : this.constructor.name;
  }

  setStores(a) {
    let b = this;
    if (this.$3 && shallowArrayEqual(this.$3, a)) return;
    this.$3 = a;
    this.$7();
    this.$8();
    if (a.length === 0) {
      // TODO
      // expectationViolation(
      //   "there should be at least 1 store in a flux subscription"
      // );
      return;
    }
    let d = !1;
    let e = [];
    let f = function () {
      d &&
        (b.$1.forEach((a) => {
          return a();
        }),
        (d = !1));
    };
    let g = getUniformDispatcher(a);
    e = function () {
      if (g.registerContainer)
        b.$6 = g.registerContainer((a) => {
          f();
        }, b.$4);
      else {
        let c = a.map((a) => {
          return a.getDispatchToken();
        });
        b.$6 = g.register(
          (a) => {
            // eslint-disable-next-line no-sequences
            g.waitFor(c), f();
          },
          b.$4,
          null,
          b.$4
        );
      }
      g.explicitlyRegisterStore && g.explicitlyRegisterStore(b);
    };
    this.$2 = a.map((a) => {
      return a.addListener(() => {
        d = !0;
      });
    });
    e();
    this.$5 = g;
  }

  addListener(a) {
    this.$1.push(a);
  }

  reset() {
    this.$7();
    this.$8();
    this.$9();
    this.$10();
  }

  $7() {
    this.$2 &&
      (this.$2.forEach((a) => {
        return a.remove();
      }),
      (this.$2 = null));
  }

  $8() {
    // eslint-disable-next-line no-sequences
    this.$5 && this.$6 && this.$5.unregister(this.$6),
      (this.$5 = null),
      (this.$6 = null);
  }

  $10() {
    this.$3 = null;
  }

  $9() {
    this.$1 = [];
  }

  getDispatchToken() {
    return nullthrows(this.$6, "dispatchToken must be set");
  }
}
