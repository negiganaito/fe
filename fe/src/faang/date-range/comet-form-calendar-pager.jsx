/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { forwardRef, useCallback, useState } from "react";
import stylex from "@stylexjs/stylex";
import Locale from "fbjs/lib/Locale";
import fbt from "fbt";

import { CometAccessibilityAnnouncement } from "../common/comet-accessibility-announcement";
import { FocusWithinHandler } from "../focus";
import { CometIcon, fbicon } from "../icon";
import { ix, testID } from "../utils";

import { CometFormCalendarBase } from "./comet-form-calendar-base";
import { CometFormCalendarMonthLabel } from "./comet-form-calendar-month-label";
import { CometFormCalendarWeekLabel } from "./comet-form-calendar-week-label";
import { CometLocalDate } from "./comet-local-date";
/*
__d("CometFormCalendarPager.react", ["fbt", "ix", "CometAccessibilityAnnouncement.react", "CometFormCalendarBase.react", "CometFormCalendarMonthLabel.react", "CometFormCalendarWeekLabel.react", "CometIcon.react", "CometLocalDate", "FocusWithinHandler.react", "Locale", "fbicon", "react", "testID"], (function(a, b, c, d, e, f, g, h, i) {
*/

const isRTL = Locale.isRTL();

const styles = stylex.create({
  d1: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px",
    marginRight: "8px",
    marginLeft: "8px",
    marginTop: "8px",
  },

  d2: {
    display: "flex",
    flexDirection: "column",
    outline: "none",
  },

  weekLabelWrapper: {
    alignItems: "center",
    display: "flex",
    height: "30px",
  },

  weekLabel: {
    borderBottomColor: "var(--divider)",
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    marginBottom: 0,
    paddingBottom: "8px",
    textAlign: "center",
    width: "calc(100% / 7)",
  },
});

export const CometFormCalendarPager = forwardRef((props, ref) => {
  const {
    constraints,
    highlightedDates = [],
    initialCalendarDate = CometLocalDate.fromDate(),
    onSelected,
    onMouseEnter,
    selectedDates = [],
  } = props;

  const [currentDate, setCurrentDate] = useState(
    selectedDates[0] ?? initialCalendarDate
  );

  const [focusDate, setFocusDate] = useState(null);

  const handleMoveDayCursor = useCallback(
    (days) => {
      if (focusDate) {
        let newDate = focusDate.getWithDaysAdded(days);
        (!constraints ||
          constraints.every((constraint) => {
            return constraint(newDate);
          })) &&
          (setFocusDate(newDate), setCurrentDate(newDate));
      }
    },
    [constraints, focusDate]
  );

  const handlePrevMonth = useCallback(() => {
    setCurrentDate(
      new CometLocalDate(currentDate.getYear(), currentDate.getMonth() - 1, 1)
    );
  }, [currentDate]);

  let handleNextMonth = useCallback(() => {
    setCurrentDate(
      new CometLocalDate(currentDate.getYear(), currentDate.getMonth() + 1, 1)
    );
  }, [currentDate]);

  const handleFocusWithin = useCallback(() => {
    setFocusDate(currentDate);
  }, [currentDate]);

  const handleBlurWithin = useCallback(() => {
    setFocusDate(null);
  }, []);

  return (
    <>
      <div
        className={stylex(styles.d1)}
        {...testID("CometFormCalendarPagerTitle")}
      >
        <CometIcon
          aria-label={fbt.c("Previous Month")}
          color="secondary"
          focusable
          icon={isRTL ? fbicon._(ix(477912), 16) : fbicon._(ix(477899), 16)}
          onPress={handlePrevMonth}
          testid={undefined}
        />
        <CometAccessibilityAnnouncement isVisible role="status">
          <CometFormCalendarMonthLabel date={currentDate} />
        </CometAccessibilityAnnouncement>
        <CometIcon
          aria-label={fbt.c("Next Month")}
          color="secondary"
          focusable
          icon={isRTL ? fbicon._(ix(477899), 16) : fbicon._(ix(477912), 16)}
          onPress={handleNextMonth}
          testid={undefined}
        />
      </div>
      <FocusWithinHandler
        onBlurWithin={handleBlurWithin}
        onFocusWithin={handleFocusWithin}
      >
        <div
          {...testID("CometFormCalendarPager")}
          aria-label={fbt.c("Choose Date")}
          className={stylex(styles.d2)}
          ref={ref}
          role="grid"
          tabIndex={!focusDate ? 0 : -1}
        >
          <div className={stylex(styles.weekLabelWrapper)}>
            <CometFormCalendarWeekLabel className={stylex(styles.weekLabel)} />
          </div>
          <CometFormCalendarBase
            constraints={constraints}
            date={currentDate}
            focusDate={focusDate}
            highlightedDates={highlightedDates}
            moveDayCursorBy={handleMoveDayCursor}
            onMouseEnter={onMouseEnter}
            onSelected={onSelected}
            selectedDates={selectedDates}
          />
        </div>
      </FocusWithinHandler>
    </>
  );
});
