/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const _10602 = false;

export const workplace2DSThemeConditionallyApply = (a, b) => {
  const c = { ...a };

  if (_10602) {
    Object.keys(c).forEach((a) => {
      b[a] && (c[a] = [c[a], b[a]]);
    });
  }

  return c;
};
