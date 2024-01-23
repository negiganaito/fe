/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { invariant } from "../utils";

import { abstractMethod } from "./abstract-method";
import { FluxStore } from "./flux-store";

export class FluxReduceStore extends FluxStore {
  // eslint-disable-next-line no-useless-constructor
  constructor(dispatcher) {
    super(dispatcher);

    this.$FluxReduceStore1 = this.getInitialState();
  }

  getState() {
    return this.$FluxReduceStore1;
  }

  getInitialState() {
    return abstractMethod("FluxReduceStore", "getInitialState");
  }

  reduce(state, action) {
    return abstractMethod("FluxReduceStore", "reduce");
  }

  areEqual(one, two) {
    return one === two;
  }

  // __invokeOnDispatch(action, b = true) {
  //   // b === void 0 && (b = !0);
  //   this.__changed = false;
  //   let state = this.$FluxReduceStore1;
  //   const endingState = this.reduce(state, action);
  //   endingState !== undefined || invariant(0, 2189, this.constructor.name);
  //   this.areEqual(state, endingState) ||
  //     ((this.$FluxReduceStore1 = endingState), this.__emitChange());
  //   b && this.__inform();
  // }

  __invokeOnDispatch(a, b) {
    b === void 0 && (b = !0);
    this.__changed = !1;
    let c = this.$FluxReduceStore1;
    a = this.reduce(c, a);
    a !== void 0 || invariant(0, 2189, this.constructor.name);
    this.areEqual(c, a) || ((this.$FluxReduceStore1 = a), this.__emitChange());
    b && this.__inform();
  }

  __setState(state) {
    this.$FluxReduceStore1 = state;
  }
}
