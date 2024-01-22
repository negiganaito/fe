/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { invariant } from "../utils";

import { abstractMethod } from "./abstract-method";
import { TypedFluxStore } from "./typed-flux-store";

export class FluxReduceStore extends TypedFluxStore {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    this.$FluxReduceStore1 = props.getInitialState();
  }

  getState() {
    return this.$FluxReduceStore1;
  }

  getInitialState() {
    return abstractMethod("FluxReduceStore", "getInitialState");
  }

  reduce(a, b) {
    return abstractMethod("FluxReduceStore", "reduce");
  }

  areEqual(a, b) {
    return a === b;
  }

  __invokeOnDispatch(a, b) {
    b === void 0 && (b = !0);
    this.__changed = !1;
    let c = this.$FluxReduceStore1;
    a = this.reduce(c, a);
    a !== void 0 || invariant(0, 2189, this.constructor.name);
    this.areEqual(c, a) || ((this.$FluxReduceStore1 = a), this.__emitChange());
    b && this.__inform();
  }

  __setState(a) {
    this.$FluxReduceStore1 = a;
  }
}
