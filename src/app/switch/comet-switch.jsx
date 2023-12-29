/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { forwardRef } from "react";
import stylex from "@stylexjs/stylex";

import { BaseStyledSwitch } from "./base-styled-switch";

const styles = stylex.create({
  toggle: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: "-4px",
    marginLeft: 0,
  },
});

export const CometSwitch = forwardRef(
  (
    { children, disabled = false, size = "medium", testid, xstyle, ...rest },
    ref
  ) => {
    return (
      <BaseStyledSwitch
        {...rest}
        aria-label={children}
        disabled={disabled}
        ref={ref}
        size={size}
        testid={undefined}
        xstyle={[styles.toggle, xstyle]}
      >
        {children}
      </BaseStyledSwitch>
    );
  }
);
