/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { forwardRef, useContext } from "react";
// @ts-ignore
import { jsx } from "react/jsx-runtime";

import { BaseContextualLayerAvailableHeightContext } from "../context";

import { BaseMultiPageView } from "./base-multi-page-view";
import { CometMenuBase } from "./comet-menu-base";
import { CometPopover } from "./comet-popover";
import { CometPopoverLoadingStateContent } from "./comet-popover-loading-state-content";

const DEFAULT_HEIGHT = 15;

// export type CometMenuBaseWithPopoverProps = {
//   children?: React.ReactNode
//   'aria-labelledby': any
//   fallback?: any
//   id?: string
//   label?: string
//   role?: string
//   arrowAlignment?: any
//   withArrow?: boolean
//   testid?: string
//   truncate?: boolean
// }

export const CometMenuBaseWithPopover = forwardRef(
  (
    {
      "aria-labelledby": al,
      children,
      fallback,
      id,
      label,
      role = "menu",
      arrowAlignment,
      withArrow = false,
      testid = "comet-menu",
      truncate = false,
      ...rest
    },
    ref
  ) => {
    let baseContextualLayerAvailableHeightValue = useContext(
      BaseContextualLayerAvailableHeightContext
    );

    if (withArrow && baseContextualLayerAvailableHeightValue) {
      baseContextualLayerAvailableHeightValue -= DEFAULT_HEIGHT;
    }

    if (React.Children.count(children) > 0) {
      return (
        <CometPopover
          arrowAlignment={arrowAlignment}
          id={id}
          label={label}
          labelledby={al ?? undefined}
          ref={ref}
          role={role}
          testid={undefined}
          withArrow={withArrow}
        >
          <BaseMultiPageView
            disableAutoFocus={true}
            disableFocusContainment={true}
            fallback={
              fallback ? fallback : jsx(CometPopoverLoadingStateContent, {})
            }
          >
            <CometMenuBase
              {...rest}
              role={role}
              maxHeight={
                truncate
                  ? baseContextualLayerAvailableHeightValue ?? 0
                  : undefined
              }
            >
              {children}
            </CometMenuBase>
          </BaseMultiPageView>
        </CometPopover>
      );
    }

    return undefined;

    // return React.Children.count(children) > 0
    //   ? jsx(CometPopover, {
    //       arrowAlignment,
    //       id,
    //       label,
    //       labelledby: al ?? void 0,
    //       ref,
    //       role,
    //       testid: void 0,
    //       withArrow,
    //       children: jsx(BaseMultiPageView, {
    //         disableAutoFocus: !0,
    //         disableFocusContainment: !0,
    //         fallback: fallback ?? jsx(CometPopoverLoadingStateContent, {}),
    //         children: jsx(
    //           CometMenuBase,
    //           Object.assign({}, rest, {
    //             children,
    //             maxHeight: truncate
    //               ? baseContextualLayerAvailableHeightValue ?? 0
    //               : void 0,
    //             role,
    //           }),
    //         ),
    //       }),
    //     })
    //   : null
  }
);

// export default CometMenuBaseWithPopover
