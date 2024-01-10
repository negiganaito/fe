/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { err, unrecoverableViolation } from "../error";
import { executionEnvironment } from "../utils";

export function getSameOriginTransport() {
  if (!executionEnvironment.canUseDOM && !executionEnvironment.isInWorker)
    throw unrecoverableViolation(
      "getSameOriginTransport: Same origin transport unavailable in the server environment.",
      "comet_infra",
      {},
      {
        blameToPreviousFrame: 1,
      }
    );
  try {
    return new window.XMLHttpRequest();
  } catch (e) {
    throw err("getSameOriginTransport: %s", e.message);
  }
}
