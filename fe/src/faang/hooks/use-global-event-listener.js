/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useEffect } from "react";

const eventAliases = {
  fullscreenchange: [
    "webkitfullscreenchange",
    "mozfullscreenchange",
    "MSFullscreenChange",
    "fullscreenchange",
  ],
};

export const useGlobalEventListener = function (eventName, handler, options) {
  useEffect(() => {
    if (handler !== null) {
      const eventAliasesList = eventAliases[eventName] || [eventName];
      const eventListener = handler;

      eventAliasesList.forEach((alias) => {
        window.addEventListener(alias, eventListener, options);
      });

      return function cleanup() {
        eventAliasesList.forEach((alias) => {
          window.removeEventListener(alias, eventListener, options);
        });
      };
    }
  }, [handler, eventName, options]);
};
