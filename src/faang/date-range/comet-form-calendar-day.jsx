/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { forwardRef, memo, useMemo } from "react";
import stylex from "@stylexjs/stylex";
import fbt from "fbt";

import {
  CometComponentWithKeyCommands,
  CometKeys,
} from "../commet-key-commands";
import { CometScreenReaderText } from "../common";
import { CometPressable } from "../pressable";
import { CometPressableOverlay } from "../pressable/comet-pressable-overlay";
import { TetraText } from "../tetra-text";

const styles = stylex.create({
  cell: {
    alignItems: "stretch",
    boxSizing: "border-box",
    cursor: "default",
    display: "flex",
    flexBasis: 0,
    flexDirection: "row",
    flexGrow: 1,
    height: "30px",
    justifyContent: "center",
    paddingTop: "6px",
  },
  day: {
    alignItems: "center",
    borderRadius: "6px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
  },
  dayWrapper: {
    alignItems: "stretch",
    display: "flex",
    width: "100%",
  },
  disabled: {
    cursor: "not-allowed",
  },
  hidden: {
    visibility: "hidden",
  },
  highlighted: {
    backgroundColor: "var(--highlight-bg)",
  },
  large: {
    paddingBottom: "8px",
    paddingTop: "8px",
  },
  placeholder: {
    backgroundColor: "var(--web-wash)",
    borderRadius: "0",
  },
  selected: {
    backgroundColor: "var(--accent)",
  },
  small: {
    paddingBottom: "4px",
    paddingTop: "4px",
  },

  wrapper: {
    //
    alignItems: "stretch",
    boxSizing: "border-box",
    cursor: "default",
    display: "flex",
    flexBasis: 0,
    flexDirection: "row",
    flexGrow: 1,
    height: "30px",
    justifyContent: "center",
    paddingTop: "6px",
  },
});

const dateFormatter = "l F d, Y";
const n = fbt.c("Select Date");
const o = fbt.c("Previous Day");
const p = fbt.c("Next Day");
const q = fbt.c("One week earlier");
const r = fbt.c("One week later");
const s = fbt.c("End of the previous month");
const t = fbt.c("End of the month");
const u = fbt.c("One month previous");
const v = fbt.c("One month ahead");
const w = fbt.c("highlighted");

export const CometFormCalendarDay = memo(
  forwardRef((props, ref) => {
    const {
      date,
      disabled,
      focusable = false,
      hidden = false,
      highlighted = false,
      moveDayCursorBy,
      onClick,
      onFocus,
      onMouseEnter,
      placeholder = false,
      selected,
      size = "small",
    } = props;

    let isToday = useMemo(() => {
      let currentDate = new Date();
      return (
        currentDate.getFullYear() === date.getYear() &&
        currentDate.getMonth() === date.getMonth() &&
        currentDate.getDate() === date.getDate()
      );
    }, [date]);

    const formattedDate = date.format(dateFormatter);

    return (
      <div className={stylex(styles.wrapper)}>
        <CometComponentWithKeyCommands
          commandConfigs={[
            {
              command: {
                key: CometKeys.ENTER,
              },
              description: n,
              handler: function () {
                return onClick && onClick();
              },
            },
            {
              command: {
                key: CometKeys.SPACE,
              },
              description: n,
              handler: function () {
                return onClick && onClick();
              },
            },
            {
              command: {
                key: CometKeys.LEFT,
              },
              description: o,
              handler: function () {
                return moveDayCursorBy(-1);
              },
            },
            {
              command: {
                key: CometKeys.RIGHT,
              },
              description: p,
              handler: function () {
                return moveDayCursorBy(1);
              },
            },
            {
              command: {
                key: CometKeys.UP,
              },
              description: q,
              handler: function () {
                return moveDayCursorBy(-7);
              },
            },
            {
              command: {
                key: CometKeys.DOWN,
              },
              description: r,
              handler: function () {
                return moveDayCursorBy(7);
              },
            },
            {
              command: {
                key: CometKeys.HOME,
              },
              description: s,
              handler: function () {
                return moveDayCursorBy(
                  -((date.getDayOfWeekFromMonday() + 1) % 7)
                );
              },
            },
            {
              command: {
                key: CometKeys.END,
              },
              description: t,
              handler: function () {
                return moveDayCursorBy(
                  6 - ((date.getDayOfWeekFromMonday() + 1) % 7)
                );
              },
            },
            {
              command: {
                key: CometKeys.PAGE_UP,
              },
              description: u,
              handler: function () {
                return moveDayCursorBy(-date.getNumDaysInPrevMonth());
              },
            },
            {
              command: {
                key: CometKeys.PAGE_UP,
                shift: !0,
              },
              description: u,
              handler: function () {
                return moveDayCursorBy(-date.getNumDaysInThisYear());
              },
            },
            {
              command: {
                alt: !0,
                key: CometKeys.PAGE_UP,
              },
              description: u,
              handler: function () {
                return moveDayCursorBy(-date.getNumDaysInThisYear());
              },
            },
            {
              command: {
                key: CometKeys.PAGE_DOWN,
              },
              description: v,
              handler: function () {
                return moveDayCursorBy(date.getNumDaysInThisMonth());
              },
            },
            {
              command: {
                key: CometKeys.PAGE_DOWN,
                shift: !0,
              },
              description: v,
              handler: function () {
                return moveDayCursorBy(date.getNumDaysInThisYear());
              },
            },
            {
              command: {
                alt: !0,
                key: CometKeys.PAGE_DOWN,
              },
              description: v,
              handler: function () {
                return moveDayCursorBy(date.getNumDaysInThisYear());
              },
            },
          ]}
          xstyle={styles.dayWrapper}
        >
          <CometPressable
            aria-current={isToday ? "date" : void 0}
            aria-selected={selected}
            disabled={disabled}
            focusable={focusable}
            onFocusIn={onFocus}
            onHoverIn={onMouseEnter}
            onPress={onClick}
            overlayDisabled
            ref={ref}
            role="gridcell"
            testid={void 0}
            xstyle={[
              styles.day,
              selected
                ? styles.selected
                : highlighted
                ? styles.highlighted
                : placeholder
                ? styles.placeholder
                : null,
              hidden && styles.hidden,
              disabled && styles.disabled,
              size === "large" && styles.large,
              size === "small" && styles.small,
            ]}
            children={({ focusVisible, hovered, pressed }) => {
              return (
                <>
                  <CometScreenReaderText text={formattedDate} />
                  {highlighted && <CometScreenReaderText text={w} />}
                  <span aria-hidden={true}>
                    <TetraText
                      color={
                        selected
                          ? "white"
                          : disabled
                          ? "disabled"
                          : placeholder
                          ? "secondary"
                          : "primary"
                      }
                      type={isToday ? "headlineEmphasized4" : "body3"}
                    >
                      {date.getDate().toString()}
                    </TetraText>
                  </span>
                  <CometPressableOverlay
                    focusVisible={focusVisible}
                    hovered={hovered}
                    pressed={pressed}
                    radius={6}
                  />
                </>
              );
            }}
          />
        </CometComponentWithKeyCommands>
      </div>
    );
  })
);
