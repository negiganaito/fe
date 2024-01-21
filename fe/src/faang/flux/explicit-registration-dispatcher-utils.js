/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import emptyFunction from "fbjs/lib/emptyFunction";
import { Dispatcher } from "flux";

export const ExplicitRegistrationDispatcherUtils = {
  warn: emptyFunction,
  inlineRequiresEnabled: false,
};

export class ExplicitRegistrationDispatcher extends Dispatcher {
  constructor(props) {
    const { strict } = props;
    super();
    this.$ExplicitRegistrationDispatcher2 = strict;
    this.$ExplicitRegistrationDispatcher1 = {};
  }

  explicitlyRegisterStore = function (store) {
    const token = store.getDispatchToken();

    this.$ExplicitRegistrationDispatcher1[token] = true;

    return token;
  };

  explicitlyRegisterStores = function (stores) {
    return stores.map((store) => {
      return store.explicitlyRegisterStore(store);
    });
  };

  register = function (callback, defaultID) {
    const id = this.__genID(defaultID);
    this.$ExplicitRegistrationDispatcher1[id] = false;
    defaultID = super.register.call(
      this,
      this.$ExplicitRegistrationDispatcher4.bind(this, id, callback),
      id
    );
    return defaultID;
  };

  $ExplicitRegistrationDispatcher4 = function (a, b, c) {
    (this.$ExplicitRegistrationDispatcher1[a] ||
      !this.$ExplicitRegistrationDispatcher2) &&
      this.__invokeCallback(a, b, c);
  };

  unregister = function (id) {
    super.unregister.call(this, id);
    delete this.$ExplicitRegistrationDispatcher1[id];
  };

  __getMaps = function () {};
}
