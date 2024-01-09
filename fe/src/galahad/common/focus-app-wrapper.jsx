/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useCallback, useRef } from "react";

import { ActiveFocusRegionUtilsContext } from "@/faang/context";
import { FocusRegion } from "@/faang/focus-region";
import { useUnsafeRef_DEPRECATED } from "@/faang/hooks";

export function FocusAppWrapper({ children }) {
  let target = useRef(null);

  let getActiveFocusRegion = useCallback(() => {
    return target.current;
  }, [target]);

  let setActiveFocusRegion = useCallback(
    (_target) => {
      target.current = _target;
    },
    [target]
  );
  const activeFocusRegionUtilsContextValue = useUnsafeRef_DEPRECATED({
    getActiveFocusRegion,
    setActiveFocusRegion,
  });

  return (
    <ActiveFocusRegionUtilsContext.Provider
      value={activeFocusRegionUtilsContextValue.current}
    >
      <FocusRegion.FocusRegion>{children}</FocusRegion.FocusRegion>
    </ActiveFocusRegionUtilsContext.Provider>
  );
}
