/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { Visibility } from "./visibility";

export const cometVisibilityUserActivityMonitor = {
  isUserActive: () => {
    return Visibility.visibility.isHidden() === false;
  },

  subscribe: (a) => {
    const b = Visibility.visibility.addListener(
      Visibility.visibility.HIDDEN,
      () => {
        return a && a(false);
      }
    );
    const d = Visibility.visibility.addListener(
      Visibility.visibility.VISIBLE,
      () => {
        return a && a(true);
      }
    );
    return function () {
      b && b.remove();
      d && d.remove();
    };
  },
};
