/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { invariant } from "../utils";

let i = null;
function a(a) {
  !i || invariant(0, 2260);
  i = a;
}

function b(a) {
  return i ? i.emitChange(a) : null;
}

export const FluxStoreInstrumentation = {
  inject: a,
  onEmitChange: b,
};
