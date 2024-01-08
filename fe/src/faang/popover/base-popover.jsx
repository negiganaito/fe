/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { forwardRef } from "react";
import stylex from "@stylexjs/stylex";

import { testID } from "@/faang/utils";

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
      arrowImpl: ArrowImpl,
      xstyle,
      role = "dialog",
      id,
      labelledby,
      testid,
      ...rest
    },
    ref
  ) => {
    return ArrowImpl ? (
      <ArrowImpl
        arrowAlignment={arrowAlignment}
        id={id}
        label={label}
        labelledby={labelledby}
        ref={ref}
        role={role}
        testid={undefined}
        xstyle={xstyle}
        {...rest}
      />
    ) : (
      <div
        aria-label={label}
        aria-labelledby={labelledby}
        className={stylex(styles.root, xstyle)}
        id={id}
        ref={ref}
        role={role}
        {...testID(testid)}
        {...rest}
      />
    );

    // return arrowImpl
    //   ? jsx(arrowImpl, {
    //       arrowAlignment,
    //       id,
    //       label,
    //       labelledby,
    //       ref,
    //       role,
    //       testid: undefined,
    //       xstyle,
    //       ...rest,
    //     })
    //   : jsx("div", {
    //       "aria-label": label,
    //       "aria-labelledby": labelledby,
    //       className: stylex(styles.root, xstyle),
    //       id,
    //       ref,
    //       role,
    //       ...rest,
    //     });
  }
);
