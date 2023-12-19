/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
export class IconSource {
  /**
   *
   * @param {string} $$typeof
   * @param {import("../base-image/types").SpritedImage} src
   * @param {number} size
   */
  constructor($$typeof, src, size) {
    this.$$typeof = "fb.iconsource";
    this.src = src;
    this.size = size;
  }
}
