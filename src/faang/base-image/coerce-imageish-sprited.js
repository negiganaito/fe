/**
 *
 * @param {import("./types").SpritedImage} spritedImage
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
        type: 'css',
        className:
          spritedImage.spriteMapCssClass + ' ' + spritedImage.spriteCssClass,
        identifier: spritedImage.loggingID,
      }
    : {
        type: 'cssless',
        style: {
          backgroundImage: "url('" + spritedImage.spi + "')",
          backgroundPosition: spritedImage.p,
          backgroundSize: spritedImage.sz,
          width: spritedImage.w + 'px',
          height: spritedImage.h + 'px',
          backgroundRepeat: 'no-repeat',
          display: 'inline-block',
        },
        identifier: spritedImage.loggingID,
      };
}
