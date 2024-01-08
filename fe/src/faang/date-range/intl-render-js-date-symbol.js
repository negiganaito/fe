/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { unrecoverableViolation } from "@/faang/error";

import { DateStrings } from "./date-strings";
import { padNumber } from "./pad-number";

// eslint-disable-next-line max-params, complexity
export function intlRenderJSDateSymbol(a, b, e, f, g) {
  g === void 0 && (g = 0);
  e = e.skipSuffixLocalization === !0;
  // eslint-disable-next-line no-self-assign
  g = g;
  let h = "";
  switch (b) {
    case "\\":
      g++;
      if (!f)
        throw unrecoverableViolation(
          "Only deprecated calls to `intlRenderJSDateSymbol()` use `localizedJSFormat`.",
          "internationalization"
        );
      h = f.charAt(g);
      break;
    case "d":
      h = padNumber(a.dateDay, 2);
      break;
    case "j":
      h = a.dateDay;
      break;
    case "S":
      h = DateStrings.getOrdinalSuffix(a.dateDay);
      break;
    case "D":
      h = DateStrings.getWeekdayNameShort(a.dateDayOfWeek);
      break;
    case "l":
      h = DateStrings.getWeekdayName(a.dateDayOfWeek);
      break;
    case "F":
    case "f":
      h = DateStrings.getMonthName(a.dateMonth + 1);
      break;
    case "M":
      h = DateStrings.getMonthNameShort(a.dateMonth + 1);
      break;
    case "m":
      h = padNumber(a.dateMonth + 1, 2);
      break;
    case "n":
      h = a.dateMonth + 1;
      break;
    case "Y":
      h = a.dateYear;
      break;
    case "y":
      h = String(a.dateYear).slice(2);
      break;
    case "a":
      e
        ? (h = a.dateHours < 12 ? "am" : "pm")
        : (h = DateStrings.get12HourClockSuffix(a.dateHours));
      break;
    case "A":
      e
        ? (h = a.dateHours < 12 ? "AM" : "PM")
        : (h = DateStrings.getUppercase12HourClockSuffix(a.dateHours));
      break;
    case "g":
      a.dateHours === 0 || a.dateHours === 12
        ? (h = "12")
        : (h = a.dateHours % 12);
      break;
    case "G":
      h = a.dateHours;
      break;
    case "h":
      a.dateHours === 0 || a.dateHours === 12
        ? (h = "12")
        : (h = padNumber(a.dateHours % 12, 2));
      break;
    case "H":
      h = padNumber(a.dateHours, 2);
      break;
    case "i":
      h = padNumber(a.dateMinutes, 2);
      break;
    case "s":
      h = padNumber(a.dateSeconds, 2);
      break;
    case "X":
      h = padNumber(a.dateMilliseconds, 3);
      break;
    default:
      h = b;
  }
  return {
    idx: g,
    rendered: String(h),
  };
}
