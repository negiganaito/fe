/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { JSResource } from "./js-resource";

export function JSResourceForInteraction(a) {
  // eslint-disable-next-line no-useless-call
  return JSResource.call(null, a);
}
