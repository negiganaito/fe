/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

export function dispatchEvent(target, type) {
  if (typeof window.Event === "function") {
    return new window.Event(type);
  } else {
    const evt = window.document.createEvent("Event");
    evt.initEvent(type, true, true);
    target.dispatchEvent(evt);
  }
}
