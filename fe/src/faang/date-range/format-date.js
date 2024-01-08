/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { DateFormatConfig } from "@/faang/abstract-calendar";
import { FBLogger, unrecoverableViolation } from "@/faang/error";

import { CLDRDateFormatConfig } from "./CLDRDateFormatConfig";
import { getCLDRLocalizedFormat } from "./getCLDRLocalizedFormat";
import { intlGetDateNumerics } from "./intl-get-date-numerics";
import { intlRenderCLDRDate } from "./intl-render-cldr-date";
import { intlRenderJSDateSymbol } from "./intl-render-js-date-symbol";
import { IsInternsite } from "./is-intern-site";

const a = Object.freeze({
  today: null,
  yesterday: null,
  thisWeek: null,
  thisMonth: null,
  thisYear: null,
  withinDay: null,
  withinWeek: null,
  withinMonth: null,
  withinYear: null,
  older: null,
  future: null,
  allOtherTimes: null,
});

export function formatDate(a, b, d) {
  // eslint-disable-next-line no-self-assign
  a = a;
  d = d || {
    skipSuffixLocalization: false,
    skipPatternLocalization: false,
    utc: false,
    formatInternal: false,
    throwCLDRError: false,
  };

  if (!b || b === "" || !a || !(a || a === 0)) {
    return "";
  }

  typeof a === "string" &&
    (isNaN(Number(a)) &&
      FBLogger("i18n-formatDate")
        .event("date_string_must_be_timestamp")
        .blameToPreviousFile()
        .mustfix(
          "The date passed to formatDate is a string, but not a timestamp. formatDate expects strings to be a string representation of a Unix " +
            ('timestamp but was passed "' + a + '"')
        ),
    (a = parseInt(a, 10)));

  typeof a === "number" && (a = new Date(a * 1e3));
  if (!(a instanceof Date))
    throw unrecoverableViolation(
      "The date passed to formatDate must be either a unix timestamp or JavaScript date object.",
      "internationalization"
    );
  if (isNaN(a.getTime()))
    throw unrecoverableViolation(
      "Invalid date passed to formatDate",
      "internationalization"
    );
  a.getTime() >= 1e15 &&
    FBLogger("i18n-formatDate")
      .event("date_too_far_in_future")
      .blameToPreviousFile()
      .info(
        "The date passed to formatDate is too far in the future. Did you mix up milliseconds/seconds?"
      );
  b = k(a, b);
  a = intlGetDateNumerics(a, d);
  return i(b, a, d);
}

formatDate.DEFAULT_FORMAT = "M j, Y g:i A";
formatDate.periodNames = Object.freeze(Object.keys(a));

function i(a, b, d) {
  let e = a;
  let f = !!d.skipPatternLocalization;
  let g = d.formatInternal === !0;
  if (!f && (g || !IsInternsite.is_intern_site))
    if (a in CLDRDateFormatConfig.supportedPHPFormatsKeys)
      try {
        f = CLDRDateFormatConfig.supportedPHPFormatsKeys[a];
        g = getCLDRLocalizedFormat(f);
        // m(a, f, g);
        return intlRenderCLDRDate(g, d, b);
      } catch (a) {
        FBLogger("i18n-formatDate")
          .event("CLDR_date_format_render_error")
          .blameToPreviousFile()
          .catching(a)
          .mustfix("CLDR date format render error");
        if (d.throwCLDRError === !0) throw a;
      }
    else if (DateFormatConfig.formats[a])
      // eslint-disable-next-line no-sequences
      e = DateFormatConfig.formats[a]; // , m(a);
    else if (!IsInternsite.is_intern_site)
      if (a.length !== 1)
        throw unrecoverableViolation(
          "Trying to localize an unsupported date format: `" + a + "`",
          "internationalization"
        );
  return j(e, d, b);
}

