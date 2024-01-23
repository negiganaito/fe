/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import shallowEqual from "fbjs/lib/shallowEqual";

import { FluxContainerSubscriptions } from "./flux-container-subscriptions";
import { useSubscriptionValue } from "./use-subscription-value";

const useFluxStore = (store, reducer, d) => {
  const getCurrentValue = useCallback(
    (d) => {
      let e = reducer(store);
      return d && shallowEqual(d, e) ? d : e;
    },
    [store, reducer]
  );

  let subscribe = useCallback(
    (b) => {
      let c = store.addListener(b);
      return function () {
        return c.remove();
      };
    },
    [store]
  );

  return useSubscriptionValue({
    getCurrentValue,
    subscribe,
  });
};

// eslint-disable-next-line max-params
const useCalculateState = (a, b, d, e = shallowEqual) => {
  // e === void 0 && (e = c("shallowEqual"));
  let f = useCallback((b) => {
    let c = a(b);
    return b && e(b, c) ? b : c;
  }, d);

  const g = useCallback((a) => {
    if (b.length === 0) {
      return function () {};
    }
    let d = new FluxContainerSubscriptions("useCalculateState");
    d.setStores(b);
    d.addListener(a);
    return function () {
      return d.reset();
    };
  }, b);

  const [h, m] = useState(() => {
    return f();
  });

  d = function () {
    m(f);
  };

  let n = useRef(d);
  n.current = d;
  let [p, o] = useState(() => {
    return f;
  });

  p !== f &&
    (o(() => {
      return f;
    }),
    d());

  useEffect(() => {
    let a = !1;
    let b = function () {
      a || n.current();
    };
    let c = g(b);
    n.current();
    return function () {
      // eslint-disable-next-line no-sequences
      (a = !0), c();
    };
  }, [n, g]);

  return [h, m];
};

export const FluxHooks = {
  useFluxStore,
  useCalculateState,
};
