/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import distinctArray from "fbjs/lib/distinctArray";

import { EventEmitter } from "../event-emitter";
import { concatArrays, invariant } from "../utils";
import { performanceAbsoluteNow } from "../utils/performance-absolute-now";

import { FluxStoreInstrumentation } from "./flux-store-instrumentation";
import { FluxStoreOnDispatchInstrumentation } from "./flux-store-on-dispatch-instrumentation";

export class FluxStore {
  constructor(dispatcher) {
    this.__className = this.constructor.name;
    this.__moduleID = this.constructor.name; // this.constructor.__moduleID;
    this.__changed = false;
    this.__changeEvent = "change";
    this.__dispatcher = dispatcher;
    this.__emitter = new EventEmitter();
    this.$3 = false;
    this.__registerDispatcherCallback(dispatcher);
  }

  __registerDispatcherCallback(dispatcher) {
    let b = this;
    this.$2 = dispatcher.register(
      (payload) => {
        return b.__invokeOnDispatch(payload);
      },
      this.__getIDForDispatcher(),
      this,
      this.__moduleID
    );
  }

  addListener(a) {
    return this.__emitter.addListener(this.__changeEvent, a);
  }

  getActionTypes() {
    if (!this.$1) {
      let a = this.__getActionTypes();
      if (a) {
        let b = this.getDependencyStores();
        if (b.length > 0) {
          let d = !1;
          b = concatArrays(
            b
              .map((a) => {
                a = a && a.getActionTypes ? a.getActionTypes() : null;
                !a && (d = !0);
                return a;
              })
              .filter(Boolean)
          );
          d ? (a = null) : (a = distinctArray(a.concat(b)));
        }
      }
      this.$1 = a;
    }
    return this.$1;
  }

  getDispatcher() {
    return this.__dispatcher;
  }

  getDispatchToken() {
    return this.$2;
  }

  getDependencyDispatchTokens() {
    this.$5 ||
      (this.$5 = this.getDependencyStores().map((a) => {
        return a && a.getDispatchToken && a.getDispatchToken();
      }));
    return this.$5;
  }

  getDependencyStores() {
    this.$4 || (this.$4 = distinctArray(this.__getDependencyStores()));
    return this.$4;
  }

  addStoreDependency(a) {
    let b = this.__dispatcher.registerDependency;
    b && b(this.getDispatchToken(), a.getDispatchToken());
  }

  hasChanged() {
    this.__dispatcher.isDispatching() || invariant(0, 1147, this.__className);
    return this.__changed;
  }

  __setAsUnchanged() {
    this.__changed = !1;
  }

  __emitChange() {
    this.__dispatcher.isDispatching() || invariant(0, 1148, this.__className);
    if (this.__changed) return;
    FluxStoreInstrumentation.onEmitChange(
      this.__moduleID ? this.__moduleID : "unknown"
    );
    this.__changed = !0;
  }

  __invokeOnDispatch(payload) {
    this.__changed = false;
    let b = FluxStoreOnDispatchInstrumentation.hasCallback()
      ? performanceAbsoluteNow()
      : null;
    this.__onDispatch(payload);
    if (b) {
      FluxStoreOnDispatchInstrumentation.call(
        // eslint-disable-next-line no-cond-assign
        (payload = this.__moduleID) ? payload : "unknown",
        performanceAbsoluteNow() - b
      );
    }
    this.__inform();
  }

  __inform(a) {
    this.$3 = this.__changed || this.$3;
    let b =
      !this.__dispatcher.shouldAllowInforms ||
      this.__dispatcher.shouldAllowInforms();
    b &&
      this.$3 &&
      ((this.$3 = !1), this.__emitter.emit(a || this.__changeEvent));
  }

  __onDispatch(a) {
    invariant(0, 1149, this.__className);
  }

  __getActionTypes() {
    return null;
  }

  __getDependencyStores() {
    return [];
  }

  __getIDForDispatcher() {
    return this.__className;
  }
}
