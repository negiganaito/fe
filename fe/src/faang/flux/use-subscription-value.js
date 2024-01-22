/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useCallback, useEffect, useState } from "react";

// TODO
export function useSubscriptionValue(subscriptionHandler) {
  // Extract functions from the subscriptionHandler object
  let getCurrentValue = subscriptionHandler.getCurrentValue;
  let subscribe = subscriptionHandler.subscribe;

  // State to hold the current value and a function to update it
  let [currentValue, setCurrentValue] = useState(() => {
    return getCurrentValue();
  });

  // Memoized callback function to update the current value
  let updateCurrentValue = useCallback(() => {
    setCurrentValue(getCurrentValue);
  }, [getCurrentValue]);

  // Another state to hold the current value without updating it
  let storedValue = useState(() => {
    return getCurrentValue;
  })[0];

  // If the stored value differs from the current value, update and trigger the callback
  storedValue !== getCurrentValue &&
    (setCurrentValue(() => {
      return getCurrentValue;
    }),
    updateCurrentValue());

  // Effect to manage subscriptions and update the state
  useEffect(() => {
    let isUnmounted = false;

    // Callback function to update the state if the component is not unmounted
    let updateCallback = function () {
      !isUnmounted && updateCurrentValue();
    };

    // Subscribe to changes and trigger the initial update
    let unsubscribe = subscribe(updateCallback);
    updateCurrentValue();

    // Cleanup function to unsubscribe when the component is unmounted
    return function () {
      isUnmounted = true;
      unsubscribe();
    };
  }, [updateCurrentValue, subscribe]);

  // Return the current value
  return currentValue;
}
