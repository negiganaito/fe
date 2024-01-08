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
} from "@/faang/commet-key-commands";
import { CometScreenReaderText } from "@/faang/common";
import { CometPressable, CometPressableOverlay } from "@/faang/pressable";
import { TetraText } from "@/faang/tetra-text";

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
const selectDate = fbt.c("Select Date");
const previousDay = fbt.c("Previous Day");
const nextDay = fbt.c("Next Day");
const owe = fbt.c("One week earlier");
const owl = fbt.c("One week later");
const enterPreviousMonth = fbt.c("End of the previous month");
const endMonth = fbt.c("End of the month");
const omp = fbt.c("One month previous");
const oma = fbt.c("One month ahead");
const highlightedText = fbt.c("highlighted");

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
              description: selectDate,
              handler: () => {
                return onClick && onClick();
              },
            },
            {
              command: {
                key: CometKeys.SPACE,
              },
              description: selectDate,
              handler: () => {
                return onClick && onClick();
              },
            },
            {
              command: {
                key: CometKeys.LEFT,
              },
              description: previousDay,
              handler: () => {
                return moveDayCursorBy(-1);
              },
            },
            {
              command: {
                key: CometKeys.RIGHT,
              },
              description: nextDay,
              handler: () => {
                return moveDayCursorBy(1);
              },
            },
            {
              command: {
                key: CometKeys.UP,
              },
              description: owe,
              handler: () => {
                return moveDayCursorBy(-7);
              },
            },
            {
              command: {
                key: CometKeys.DOWN,
              },
              description: owl,
              handler: () => {
                return moveDayCursorBy(7);
              },
            },
            {
              command: {
                key: CometKeys.HOME,
              },
              description: enterPreviousMonth,
              handler: () => {
                return moveDayCursorBy(
                  -((date.getDayOfWeekFromMonday() + 1) % 7)
                );
              },
            },
            {
              command: {
                key: CometKeys.END,
              },
              description: endMonth,
              handler: () => {
                return moveDayCursorBy(
                  6 - ((date.getDayOfWeekFromMonday() + 1) % 7)
                );
              },
            },
            {
              command: {
                key: CometKeys.PAGE_UP,
              },
              description: omp,
              handler: () => {
                return moveDayCursorBy(-date.getNumDaysInPrevMonth());
              },
            },
            {
              command: {
                key: CometKeys.PAGE_UP,
                shift: true,
              },
              description: omp,
              handler: () => {
                return moveDayCursorBy(-date.getNumDaysInThisYear());
              },
            },
            {
              command: {
                alt: true,
                key: CometKeys.PAGE_UP,
              },
              description: omp,
              handler: () => {
                return moveDayCursorBy(-date.getNumDaysInThisYear());
              },
            },
            {
              command: {
                key: CometKeys.PAGE_DOWN,
              },
              description: oma,
              handler: () => {
                return moveDayCursorBy(date.getNumDaysInThisMonth());
              },
            },
            {
              command: {
                key: CometKeys.PAGE_DOWN,
                shift: true,
              },
              description: oma,
              handler: () => {
                return moveDayCursorBy(date.getNumDaysInThisYear());
              },
            },
            {
              command: {
                alt: true,
                key: CometKeys.PAGE_DOWN,
              },
              description: oma,
              handler: () => {
                return moveDayCursorBy(date.getNumDaysInThisYear());
              },
            },
          ]}
          xstyle={styles.dayWrapper}
        >
          <CometPressable
            aria-current={isToday ? "date" : undefined}
            aria-selected={selected}
            disabled={disabled}
            focusable={focusable}
            onFocusIn={onFocus}
            onHoverIn={onMouseEnter}
            onPress={onClick}
            overlayDisabled
            ref={ref}
            role="gridcell"
            testid={undefined}
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
                  {highlighted && (
                    <CometScreenReaderText text={highlightedText} />
                  )}
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
