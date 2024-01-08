/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

export function intlGetDateNumerics(a, b) {
  b = b.utc === true;
  b
    ? (b = {
        dateDay: a.getUTCDate(),
        dateDayOfWeek: a.getUTCDay(),
        dateMonth: a.getUTCMonth(),
        dateYear: a.getUTCFullYear(),
        dateHours: a.getUTCHours(),
        dateMinutes: a.getUTCMinutes(),
        dateSeconds: a.getUTCSeconds(),
        dateMilliseconds: a.getUTCMilliseconds(),
      })
    : (b = {
        dateDay: a.getDate(),
        dateDayOfWeek: a.getDay(),
        dateMonth: a.getMonth(),
        dateYear: a.getFullYear(),
        dateHours: a.getHours(),
        dateMinutes: a.getMinutes(),
        dateSeconds: a.getSeconds(),
        dateMilliseconds: a.getMilliseconds(),
      });
  return b;
}
