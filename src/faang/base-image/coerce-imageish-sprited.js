/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
export function coerceImageishSprited(spritedImage) {
  if (
    !spritedImage ||
    typeof spritedImage !== 'object' ||
    !spritedImage.sprited
  ) {
    return null;
  }
  return spritedImage.sprited === 1
    ? {
      className:
        spritedImage.spriteMapCssClass + ' ' + spritedImage.spriteCssClass,
      identifier: spritedImage.loggingID,
      type: 'css',
    }
    : {
      identifier: spritedImage.loggingID,
      style: {
        backgroundImage: "url('" + spritedImage.spi + "')",
        backgroundPosition: spritedImage.p,
        backgroundRepeat: 'no-repeat',
        backgroundSize: spritedImage.sz,
        display: 'inline-block',
        height: spritedImage.h + 'px',
        width: spritedImage.w + 'px',
      },
      type: 'cssless',
    };
}
