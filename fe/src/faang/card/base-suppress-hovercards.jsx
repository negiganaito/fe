/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useContext } from "react";
import { jsx } from "react/jsx-runtime";

const BaseSuppressHovercardsContext = React.createContext(!1);

function BaseSuppressHovercardsProvider({ children }) {
  return jsx(BaseSuppressHovercardsContext.Provider, {
    value: true,
    children,
  });
}

function useIsHovercardSuppressed() {
  return useContext(BaseSuppressHovercardsContext);
}

export const BaseSuppressHovercards = {
  BaseSuppressHovercardsContext,
  BaseSuppressHovercardsProvider,
  useIsHovercardSuppressed,
};
