/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useContext } from "react";
import stylex from "@stylexjs/stylex";
import Locale from "fbjs/lib/Locale";

import { BaseRow, BaseView } from "../base-row";
import {
  BaseContextualLayerContextSizeContext,
  BaseContextualLayerLayerAdjustmentContext,
  BaseContextualLayerOrientationContext,
} from "../context";
import { useOnOutsideClick } from "../hooks";

import { CometCalloutInsetArrow } from "./comet-callout-inset-arrow";

const k = stylex.create({
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
    boxShadow: " 0 8px 16px var(--shadow-1)",
    paddingLeft: "12px",
    paddingRight: "12px",
    paddingTop: "16px",
    paddingBottom: "16px",
  },
});

const l = stylex.create({
  accent: {
    backgroundColor: "var(--accent)",
  },
  default: {
    backgroundColor: "var(--popover-background)",
  },
});

const m = stylex.create({
  above: {
    marginBottom: "16px",
  },
  below: {
    marginTop: "16px",
  },
  end: {
    marginLeft: "16px",
  },
});

const n = stylex.create({
  above: {
    bottom: "5px",
  },
  below: {
    top: "5px",
    transform: "rotate(180deg) scaleX(-1)",
  },
  end: {},
});

const o = stylex.create({
  above: {
    bottom: "5px",
  },
  below: {
    top: "5px",
    transform: "rotate(180deg) scaleX(-1)",
  },
  end: {},
});

export const CometCalloutInset = ({
  children,
  onOutsideClick,
  type = "default",
  xstyle,
}) => {
  let { align, position } = useContext(BaseContextualLayerOrientationContext);

  let _align = align === "stretch" ? "start" : align;
  const _position =
    position === "start" ? "above" : position === "end" ? "below" : position;

  let sizeContext = useContext(BaseContextualLayerContextSizeContext);

  let b = useContext(BaseContextualLayerLayerAdjustmentContext) ?? 0;

  const [style, arrowStyles] = r(
    _align,
    _position,
    // eslint-disable-next-line no-cond-assign
    (_align = !sizeContext ? undefined : sizeContext.width) ? _align : 0,
    b
  );

  const ref = useOnOutsideClick(onOutsideClick);

  return (
    <BaseView style={style} xstyle={k.container}>
      <BaseRow ref={ref} xstyle={[k.content, l[type], m[_position], xstyle]}>
        {children}
      </BaseRow>
      <CometInsetArrow
        arrowStyles={arrowStyles}
        position={_position}
        type={type}
      />
    </BaseView>
  );
};

function CometInsetArrow({ arrowStyles, position, type }) {
  return (
    <CometCalloutInsetArrow
      fill={type === "default" ? "var(--popover-background)" : "var(--accent)"}
      style={arrowStyles}
      xstyle={[k.arrow, n[position], type === "accent" && o[position]]}
    />
  );
}

let q = Locale.isRTL();

// eslint-disable-next-line max-params, complexity
function r(a, b, c, d) {
  let e = Math.max(c / 2 - 8, 16) + Math.abs(d);
  let f = c / 2 - 8 < 16;
  c = 24 - c / 2;
  if (b === "above")
    if (a === "start") {
      // eslint-disable-next-line no-inner-declarations, no-var
      var g;
      // eslint-disable-next-line no-undef
      b = q ? "right" : "left";
      // eslint-disable-next-line no-return-assign
      return [
        f
          ? {
              // eslint-disable-next-line no-undef
              transform: "translateX(" + (q ? c : -c) + "px)",
            }
          : void 0,
        ((g = {}), (g[b] = "min(calc(100% - 32px), " + e + "px)"), g),
      ];
    } else if (a === "end") {
      // eslint-disable-next-line no-undef
      b = q ? "left" : "right";
      // eslint-disable-next-line no-return-assign
      return [
        f
          ? {
              transform: "translateX(" + (q ? -c : c) + "px)",
            }
          : void 0,
        ((g = {}), (g[b] = "min(calc(100% - 32px), " + e + "px)"), g),
      ];
    } else {
      // eslint-disable-next-line no-inner-declarations, no-var
      var h;
      // eslint-disable-next-line no-undef
      b = q ? "left" : "right";
      // eslint-disable-next-line no-undef
      g = (q ? -d : d) - 8;
      // eslint-disable-next-line no-return-assign
      return [void 0, ((h = {}), (h[b] = "calc(50% + " + g + "px)"), h)];
    }
  else if (a === "start") {
    // eslint-disable-next-line no-undef
    b = q ? "right" : "left";
    // eslint-disable-next-line no-return-assign
    return [
      f
        ? {
            // eslint-disable-next-line no-undef
            transform: "translateX(" + (q ? c : -c) + "px)",
          }
        : void 0,
      ((g = {}), (g[b] = "min(calc(100% - 32px), " + e + "px)"), g),
    ];
  } else if (a === "end") {
    // eslint-disable-next-line no-undef
    h = q ? "left" : "right";
    // eslint-disable-next-line no-return-assign
    return [
      f
        ? {
            transform: "translateX(" + (q ? -c : c) + "px)",
          }
        : void 0,
      ((b = {}), (b[h] = "min(calc(100% - 32px), " + e + "px)"), b),
    ];
  } else {
    // eslint-disable-next-line no-undef
    g = q ? "left" : "right";
    // eslint-disable-next-line no-undef
    a = (q ? -d : d) - 8;
    // eslint-disable-next-line no-return-assign
    return [void 0, ((f = {}), (f[g] = "calc(50% + " + a + "px)"), f)];
  }
}
