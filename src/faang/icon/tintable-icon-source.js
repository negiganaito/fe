/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { IconSource } from './icon-source';

export class TintableIconSource extends IconSource {
  /**
   *
   * @param {string} domain
   * @param {import("../base-image/types").SpritedImage} src
   * @param {number} size
   */
  constructor(domain, src, size) {
    super(domain, src, size);
    this.$$typeof = 'fb.tintableiconsource';
  }
}
