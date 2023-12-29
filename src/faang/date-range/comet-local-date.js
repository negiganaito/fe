/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { DateConsts } from "../timezone";

import { formatDate } from "./format-date";

const h = 1e3;

export class CometLocalDate {
  constructor(year, month, date) {
    // const validatedMonth = Math.max(0, Math.min(11, month)); // Ensure month is within the valid range
    // const lastDayOfMonth = new Date(year, validatedMonth + 1, 0).getDate();
    // const validatedDate = Math.max(1, Math.min(lastDayOfMonth, date)); // Ensure date is within the valid range for the given month

    // this.year = year;
    // this.month = validatedMonth;
    // this.date = validatedDate;

    const _date = new Date(year, month, date);

    this.year = _date.getFullYear();
    this.month = _date.getMonth();
    this.date = _date.getDate();
  }

  static fromDate = function (date = new Date()) {
    return new CometLocalDate(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
  };

  static fromTimestamp = function (a) {
    return this.fromDate(new Date(a * h));
  };

  static fromFacebookBirthdayString = function (b) {
    b = b.split("/").map(Number);
    let c = b[0];
    let d = b[1];
    b = b[2];
    return this.fromYearMonthDay(b, c, d);
  };

  static fromInstagramBirthdayString = function (b) {
    b = b.split("-").map(Number);
    let c = b[0];
    let d = b[1];
    b = b[2];
    return this.fromYearMonthDay(c, d, b);
  };

  static fromYearMonthDay = function (b, c, d) {
    c = c - 1;
    return new CometLocalDate(b, c, d);
  };

  static fromISOString = function (b) {
    // eslint-disable-next-line no-cond-assign
    b = (b = /^(\d+)-(\d+)-(\d+)/.exec(b)) ? b : [];
    b[0];
    let c = b[1];
    let d = b[2];
    b = b[3];
    return new CometLocalDate(Number(c), Number(d) - 1, Number(b));
  };

  getYear = function () {
    return this.year;
  };

  getMonth = function () {
    return this.month;
  };

  getDate = function () {
    return this.date;
  };

  getDayOfWeekFromMonday = function () {
    return (
      (this.getJSDate().getDay() - 1 + DateConsts.DAYS_PER_WEEK) %
      DateConsts.DAYS_PER_WEEK
    );
  };

  getNumDaysInThisMonth = function () {
    return new Date(this.year, this.month + 1, 0).getDate();
  };

  getNumDaysInPrevMonth = function () {
    return new Date(this.year, this.month, 0).getDate();
  };

  getWithDaysAdded = function (b) {
    return new CometLocalDate(this.year, this.month, this.date + b);
  };

  getWithWeeksAdded = function (a) {
    return this.getWithDaysAdded(a * DateConsts.DAYS_PER_WEEK);
  };

  getWithMonthsAdded = function (b) {
    return new CometLocalDate(this.year, this.month + b, this.date);
  };

  getWithYearsAdded = function (b) {
    return new CometLocalDate(this.year + b, this.month, this.date);
  };

  getJSDate = function () {
    return new Date(this.year, this.month, this.date);
  };

  toUTCDate = function () {
    return new Date(Date.UTC(this.year, this.month, this.date));
  };

  format = function (a, b) {
    return formatDate(this.getJSDate(), a, b);
  };

  toISOString = function () {
    return this.format("Y-m-d", {
      skipPatternLocalization: !0,
    });
  };

  getHash = function () {
    return this.year * 372 + this.month * 31 + this.date;
  };

  getNumDaysInThisYear = function () {
    return this.isLeapYear() ? 366 : 365;
  };

  isLeapYear = function () {
    return (
      (this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0
    );
  };

  isValid = function () {
    return !isNaN(this.getJSDate().getTime());
  };

  isEqual = function (a) {
    return this.compareTo(a) === 0;
  };

  daysBetween = function (a) {
    a = a.getJSDate() - this.getJSDate();
    return Math.round(Math.abs(a / DateConsts.MS_PER_DAY));
  };

  compareTo = function (a) {
    let b = this.getJSDate();
    a = a.getJSDate();
    return b > a ? 1 : b < a ? -1 : 0;
  };
}
