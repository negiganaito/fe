/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import visibility from "./visibility";

export const cometVisibilityUserActivityMonitor = {
  isUserActive: () => {
    return visibility.isHidden() === false;
  },

  subscribe: (a) => {
    const b = visibility.addListener(visibility.HIDDEN, () => {
      return a && a(false);
    });
    const d = visibility.addListener(visibility.VISIBLE, () => {
      return a && a(true);
    });
    return function () {
      b && b.remove();
      d && d.remove();
    };
  },
};
