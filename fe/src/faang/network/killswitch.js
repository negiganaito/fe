/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { KSConfig } from "./KSConfig";

export function killswitch(id) {
  return KSConfig.killed.has(id);
}
