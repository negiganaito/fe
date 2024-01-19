/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { recoverableViolation } from "@/faang/error";

let h = {
  r: 1,
};
let i = {};

export function getFalcoLogPolicy_DO_NOT_USE(a) {
  let b = i[a];
  if (!b) {
    recoverableViolation(
      "Failed to find a Haste-supplied log policy for the Falco event ' +\n        'identified by token `" +
        a +
        "`. Failing open (ie. with a sampling rate of 1.0).",
      "staticresources"
    );
    return h;
  }
  return b;
}

getFalcoLogPolicy_DO_NOT_USE.add = function (a, b) {
  Object.keys(a).forEach((c) => {
    // eslint-disable-next-line no-sequences
    b && b.entry++, !i[c] ? (i[c] = a[c]) : b && b.dup_entry++;
  });
};
