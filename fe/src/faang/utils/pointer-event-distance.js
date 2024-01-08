/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

let thresholdForTouch = 1;
let thresholdForMouse = 5;

// eslint-disable-next-line max-params
function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
}
function calculatePointerEventDistance(event1, event2) {
  return calculateDistance(
    event1.clientX,
    event1.clientY,
    event2.clientX,
    event2.clientY
  );
}
function isWithinThreshold(event1, event2) {
  const threshold =
    event2.pointerType === "touch" || event2.pointerType === "pen"
      ? thresholdForMouse
      : thresholdForTouch;
  const distance = calculatePointerEventDistance(event1, event2);
  return distance <= threshold;
}

export const pointerEventDistance = {
  isWithinThreshold,
};
