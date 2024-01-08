/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import fbt from "fbt";

let i;
let j;
let k;
let l;
let m;
let n;
let o;
let p;
let q;
function a(a) {
  n ||
    (n = [
      fbt.c("Sunday"),
      fbt.c("Monday"),
      fbt.c("Tuesday"),
      fbt.c("Wednesday"),
      fbt.c("Thursday"),
      fbt.c("Friday"),
      fbt.c("Saturday"),
    ]);
  return n[a];
}
function b(a) {
  p ||
    (p = [
      fbt.c("SUNDAY"),
      fbt.c("MONDAY"),
      fbt.c("TUESDAY"),
      fbt.c("WEDNESDAY"),
      fbt.c("THURSDAY"),
      fbt.c("FRIDAY"),
      fbt.c("SATURDAY"),
    ]);
  return p[a];
}
function c(a) {
  o ||
    (o = [
      fbt.c("Sun"),
      fbt.c("Mon"),
      fbt.c("Tue"),
      fbt.c("Wed"),
      fbt.c("Thu"),
      fbt.c("Fri"),
      fbt.c("Sat"),
    ]);
  return o[a];
}
function d(a) {
  q ||
    (q = [
      fbt.c("SUN"),
      fbt.c("MON"),
      fbt.c("TUE"),
      fbt.c("WED"),
      fbt.c("THU"),
      fbt.c("FRI"),
      fbt.c("SAT"),
    ]);
  return q[a];
}
function r() {
  i = [
    fbt.c("January"),
    fbt.c("February"),
    fbt.c("March"),
    fbt.c("April"),
    fbt.c("May"),
    fbt.c("June"),
    fbt.c("July"),
    fbt.c("August"),
    fbt.c("September"),
    fbt.c("October"),
    fbt.c("November"),
    fbt.c("December"),
  ];
}
function e(a) {
  i || r();
  return i[a - 1];
}
function f() {
  i || r();
  return i.slice();
}
function s(a) {
  l ||
    (l = [
      fbt.c("JANUARY"),
      fbt.c("FEBRUARY"),
      fbt.c("MARCH"),
      fbt.c("APRIL"),
      fbt.c("MAY"),
      fbt.c("JUNE"),
      fbt.c("JULY"),
      fbt.c("AUGUST"),
      fbt.c("SEPTEMBER"),
      fbt.c("OCTOBER"),
      fbt.c("NOVEMBER"),
      fbt.c("DECEMBER"),
    ]);
  return l[a - 1];
}
function t(a) {
  j ||
    (j = [
      fbt.c("Jan"),
      fbt.c("Feb"),
      fbt.c("Mar"),
      fbt.c("Apr"),
      fbt.c("May"),
      fbt.c("Jun"),
      fbt.c("Jul"),
      fbt.c("Aug"),
      fbt.c("Sep"),
      fbt.c("Oct"),
      fbt.c("Nov"),
      fbt.c("Dec"),
    ]);
  return j[a - 1];
}
function u(a) {
  k ||
    (k = [
      fbt.c("JAN"),
      fbt.c("FEB"),
      fbt.c("MAR"),
      fbt.c("APR"),
      fbt.c("MAY"),
      fbt.c("JUN"),
      fbt.c("JUL"),
      fbt.c("AUG"),
      fbt.c("SEP"),
      fbt.c("OCT"),
      fbt.c("NOV"),
      fbt.c("DEC"),
    ]);
  return k[a - 1];
}
function v(a) {
  m ||
    (m = [
      "",
      fbt.c("st"),
      fbt.c("nd"),
      fbt.c("rd"),
      fbt.c("th"),
      fbt.c("th"),
      fbt.c("th"),
      fbt.c("th"),
      fbt.c("th"),
      fbt.c("th"),
      fbt.c("th"),
      fbt.c("th"),
      fbt.c("th"),
      fbt.c("th"),
      fbt.c("th"),
      fbt.c("th"),
      fbt.c("th"),
      fbt.c("th"),
      fbt.c("th"),
      fbt.c("th"),
      fbt.c("th"),
      fbt.c("st"),
      fbt.c("nd"),
      fbt.c("rd"),
      fbt.c("th"),
      fbt.c("th"),
      fbt.c("th"),
      fbt.c("th"),
      fbt.c("th"),
      fbt.c("th"),
      fbt.c("th"),
      fbt.c("st"),
    ]);
  return m[a];
}
// eslint-disable-next-line complexity
function w(a) {
  switch (a) {
    case 1:
      return fbt.c("1st");
    case 2:
      return fbt.c("2nd");
    case 3:
      return fbt.c("3rd");
    case 4:
      return fbt.c("4th");
    case 5:
      return fbt.c("5th");
    case 6:
      return fbt.c("6th");
    case 7:
      return fbt.c("7th");
    case 8:
      return fbt.c("8th");
    case 9:
      return fbt.c("9th");
    case 10:
      return fbt.c("10th");
    case 11:
      return fbt.c("11th");
    case 12:
      return fbt.c("12th");
    case 13:
      return fbt.c("13th");
    case 14:
      return fbt.c("14th");
    case 15:
      return fbt.c("15th");
    case 16:
      return fbt.c("16th");
    case 17:
      return fbt.c("17th");
    case 18:
      return fbt.c("18th");
    case 19:
      return fbt.c("19th");
    case 20:
      return fbt.c("20th");
    case 21:
      return fbt.c("21st");
    case 22:
      return fbt.c("22nd");
    case 23:
      return fbt.c("23rd");
    case 24:
      return fbt.c("24th");
    case 25:
      return fbt.c("25th");
    case 26:
      return fbt.c("26th");
    case 27:
      return fbt.c("27th");
    case 28:
      return fbt.c("28th");
    case 29:
      return fbt.c("29th");
    case 30:
      return fbt.c("30th");
    case 31:
      return fbt.c("31st");
    default:
      throw new Error("Invalid day of month.");
  }
}
function x() {
  return fbt.c("Day:");
}
function y() {
  return fbt.c("Month:");
}
function z() {
  return fbt.c("Year:");
}
function A() {
  return fbt.c("Hour:");
}
function B() {
  return fbt.c("Minute:");
}
function C() {
  return fbt.c("dd");
}
function D() {
  return fbt.c("mm");
}
function E() {
  return fbt.c("yyyy");
}
function F() {
  return fbt.c("h");
}
function G() {
  return fbt.c("m");
}
function H(a) {
  return a < 12 ? fbt.c("am") : fbt.c("pm");
}
function I(a) {
  return a < 12 ? fbt.c("AM") : fbt.c("PM");
}

export const DateStrings = {
  getWeekdayName: a,
  getUppercaseWeekdayName: b,
  getWeekdayNameShort: c,
  getUppercaseWeekdayNameShort: d,
  _initializeMonthNames: r,
  getMonthName: e,
  getMonthNames: f,
  getUppercaseMonthName: s,
  getMonthNameShort: t,
  getUppercaseMonthNameShort: u,
  getOrdinalSuffix: v,
  getDayOfMonth: w,
  getDayLabel: x,
  getMonthLabel: y,
  getYearLabel: z,
  getHourLabel: A,
  getMinuteLabel: B,
  getDayPlaceholder: C,
  getMonthPlaceholder: D,
  getYearPlaceholder: E,
  getHourPlaceholder: F,
  getMinutePlaceholder: G,
  get12HourClockSuffix: H,
  getUppercase12HourClockSuffix: I,
};
