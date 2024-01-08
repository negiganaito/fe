/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { DateFormatConfig } from "@/faang/abstract-calendar";

import { CometLocalDate } from "./comet-local-date";

// function parseStringToDate(a) {
//   if (!a) return null;
//   let b = a.split(/[^0-9]+/).filter(Boolean);
//   if (b.length === 3) {
//     // eslint-disable-next-line no-inner-declarations, no-var
//     var d = Number(b[DateFormatConfig.numericDateOrder.indexOf("y")]);
//     let e = Number(b[DateFormatConfig.numericDateOrder.indexOf("m")]);
//     b = Number(b[DateFormatConfig.numericDateOrder.indexOf("d")]);
//     return new CometLocalDate(d, e - 1, b);
//   }
//   d = Date.parse(a);
//   return !isNaN(d) ? CometLocalDate.fromDate(new Date(d)) : null;
// }

/**
 * Parses a date string and returns a CometLocalDate object.
 *
 * @param {string} dateString - The date string to parse.
 * @returns {CometLocalDate|null} - The parsed CometLocalDate object or null if parsing fails.
 */
function parseStringToDate(dateString) {
  if (!dateString) {
    return null;
  }

  const dateParts = dateString.split(/[^0-9]+/).filter(Boolean);

  if (dateParts.length === 3) {
    const year = Number(
      dateParts[DateFormatConfig.numericDateOrder.indexOf("y")]
    );
    const month =
      Number(dateParts[DateFormatConfig.numericDateOrder.indexOf("m")]) - 1;
    const day = Number(
      dateParts[DateFormatConfig.numericDateOrder.indexOf("d")]
    );

    return new CometLocalDate(year, month, day);
  }

  const timestamp = Date.parse(dateString);

  return !isNaN(timestamp)
    ? CometLocalDate.fromDate(new Date(timestamp))
    : null;
}

export const CometFormDateInputUtils = {
  parseStringToDate,
};
