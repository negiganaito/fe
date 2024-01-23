/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import emptyFunction from "fbjs/lib/emptyFunction";

import { Dispatcher_DEPRECATED } from "./dispatcher_DEPRECATED";

export const ExplicitRegistrationDispatcherUtils = {
  warn: emptyFunction,
  inlineRequiresEnabled: false,
};

export class ExplicitRegistrationDispatcher extends Dispatcher_DEPRECATED {
  constructor(props) {
    const { strict } = props;
    super();
    this.$ExplicitRegistrationDispatcher2 = strict;
    this.$ExplicitRegistrationDispatcher1 = {};
  }

  explicitlyRegisterStore(store) {
    const token = store.getDispatchToken();

    this.$ExplicitRegistrationDispatcher1[token] = true;

    return token;
  }

  explicitlyRegisterStores(stores) {
    return stores.map((store) => {
      return this.explicitlyRegisterStore(store);
    });
  }

  register(callback, defaultID) {
    const id = this.__genID(defaultID);
    this.$ExplicitRegistrationDispatcher1[id] = false;

    defaultID = super.register(
      this,
      this.$ExplicitRegistrationDispatcher4.bind(this, id, callback),
      id
    );

    // defaultID = super.register.call(
    //   this,
    //   this.$ExplicitRegistrationDispatcher4.bind(this, id, callback),
    //   id
    // );
    return defaultID;
  }

  $ExplicitRegistrationDispatcher4(a, b, c) {
    (this.$ExplicitRegistrationDispatcher1[a] ||
      !this.$ExplicitRegistrationDispatcher2) &&
      this._invokeCallback(a, b, c);

    // if (
    //   this.$ExplicitRegistrationDispatcher1[a] ||
    //   !this.$ExplicitRegistrationDispatcher2
    // ) {
    //   this._invokeCallback(a, b, c);
    // }
  }

  unregister(id) {
    // super.unregister.call(this, id);
    super.unregister(id);
    delete this.$ExplicitRegistrationDispatcher1[id];
  }

  __getMaps = function () {};
}
