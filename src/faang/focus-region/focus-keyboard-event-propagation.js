/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
function hasFocusKeyboardEventPropagationStopped(a) {
  return a._stopFocusKeyboardPropagation === !0
}

function stopFocusKeyboardEventPropagation(a) {
  a._stopFocusKeyboardPropagation = !0
}


export const focusKeyboardEventPropagation = {
  hasFocusKeyboardEventPropagationStopped, stopFocusKeyboardEventPropagation
}
