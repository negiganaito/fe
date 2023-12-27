/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
export function coerceImageishURL(imageOption) {
  if (
    imageOption &&
    typeof imageOption === "object" &&
    !imageOption.sprited &&
    typeof imageOption.uri === "string" &&
    imageOption.width !== undefined &&
    imageOption.height !== undefined
  )
    return imageOption;
  else {
    return null;
  }
}
