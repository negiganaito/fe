/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
import stylex from "@stylexjs/stylex";

const styles = stylex.create({
  root: {
    position: "relative",
  },
});

// type BasePopoverProps = {
//   arrowImpl?: any
//   label?: string
//   arrowAlignment?: string
//   labelledby?: string
//   testid?: string
// } & React.JSX.IntrinsicElements['div']

export const BasePopover = forwardRef(
  (
    {
      label,
      arrowAlignment,
      arrowImpl,
      xstyle,
      role = "dialog",
      id,
      labelledby,
      ...rest
    },
    ref
  ) => {
    return arrowImpl
      ? jsx(arrowImpl, {
          arrowAlignment,
          id,
          label,
          labelledby,
          ref,
          role,
          testid: undefined,
          xstyle,
          ...rest,
        })
      : jsx("div", {
          "aria-label": label,
          "aria-labelledby": labelledby,
          className: stylex(styles.root, xstyle),
          id,
          ref,
          role,
          ...rest,
        });
  }
);
