/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useCallback, useEffect, useRef } from "react";
import stylex from "@stylexjs/stylex";

import { DateFormatConfig } from "@/faang/abstract-calendar";
import { FocusManager } from "@/faang/focus-region";

import { CometFormCalendarDay } from "./comet-form-calendar-day";
import { CometLocalDate } from "./comet-local-date";

const daysInWeek = 7;

const styles = stylex.create({
  dummy: {
    cursor: "pointer",
    display: "flex",
    height: "30px",
  },
});

export const CometFormCalendarBase = (props) => {
  const {
    constraints = [],
    date,
    moveDayCursorBy,
    hideAdjacentMonthDates = false,
    highlightedDates,
    onMouseEnter,
    onSelected,
    selectedDates,
    onFocus,
    focusDate,
  } = props;

  const dateToElementMap = useRef(new Map());
  const highlightedDateSet = new Set(
    highlightedDates.map((highlightDate) => {
      return highlightDate.getHash();
    })
  );

  const selectedDateSet = new Set(
    selectedDates.map((selectedDate) => {
      return selectedDate.getHash();
    })
  );

  const updateDateToElementMap = useCallback((d) => {
    return function (element) {
      dateToElementMap.current.set(d.getHash(), element);
    };
  }, []);

  const focusDateHash = focusDate ? focusDate.getHash() : null;

  const previousFocusDateHash = useRef(focusDateHash);
  const animationFrameIdRef = useRef(null);

  useEffect(() => {
    if (previousFocusDateHash.current !== focusDateHash && focusDateHash) {
      animationFrameIdRef.current = window.requestAnimationFrame(() => {
        let element = dateToElementMap.current.get(focusDateHash);
        element && FocusManager.focusElement(element);
      });
      return function () {
        animationFrameIdRef.current &&
          window.cancelAnimationFrame(animationFrameIdRef.current);
      };
    }
    previousFocusDateHash.current = focusDateHash;
  }, [focusDateHash]);

  const daysInMonth = date.getNumDaysInThisMonth();
  let firstDayOfMonth = new Date(date.getYear(), date.getMonth(), 1).getDay();
  let lastDayOfMonth = new Date(
    date.getYear(),
    date.getMonth(),
    daysInMonth
  ).getDay();
  firstDayOfMonth =
    (firstDayOfMonth + 6 - DateFormatConfig.weekStart) % daysInWeek;
  lastDayOfMonth =
    (daysInWeek - lastDayOfMonth + DateFormatConfig.weekStart) % daysInWeek;

  let calendarRows = [];
  for (
    let day = 1 - firstDayOfMonth;
    day <= daysInMonth + lastDayOfMonth;
    day++
  ) {
    let dayOfWeek = (day - 1 + firstDayOfMonth) % daysInWeek;
    dayOfWeek === 0 && calendarRows.push([]);
    calendarRows[calendarRows.length - 1].push(
      new CometLocalDate(date.getYear(), date.getMonth(), day)
    );
  }

  return calendarRows.map((row) => {
    return (
      <div key={row[0].getHash()} className={stylex(styles.dummy)} role="row">
        {row.map((_date) => {
          let isDifferentMonth = _date.getMonth() !== date.getMonth();
          let isDisabled = !constraints.every((constraint) => {
            return constraint(_date);
          });

          return (
            <CometFormCalendarDay
              key={_date.getHash()}
              date={_date}
              disabled={isDisabled}
              focusable={_date.getHash() === focusDateHash}
              hidden={isDifferentMonth && hideAdjacentMonthDates}
              highlighted={highlightedDateSet.has(_date.getHash())}
              moveDayCursorBy={moveDayCursorBy}
              onClick={() => {
                return onSelected(_date);
              }}
              onFocus={() => {
                return onFocus && onFocus(_date);
              }}
              onMouseEnter={() => {
                return onMouseEnter && onMouseEnter(_date);
              }}
              placeholder={isDifferentMonth}
              ref={updateDateToElementMap(_date)}
              selected={selectedDateSet.has(_date.getHash())}
            />
          );
        })}
      </div>
    );
  });
};
