import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import { CometSSRPreloadImageCollection } from './comet-ssr-preload-image-collection';

/**
 *
 * @param {import("./types").SpritedImage} spriteImage
 */
const processSpritedImagesForSSRPreload = (spriteImage) => {
  if (spriteImage === null || ExecutionEnvironment.canUseDOM) {
    return;
  }

  const imageSrc = spriteImage.spi ?? spriteImage._spi ?? spriteImage.uri;

  if (!imageSrc) {
    return;
  }
  CometSSRPreloadImageCollection.addImage(imageSrc);
};

export const CometSSRBackgroundImageUtils = {
  processSpritedImagesForSSRPreload,
};
