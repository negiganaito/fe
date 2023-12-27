/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, useContext } from "react";
import stylex from "@stylexjs/stylex";

import { BaseContextualLayerOrientationContext } from "../context";

import { BasePopover } from "./base-popover";
import { BasePopoverSVGArrowContainer } from "./base-popover-svg-arrow-container";

const styles = stylex.create({
  card: {
    boxSizing: "border-box",
  },
  cardBackground: {
    backgroundColor: "var(--card-background)",
  },
  cardBorderRadius: {
    borderRadius: "var(--card-corner-radius)",
  },
  cardOverflow: {
    overflowX: "hidden",
    overflowY: "hidden",
  },
  cardShadow: {
    boxShadow: "var(--card-box-shadow)",
  },
  popoverWithArrow: {
    filter: "drop-shadow(0 0 6px var(--shadow-2))",
    // eslint-disable-next-line @stylexjs/valid-styles
    WebkitFilter: "drop-shadow(0 0 6px var(--shadow-2))",
  },
});
const aboveStyles = stylex.create({
  end: {
    borderBottomRightRadius: 0,
  },
  middle: {},
  start: {
    borderBottomLeftRadius: 0,
  },
  stretch: {},
});
const belowStyles = stylex.create({
  end: {
    borderTopRightRadius: 0,
  },
  middle: {},
  start: {
    borderTopLeftRadius: 0,
  },
  stretch: {},
});
const startStyles = stylex.create({
  end: {
    borderBottomRightRadius: 0,
  },
  middle: {},
  start: {
    borderTopRightRadius: 0,
  },
  stretch: {},
});
const endStyles = stylex.create({
  end: {
    borderBottomLeftRadius: 0,
  },
  middle: {},
  start: {
    borderTopLeftRadius: 0,
  },
  stretch: {},
});

// type CometPopoverProps = {
//   animatedPopover?: boolean
//   children?: ReactNode
//   popoverName?: string
//   withArrow?: boolean
//   label?: string
//   arrowAlignment?: any
//   id?: string
//   labelledby?: any
//   role?: any
//   testid?: string
// }

export const CometPopover = forwardRef(
  (
    {
      label,
      animatedPopover = false,
      children,
      popoverName,
      withArrow = false,
      ...rest
    },
    ref
  ) => {
    const { align, position } = useContext(
      BaseContextualLayerOrientationContext
    );

    return (
      <BasePopover
        {...rest}
        arrowImpl={withArrow ? BasePopoverSVGArrowContainer : undefined}
        ref={ref}
        xstyle={withArrow && styles.popoverWithArrow}
      >
        <div
          className={stylex(
            styles.card,
            styles.cardBackground,
            styles.cardShadow,
            styles.cardBorderRadius,
            styles.cardOverflow,
            withArrow && getPositionalStyle(position, align)
          )}
        >
          {children}
        </div>
      </BasePopover>
    );

    // return jsx(BasePopover, {
    //   ...rest,
    //   arrowImpl: withArrow ? BasePopoverSVGArrowContainer : undefined,
    //   ref,
    //   xstyle: withArrow && styles.popoverWithArrow,
    //   children: jsx("div", {
    //     children,
    //     className: stylex(
    //       styles.card,
    //       styles.cardBackground,
    //       styles.cardShadow,
    //       styles.cardBorderRadius,
    //       styles.cardOverflow,
    //       withArrow && getPositionalStyle(position, align)
    //     ),
    //     // ref,
    //   }),
    // });
  }
);

/**
 *
 * @param {"end" | "start" | "above" | "below"} position
 * @param {"end" | "start" | "stretch" | "middle"} align
 * @returns
 */
// eslint-disable-next-line max-params
function getPositionalStyle(position, align) {
  switch (position) {
    case "above":
      return aboveStyles[align];
    case "below":
      return belowStyles[align];
    case "end":
      return endStyles[align];
    case "start":
      return startStyles[align];
  }
}
