/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

// let g = 1e3;
// let c = 60;
// let d = 60;
// let e = 24;
// let h = 7;
// let i = 12;
// let j = 1e3;
// let k = 30.43;
// let l = 4.333;
// let m = 365.242;
// let n = c * d;
// let o = n * e;
// let p = o * h;
// let q = o * m;
// let r = g * c;
// let s = r * d;
// let t = g * o;
// let u = t * h;
// let v = t * m;
// let w = {
//   SUNDAY: 0,
//   MONDAY: 1,
//   TUESDAY: 2,
//   WEDNESDAY: 3,
//   THURSDAY: 4,
//   FRIDAY: 5,
//   SATURDAY: 6,
// };
// Object.freeze(w);
// function a(a, b) {
//   return new Date(a, b, 0).getDate();
// }
// function b() {
//   return Date.now() / g;
// }
// let x = {
//   instantRange: {
//     since: -864e10,
//     until: 864e10 + 1,
//   },
// };

// export const DateConsts = {
//   MS_PER_SEC: g,
//   SEC_PER_MIN: c,
//   MIN_PER_HOUR: d,
//   HOUR_PER_DAY: e,
//   DAYS_PER_WEEK: h,
//   MONTHS_PER_YEAR: i,
//   US_PER_MS: j,
//   AVG_DAYS_PER_MONTH: k,
//   AVG_WEEKS_PER_MONTH: l,
//   AVG_DAYS_PER_YEAR: m,
//   SEC_PER_HOUR: n,
//   SEC_PER_DAY: o,
//   SEC_PER_WEEK: p,
//   SEC_PER_YEAR: q,
//   MS_PER_MIN: r,
//   MS_PER_HOUR: s,
//   MS_PER_DAY: t,
//   MS_PER_WEEK: u,
//   MS_PER_YEAR: v,
//   DAYS: w,
//   getDaysInMonth: a,
//   getCurrentTimeInSeconds: b,
//   private: x,
// };
// Time units
const MS_PER_SEC = 1e3;
const SEC_PER_MIN = 60;
const MIN_PER_HOUR = 60;
const HOUR_PER_DAY = 24;
const DAYS_PER_WEEK = 7;
const MONTHS_PER_YEAR = 12;
const US_PER_MS = 1e3;
const AVG_DAYS_PER_MONTH = 30.43;
const AVG_WEEKS_PER_MONTH = 4.333;
const AVG_DAYS_PER_YEAR = 365.242;

// Derived time values
const SEC_PER_HOUR = SEC_PER_MIN * MIN_PER_HOUR;
const SEC_PER_DAY = SEC_PER_HOUR * HOUR_PER_DAY;
const SEC_PER_WEEK = SEC_PER_DAY * DAYS_PER_WEEK;
const SEC_PER_YEAR = SEC_PER_DAY * AVG_DAYS_PER_YEAR;
const MS_PER_MIN = MS_PER_SEC * SEC_PER_MIN;
const MS_PER_HOUR = MS_PER_MIN * MIN_PER_HOUR;
const MS_PER_DAY = MS_PER_HOUR * HOUR_PER_DAY;
const MS_PER_WEEK = MS_PER_DAY * DAYS_PER_WEEK;
const MS_PER_YEAR = MS_PER_DAY * AVG_DAYS_PER_YEAR;

// Days of the week
const DAYS = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};
Object.freeze(DAYS);

// Function to get the number of days in a month
function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

// Function to get the current time in seconds
function getCurrentTimeInSeconds() {
  return Date.now() / MS_PER_SEC;
}

// Time range constants
const instantRange = {
  since: -864e10,
  until: 864e10 + 1,
};

export const DateConsts = {
  MS_PER_SEC,
  SEC_PER_MIN,
  MIN_PER_HOUR,
  HOUR_PER_DAY,
  DAYS_PER_WEEK,
  MONTHS_PER_YEAR,
  US_PER_MS,
  AVG_DAYS_PER_MONTH,
  AVG_WEEKS_PER_MONTH,
  AVG_DAYS_PER_YEAR,
  SEC_PER_HOUR,
  SEC_PER_DAY,
  SEC_PER_WEEK,
  SEC_PER_YEAR,
  MS_PER_MIN,
  MS_PER_HOUR,
  MS_PER_DAY,
  MS_PER_WEEK,
  MS_PER_YEAR,
  DAYS,
  getDaysInMonth,
  getCurrentTimeInSeconds,
  private: { instantRange },
};
