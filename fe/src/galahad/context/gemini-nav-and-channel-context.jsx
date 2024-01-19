/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { createContext, useContext, useMemo, useState } from "react";
import { jsx } from "react/jsx-runtime";
import emptyFunction from "fbjs/lib/emptyFunction";

import { useGeminiHoverState } from "../hooks/use-gemini-hover-state";

const m = false; // c('gkx')('6525')

// type GeminiLayoutNavStateContextProps = {
//   isNavHovered: boolean
//   isChannelVisible: boolean
//   isAutoHideEnabled: boolean
//   setIsAutoHideEnabled: (value?: any) => any
//   onMouseEnter: (value?: any) => any
//   onMouseLeave: (value?: any) => any
// }

const initial = {
  isNavHovered: !1,
  isChannelVisible: !0,
  isAutoHideEnabled: !1,
  setIsAutoHideEnabled: emptyFunction,
  onMouseEnter: emptyFunction,
  onMouseLeave: emptyFunction,
};
const GeminiLayoutNavStateContext = createContext(initial);
GeminiLayoutNavStateContext.displayName = "GeminiLayoutNavStateContext";

export function Provider({ children }) {
  const [isNavHovered, { onMouseEnter, onMouseLeave }] = useGeminiHoverState();

  const [isAutoHideEnabled, setIsAutoHideEnabled] = useState(!1);
  const isChannelVisible = m
    ? !isAutoHideEnabled
    : isNavHovered || !isAutoHideEnabled;
  const geminiLayoutNavStateValue = useMemo(() => {
    return {
      isNavHovered: isNavHovered,
      isChannelVisible: isChannelVisible,
      isAutoHideEnabled: isAutoHideEnabled,
      setIsAutoHideEnabled: setIsAutoHideEnabled,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
    };
  }, [
    isNavHovered,
    isChannelVisible,
    isAutoHideEnabled,
    onMouseEnter,
    onMouseLeave,
  ]);
  return jsx(GeminiLayoutNavStateContext.Provider, {
    value: geminiLayoutNavStateValue,
    children,
  });
}

const useNavUIState = function () {
  return useContext(GeminiLayoutNavStateContext);
};

export const GeminiNavAndChannelContext = {
  Provider,
  useNavUIState,
};
