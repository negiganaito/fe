/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { coerceImageishSprited } from "@/faang/base-image/coerce-imageish-sprited";
import { unrecoverableViolation } from "@/faang/error/unrecoverable-violation";
import { memoizeWithArgs } from "@/faang/utils/memoize-with-args";

import { TintableIconSource } from "./tintable-icon-source";

function filled(a, b) {
  throw unrecoverableViolation(
    "fbicon.filled" +
      ("(" + JSON.stringify(a) + ", " + b + "): ") +
      "Unexpected fbicon.filled reference.",
    "comet_ui"
  );
}
function outline(a, b) {
  throw unrecoverableViolation(
    "fbicon.outline" +
      ("(" + JSON.stringify(a) + ", " + b + "): ") +
      "Unexpected fbicon.outline reference.",
    "comet_ui"
  );
}

const _fbicon = memoizeWithArgs(
  /**
   *
   * @param {import("@/faang/base-image/types").SpritedImage} src
   * @param {number} size
   */
  (src, size) => {
    return new TintableIconSource("FB", src, size);
  },

  /**
   *
   * @param {import("@/faang/base-image/types").SpritedImage} src
   * @param {number} size
   */
  (src, size) => {
    if (typeof src === "object") {
      const coercedImageObject = coerceImageishSprited(src);
      if (coercedImageObject) {
        return coercedImageObject.identifier + ":" + size;
      } else if (typeof src.uri === "string") {
        return src.uri + ":" + size;
      }
    } else if (typeof src === "string") {
      return src + ":" + size;
    }

    throw unrecoverableViolation(
      "fbicon._: Invalid icon provided.",
      "comet_ui"
    );
  }
);

export const fbicon = {
  _: _fbicon,
  filled,
  outline,
};
