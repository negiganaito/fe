/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { forwardRef, useContext, useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import stylex from "@stylexjs/stylex";
import Locale from "fbjs/lib/Locale";

import {
  BaseContextualLayerContextSizeContext,
  BaseContextualLayerLayerAdjustmentContext,
  BaseContextualLayerOrientationContext,
} from "@/faang/context";

import { BasePopoverDownEdgeArrow } from "./base-popover-down-edge-arrow";
import { BasePopoverDownInsetArrow } from "./base-popover-down-inset-arrow";
import { BasePopoverRightEdgeArrow } from "./base-popover-right-edge-arrow";
import { BasePopoverRightInsetArrow } from "./base-popover-right-inset-arrow";

const n = stylex.create({
  arrow: {
    position: "absolute",
  },
  container: {
    position: "relative",
  },
});
const o = stylex.create({
  above: {
    marginBottom: "15px",
  },
  below: {
    marginTop: "15px",
  },
  end: {
    marginStart: "15px",
  },
  start: {
    marginEnd: "15px",
  },
});

const p = stylex.create({
  above: {
    top: "calc(100% - 1px)calc(100% - 1px)",
  },
  below: {
    bottom: "calc(100% - 1px)",
  },
  end: {
    right: "calc(100% - 1px)",
  },
  start: {
    left: "calc(100% - 1px)",
  },
});
const q = stylex.create({
  end: {
    right: 0,
  },
  middle: {
    left: "calc(50% - 12.5px)",
  },
  start: {
    left: 0,
  },
  stretch: {},
});
const r = stylex.create({
  end: {
    bottom: 0,
  },
  middle: {
    top: "calc(50% - 12.5px)",
  },
  start: {
    top: 0,
  },
  stretch: {},
});

const k = 3;
const l = Locale.isRTL(); // false; // isRTL
const m = 25;

export const BasePopoverSVGArrowContainer = forwardRef(
  (
    {
      arrowAlignment = "center",
      children,
      label,
      labelledby,
      testid,
      xstyle,
      ...rest
    },
    ref
  ) => {
    const { align, position } = useContext(
      BaseContextualLayerOrientationContext
    );
    const y = useContext(BaseContextualLayerContextSizeContext);
    const v = getArrowComponent(position, align);

    const z = useContext(BaseContextualLayerLayerAdjustmentContext) ?? 0;

    const d = useMemo(() => {
      let a = l ? "start" : "end";
      let b = l ? "end" : "start";
      let c = (align === "end" && !l) || (align === "start" && l);
      let d = 1;
      let e = 1;
      let g = 0;
      let h = 0;
      switch (position) {
        case "above":
          g += -z;
          if (c) {
            d = -1;
          }
          break;
        case "below":
          g += -z;
          e = -1;
          if (c) {
            d = -1;
          }
          break;
        case b:
          h += -z;
          if (align === "start") {
            e = -1;
          }
          break;
        case a:
          h += -z;
          d = -1;
          if (align === "start") {
            e = -1;
          }
          break;
      }
      return {
        arrowStyle: {
          transform:
            "scale(" + d + ", " + e + ") translate(" + g + "px, " + h + "px)",
        },
        containerStyle: getContainerStyle(position, align, arrowAlignment, y),
      };
    }, [align, arrowAlignment, y, z, position]);

    const { arrowStyle, containerStyle } = d;

    return jsxs("div", {
      ...rest,
      "aria-label": label,
      "aria-labelledby": labelledby,
      className: stylex(n.container, o[position], xstyle),
      ref,
      style: containerStyle,
      children: [
        children,
        jsx(v, {
          className: stylex(
            n.arrow,
            p[position],
            (position === "start" || position === "end") && r[align],
            (position === "above" || position === "below") && q[align]
          ),
          fill: "var(--card-background)",
          style: arrowStyle,
        }),
      ],
    });
  }
);

function getArrowComponent(position, align) {
  return position === "above" || position === "below"
    ? align === "middle"
      ? BasePopoverDownInsetArrow
      : BasePopoverDownEdgeArrow
    : align === "middle"
    ? BasePopoverRightInsetArrow
    : BasePopoverRightEdgeArrow;
}

// eslint-disable-next-line max-params
function getContainerStyle(
  position,
  align,
  arrowAlignment,
  baseContextualLayerContextSizeContext
) {
  if (arrowAlignment === "edge" || !baseContextualLayerContextSizeContext) {
    return {};
  }
  const positionBelowOrAbove = position === "below" || position === "above";
  const widthOrHeight = positionBelowOrAbove
    ? baseContextualLayerContextSizeContext.width
    : baseContextualLayerContextSizeContext.height;
  const dummy = widthOrHeight > 0 ? widthOrHeight / 2 : 0;
  if (dummy === 0) {
    return {};
  }
  position = s(positionBelowOrAbove, align, align === "middle" ? m / 2 : dummy);
  return {
    transform: positionBelowOrAbove
      ? "translateX(" + position + "px)"
      : "translateY(" + position + "px)",
  };
}

function s(positionBelowOrAbove, align, c) {
  c = c - k;
  if (!positionBelowOrAbove) {
    return align === "end" || align === "middle" ? c * -1 : c;
  }
  return (l && align === "start") || (!l && align === "end") ? c * -1 : c;
}
