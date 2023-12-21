/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import ExecutionEnvironment from "fbjs/lib/ExecutionEnvironment";

import { CometSSRPreloadImageCollection } from "./comet-ssr-preload-image-collection";

/**
 *
 * @param {import("./types").SpritedImage} spriteImage
 */
const processSpritedImagesForSSRPreload = (spriteImage) => {
  if (!spriteImage || ExecutionEnvironment.canUseDOM) {
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
