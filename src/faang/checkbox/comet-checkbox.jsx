/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/*

- "CometCheckbox.react"
  - "ix", 
  - "BaseStyledCheckbox.react"
  - "CometIcon.react"
  - "CometPressableOverlay.react"
  - "TetraText.react"
  - "fbicon", "react", 
  - "useCometPressableEventHandlers"


*/

import React, { forwardRef } from "react";
import stylex from "@stylexjs/stylex";

import { useCometPressableEventHandlers } from "../hooks";
import { CometIcon, fbicon } from "../icon";
import { CometPressableOverlay } from "../pressable/comet-pressable-overlay";
import { TetraText } from "../tetra-text";
import { ix } from "../utils";

import { BaseStyledCheckbox } from "./base-styled-checkbox";

const styles = stylex.create({
  // x1i10hfl x6s0dn4 x78zum5 xwib8y2 x1y1aw1k x1n2onr6 xggy1nq
  d1: {
    WebkitTapHighlightColor: "transparent",
    alignItems: "center",
    display: "flex",
    paddingBottom: "8px",
    paddingTop: "8px",
    position: "relative",
    touchAction: "manipulation",
  },

  // "x1r8uery x1iyjqo2 x1i64zmx xeuugli"
  d2: {
    flexBasis: 0,
    flexGrow: 1,
    marginLeft: "8px",
    minWidth: 0,
  },
});

export const CometCheckbox = forwardRef((props, ref) => {
  const {
    checked,
    disabled = false,
    iconSize = 24,
    id,
    label,
    labelIsHidden = false,
    name,
    onChange,
    reduceEmphasis = false,
    smallerLabel = false,
    tabIndex,
    // eslint-disable-next-line no-unused-vars
    testid,
    value,
  } = props;

  /**
   * `a` can be
     emptyObject or {
        onBlur: W,
        onClick: fa,
        onDragStart: ba,
        onFocus: V,
        onKeyDown: ga,
        onMouseDown: Z,
        onMouseEnter: X,
        onMouseLeave: Y,
        onMouseUp: aa,
        onTouchEnd: ea,
        onTouchMove: da,
        onTouchStart: ca,
      };

   */
  // eslint-disable-next-line no-unused-vars
  const [targetRef, _, { focusVisible, hovered, pressed }, labelProps, __] =
    useCometPressableEventHandlers({
      disabled,
    });

  return (
    <label
      // "x1i10hfl x6s0dn4 x78zum5 xwib8y2 x1y1aw1k x1n2onr6 xggy1nq"
      className={stylex(styles.d1)}
      {...labelProps}
      ref={targetRef}
    >
      <BaseStyledCheckbox
        aria-label={labelIsHidden ? label : void 0}
        checked={checked}
        checkedIcon={
          <CometIcon
            color={disabled ? "disabled" : "highlight"}
            icon={
              iconSize === 16
                ? fbicon._(ix(492790), 16)
                : fbicon._(ix(531032), 24)
            }
          />
        }
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        ref={ref}
        tabIndex={tabIndex}
        testid={undefined}
        uncheckedIcon={
          <CometIcon
            color={disabled ? "disabled" : "secondary"}
            icon={
              iconSize === 16
                ? fbicon._(ix(659287), 16)
                : fbicon._(ix(659289), 24)
            }
          />
        }
        value={value}
      >
        <CometPressableOverlay
          focusVisible={focusVisible}
          hovered={hovered}
          offset={8}
          pressed={pressed}
          radius="50%"
        />
      </BaseStyledCheckbox>
      {!labelIsHidden && (
        <div className={stylex(styles.d2)}>
          <TetraText
            color={disabled ? "disabled" : "primary"}
            type={
              reduceEmphasis
                ? smallerLabel === !0
                  ? "body4"
                  : "body3"
                : "button2"
            }
          >
            {label}
          </TetraText>
        </div>
      )}
    </label>
  );
});
