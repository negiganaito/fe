/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { isBrowser } from "fbjs/lib/UserAgent";

export const cssUserAgentSupports = {
  webkitLineClamp: () =>
    isBrowser("IE") || isBrowser("Edge < 17") || isBrowser("Firefox < 68"),
};
