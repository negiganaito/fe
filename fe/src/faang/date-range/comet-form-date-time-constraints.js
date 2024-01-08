/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { CometLocalDate } from "./comet-local-date";

function beforeDate(a, b) {
  b === void 0 && (b = !1);
  return function (c) {
    return b ? c.compareTo(a) <= 0 : c.compareTo(a) < 0;
  };
}
function afterDate(a, b) {
  b === void 0 && (b = !1);
  return function (c) {
    return b ? c.compareTo(a) >= 0 : c.compareTo(a) > 0;
  };
}
function beforeTime(a, b) {
  b === void 0 && (b = !1);
  return function (c) {
    return b ? c <= a : c < a;
  };
}
function afterTime(a, b) {
  b === void 0 && (b = !1);
  return function (c) {
    return b ? c >= a : c > a;
  };
}
function beforeDateTime(a, b) {
  b === void 0 && (b = !1);
  return function (d) {
    if (d instanceof Date) return b ? d <= a : d < a;
    else if (d instanceof CometLocalDate) {
      let e = CometLocalDate.fromDate(a);
      let f = b || !m(a);
      return beforeDate(e, f)(d);
    } else return !0;
  };
}
function afterDateTime(a, b) {
  b === void 0 && (b = !1);
  return function (d) {
    if (d instanceof Date) return b ? d >= a : d > a;
    else if (d instanceof CometLocalDate) {
      let e = CometLocalDate.fromDate(a);
      let f = b || !n(a);
      return afterDate(e, f)(d);
    } else return !0;
  };
}
function dateInThePast(a) {
  a === void 0 && (a = !1);
  return function (b) {
    return beforeDate(CometLocalDate.fromDate(), a)(b);
  };
}
function dateInTheFuture(a) {
  a === void 0 && (a = !1);
  return function (b) {
    return afterDate(CometLocalDate.fromDate(), a)(b);
  };
}
function dateTimeInThePast() {
  return function (a) {
    if (a instanceof Date) return a < new Date();
    else if (a instanceof CometLocalDate) return dateInThePast(!0)(a);
    else return !0;
  };
}
function dateTimeInTheFuture() {
  return function (a) {
    if (a instanceof Date) return a > new Date();
    else if (a instanceof CometLocalDate) return dateInTheFuture(!0)(a);
    else return !0;
  };
}
function m(a) {
  return a.getHours() === 0 && a.getMinutes() === 0 && a.getSeconds() === 0;
}
function n(a) {
  return a.getHours() === 23 && a.getMinutes() === 59 && a.getSeconds() === 59;
}

export const CometFormDateTimeConstraints = {
  beforeDate,
  afterDate,
  beforeTime,
  afterTime,
  beforeDateTime,
  afterDateTime,
  dateInThePast,
  dateInTheFuture,
  dateTimeInThePast,
  dateTimeInTheFuture,
};