function j(a, b, d) {
  let e = [];
  for (let f = 0; f < a.length; f++) {
    let g = a.charAt(f);
    g = intlRenderJSDateSymbol(d, g, b, a, f);
    e.push(g.rendered);
    f = g.idx;
  }
  return e.join("");
}

function k(a, b) {
  let d = formatDate.DEFAULT_FORMAT;
  if (typeof b === "string") return b;
  else if (typeof b === "object") {
    let e = a.getTime();
    for (
      // eslint-disable-next-line no-inner-declarations, no-var
      var f = l(),
        g = Array.isArray(f),
        i = 0,
        f = g
          ? f
          : f[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();
      ;

    ) {
      // eslint-disable-next-line no-inner-declarations, no-var
      var j;
      if (g) {
        if (i >= f.length) break;
        j = f[i++];
      } else {
        i = f.next();
        if (i.done) break;
        j = i.value;
      }
      // eslint-disable-next-line no-self-assign
      j = j;
      let k = b[j.name];
      if (k && j.start <= e && e < j.end) {
        return k;
      }
    }
    FBLogger("i18n-formatDate")
      .event("matching_period_format_not_found")
      .blameToPreviousFile()
      .warn(
        'Matching period not found for date "%s", using default format "%s". Current timestamp: "%s"',
        e,
        d,
        Date.now()
      );
    return d;
  } else {
    FBLogger("i18n-formatDate")
      .event("invalid_format_argument")
      .blameToPreviousFile()
      .warn(
        'Called with invalid format "%s" (type: %s) for date "%s", using default: %s',
        b,
        typeof b,
        a.getTime(),
        d
      );
    return d;
  }
}

function l() {
  let a = new Date();
  let b = a.getTime();
  let d = a.getFullYear();
  let e = a.getMonth();
  let f = new Date(d, a.getMonth() + 1, 0).getDate();
  let g = new Date(d, 1, 29).getMonth() === 1 ? 366 : 365;
  let h = 1e3 * 60 * 60 * 24;
  let i = new Date(a.setHours(0, 0, 0, 0));
  let j = new Date(d, e, i.getDate() + 1);
  a = a.getDate() - ((a.getDay() - DateFormatConfig.weekStart + 6) % 7);
  let k = new Date(b).setDate(a);
  a = new Date(b).setDate(a + 7);
  let l = new Date(d, e, 1);
  e = new Date(d, e, f + 1);
  let m = new Date(d, 0, 1);
  d = new Date(d + 1, 0, 1);
  return [
    {
      name: "today",
      start: i.getTime(),
      end: j.getTime(),
    },
    {
      name: "withinDay",
      start: b - h,
      end: b + h,
    },
    {
      name: "yesterday",
      start: i.getTime() - h,
      end: i.getTime() - 1,
    },
    {
      name: "thisWeek",
      start: k,
      end: a,
    },
    {
      name: "withinWeek",
      start: b - h * 7,
      end: b + h * 7,
    },
    {
      name: "thisMonth",
      start: l.getTime(),
      end: e.getTime(),
    },
    {
      name: "withinMonth",
      start: b - h * f,
      end: b + h * f,
    },
    {
      name: "thisYear",
      start: m.getTime(),
      end: d.getTime(),
    },
    {
      name: "withinYear",
      start: b - h * g,
      end: b + h * g,
    },
    {
      name: "older",
      start: -Infinity,
      end: b,
    },
    {
      name: "future",
      start: b,
      end: Number(Infinity),
    },
    {
      name: "allOtherTimes",
      start: -Infinity,
      end: Number(Infinity),
    },
  ];
}

// function m(a, b, d) {
//   b === void 0 && (b = null),
//     d === void 0 && (d = null),
//     Random.random() <
//       CLDRDateRenderingClientRollout.formatDateClientLoggerSamplingRate &&
//       IntlDateStringsTypedLoggerLite.log({
//         datetime_format: a,
//         logged_from_client: !0,
//         cldr_key: b,
//         cldr_value: d,
//       });
// }
