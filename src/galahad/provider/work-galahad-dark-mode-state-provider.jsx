/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";

import {
  BaseThemeConfigContext,
  BaseThemeDisplayModeContext,
} from "@/faang/context";

const defaultBaseThemeConfig = {
  darkClassName: "__fb-dark-mode",
  darkVariables: {},
  lightClassName: "__fb-light-mode",
  lightVariables: {},
};

const defaultTheme = "light"; // e ? "dark" : "light";

export const WorkGalahadDarkModeStateProvider = ({ children }) => {
  return (
    <BaseThemeConfigContext.Provider value={defaultBaseThemeConfig}>
      <BaseThemeDisplayModeContext.Provider value={defaultTheme}>
        {children}
      </BaseThemeDisplayModeContext.Provider>
    </BaseThemeConfigContext.Provider>
  );
};
