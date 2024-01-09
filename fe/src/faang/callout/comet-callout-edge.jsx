/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useContext } from "react";
import stylex from "@stylexjs/stylex";
import Locale from "fbjs/lib/Locale";

import { BaseRow, BaseView } from "../base-row";
import {
  BaseContextualLayerContextSizeContext,
  BaseContextualLayerLayerAdjustmentContext,
  BaseContextualLayerOrientationContext,
} from "../context";
import { useOnOutsideClick } from "../hooks";

import { CometCalloutEdgeArrow } from "./comet-callout-edge-arrow";

const stylesContainer = stylex.create({
  arrow: {
    position: "absolute",
  },
  container: {
    display: "flex",
  },
  content: {
    backgroundColor: "var(--overlay-alpha-80)",
    borderRadius: "8px",
    borderWidth: "1px",
    boxShadow: "0 8px 16px var(--shadow-1)",
    paddingLeft: "12px",
    paddingRight: "12px",
    paddingTop: "16px",
    paddingBottom: "16px",
  },
});
const stylesType = stylex.create({
  accent: {
    backgroundColor: "var(--accent)",
  },
  default: {
    backgroundColor: "var(--popover-background)",
  },
});
const stylesMarginBottom = stylex.create({
  end: {
    borderBottomRightRadius: "0",
    marginBottom: "20px",
  },
  middle: {
    marginBottom: "4px",
  },
  start: {
    borderBottomLeftRadius: 0,
    marginBottom: "20px",
  },
});
const stylesMarginTop = stylex.create({
  end: {
    borderTopRightRadius: "0",
    marginTop: "20px",
  },
  middle: {
    marginTop: "4px",
  },
  start: {
    borderTopLeftRadius: 0,
    marginTop: "20px",
  },
});
const o = stylex.create({
  end: {
    bottom: "9px",
    right: 0,
    transform: "scaleX(-1)",
  },
  middle: {
    bottom: "9px",
    right: 0,
  },
  start: {
    bottom: "9px",
    start: "0",
  },
});
const p = stylex.create({
  end: {},
  middle: {},
  start: {},
});
const q = stylex.create({
  end: {
    bottom: "9px",
    right: 0,
    transform: "scaleX(-1)",
  },
  middle: {
    bottom: "9px",
    right: 0,
  },
  start: {
    bottom: "9px",
    left: 0,
  },
});
const r = stylex.create({
  end: {},
  middle: {},
  start: {},
});
const s = stylex.create({
  end: {
    right: 0,
    top: "9px",
    transform: "rotate(180deg)",
  },
  middle: {
    right: 0,
    top: "9px",
    transform: "rotate(180deg) scaleX(-1)",
  },
  start: {
    left: 0,
    top: "9px",
    transform: "rotate(180deg) scaleX(-1)",
  },
});
const t = stylex.create({
  end: {
    transform: "rotate(180deg)",
  },
  middle: {
    transform: "rotate(180deg) scaleX(-1)",
  },
  start: {
    transform: "rotate(180deg) scaleX(-1)",
  },
});
const u = stylex.create({
  end: {
    right: 0,
    top: "9px",
    transform: "rotate(180deg)",
  },
  middle: {
    right: 0,
    top: "9px",
    transform: "rotate(180deg) scaleX(-1)",
  },
  start: {
    left: 0,
    top: "9px",
    transform: "rotate(180deg) scaleX(-1)",
  },
});
const v = stylex.create({
  end: {
    transform: "rotate(180deg)",
  },
  middle: {
    transform: "rotate(180deg) scaleX(-1)",
  },
  start: {
    transform: "rotate(180deg) scaleX(-1)",
  },
});
const arrowPositionMap = {
  end: "start",
  start: "end",
};

export const CometCalloutEdge = ({
  children,
  onOutsideClick,
  type = "default",
  xstyle,
}) => {
  const { align, position } = useContext(BaseContextualLayerOrientationContext);

  let alignType = align === "stretch" ? "start" : align;

  const positionType =
    position === "start" ? "above" : position === "end" ? "below" : position;

  let sizeContext = useContext(BaseContextualLayerContextSizeContext);

  let layerAdjustmentContext =
    useContext(BaseContextualLayerLayerAdjustmentContext) ?? 0;

  alignType =
    layerAdjustmentContext !== 0 ? arrowPositionMap[alignType] : alignType;

  sizeContext = calculateTransform(
    alignType,
    (!sizeContext ? void 0 : sizeContext.width) ? sizeContext : 0,
    layerAdjustmentContext
  );

  layerAdjustmentContext = useOnOutsideClick(onOutsideClick);

  return (
    <BaseView style={sizeContext} xstyle={stylesContainer.container}>
      <BaseRow
        ref={layerAdjustmentContext}
        xstyle={[
          stylesContainer.content,
          stylesType[type],
          positionType === "above" && stylesMarginBottom[alignType],
          positionType === "below" && stylesMarginTop[alignType],
          xstyle,
        ]}
      >
        {children}
      </BaseRow>
      <CalloutEdgeArrow align={alignType} position={positionType} type={type} />
    </BaseView>
  );
};

let isRTL = Locale.isRTL();

function CalloutEdgeArrow({ align, position, type }) {
  // let b = a.align;
  // let d = a.position;
  // a = a.type;

  return (
    <CometCalloutEdgeArrow
      fill={type === "default" ? "var(--popover-background)" : "var(--accent)"}
      xstyle={[
        stylesContainer.arrow,
        position === "above" &&
          type === "default" &&
          (isRTL ? p[align] : o[align]),
        position === "above" &&
          type === "accent" &&
          (isRTL ? r[align] : q[align]),
        position === "below" &&
          type === "default" &&
          (isRTL ? t[align] : s[align]),
        position === "below" &&
          type === "accent" &&
          (isRTL ? v[align] : u[align]),
      ]}
    />
  );

  // return i.jsx(c("CometCalloutEdgeArrow.svg.react"), {
  //   fill: a === "default" ? "var(--popover-background)" : "var(--accent)",
  //   xstyle: [
  //     k.arrow,
  //     d === "above" && a === "default" && (x ? p[b] : o[b]),
  //     d === "above" && a === "accent" && (x ? r[b] : q[b]),
  //     d === "below" && a === "default" && (x ? t[b] : s[b]),
  //     d === "below" && a === "accent" && (x ? v[b] : u[b]),
  //   ],
  // });
}

function calculateTransform(align, size, adjustment) {
  adjustment = adjustment === 0 ? size / 2 : 0;
  if (adjustment === 0) return void 0;
  if (align === "start")
    return {
      transform: "translateX(" + (isRTL ? -1 * adjustment : adjustment) + "px)",
    };
  return align === "end"
    ? {
        transform:
          "translateX(" + (isRTL ? adjustment : -1 * adjustment) + "px)",
      }
    : undefined;
}
