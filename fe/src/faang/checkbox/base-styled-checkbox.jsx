/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/*

- BaseStyledCheckbox
  - BaseCheckbox

*/

import React, { forwardRef, useCallback } from "react";
import stylex from "@stylexjs/stylex";

import { BaseCheckbox } from "./base-checkbox";

const styles = stylex.create({
  checkbox: {
    display: "flex",
  },
});

export const BaseStyledCheckbox = forwardRef((props, ref) => {
  const {
    "aria-label": al,
    "aria-labelledby": alb,
    checked,
    checkedIcon,
    children,
    disabled = false,
    id,
    name,
    onChange,
    suppressFocusRing,
    tabIndex,
    // eslint-disable-next-line no-unused-vars
    testid,
    uncheckedIcon,
    value,
  } = props;

  const onValueChange = useCallback(
    (a, b) => {
      onChange(value);
    },
    [onChange, value]
  );

  return (
    <BaseCheckbox
      aria-label={al}
      aria-labelledby={alb}
      checked={checked}
      disabled={disabled}
      id={id}
      name={name}
      onValueChange={onValueChange}
      ref={ref}
      suppressFocusRing={suppressFocusRing}
      tabIndex={tabIndex}
      testid={undefined}
      xstyle={styles.checkbox}
    >
      {checked ? checkedIcon : uncheckedIcon}
      {children}
    </BaseCheckbox>
  );
});
