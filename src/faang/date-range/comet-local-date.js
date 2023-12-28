/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

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
}
