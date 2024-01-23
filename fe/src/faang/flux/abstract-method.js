/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { invariant } from "../utils";

export function abstractMethod(className, methodName) {
  invariant(0, 1537, className, methodName);
}
