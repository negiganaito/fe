/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";

import { BaseView } from "../base-row";
import { BaseThemeProvider } from "../dialog/base-theme-provider";

export const BaseTheme = forwardRef(
  ({ config, displayMode, style, xstyle, ...rest }, ref) => {
    return (
      <BaseThemeProvider
        config={config}
        displayMode={displayMode}
        children={(internalClass, internalStyle) => {
          return (
            <BaseView
              {...rest}
              ref={ref}
              style={{ ...internalStyle, ...style }}
              xstyle={[internalClass, xstyle]}
            />
          );
        }}
      />
    );

    // return jsx(BaseThemeProvider, {
    //   config: config,
    //   displayMode: displayMode,
    //   children: function (internalClass, internalStyle) {
    //     console.log({ internalClass, internalStyle });

    //     return jsx(BaseView, {
    //       ...rest,
    //       ref,
    //       style: { ...internalStyle, ...style },
    //       xstyle: [internalClass.theme, xstyle],
    //     });
    //   },
    // });
  }
);
