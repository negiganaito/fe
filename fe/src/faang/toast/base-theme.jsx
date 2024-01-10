/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";

import { BaseView } from "../base-row";
import { BaseThemeProvider } from "../dialog/base-theme-provider";

export const BaseTheme = forwardRef(
  ({ config, displayMode, style, xstyle, ...rest }, ref) => {
    return jsx(BaseThemeProvider, {
      config: config,
      displayMode: displayMode,
      children: function (internalClass, internalStyle) {
        return jsx(BaseView, {
          ...rest,
          ref,
          style: { ...internalStyle, ...style },
          xstyle: [internalClass.theme, xstyle],
        });
      },
    });
  }
);
