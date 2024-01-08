/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
let g = "M d, Y";
function maybeFormatDate(date, dateFormatter) {
  if (!date) return "";
  else return dateFormatter ? dateFormatter(date) : date.format(g);
}

export const datePickerUtils = {
  maybeFormatDate,
};
