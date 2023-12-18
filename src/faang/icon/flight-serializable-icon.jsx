/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { IconSource } from './icon-source';
import { ImageIconSource } from './image-icon-source';
import { TintableIconSource } from './tintable-icon-source';

function parseFlightIcon(icon) {
  if (
    typeof icon === 'object' &&
    typeof icon !== 'function' &&
    icon &&
    (icon.flight_icon_type === 'TintableIconSource' ||
      icon.$$typeof === 'fb.tintableiconsource')
  ) {
    return new TintableIconSource(icon.domain, icon.src, icon.size);
  }

  if (
    typeof icon === 'object' &&
    typeof icon !== 'function' &&
    icon &&
    (icon.flight_icon_type === 'IconSource' ||
      icon.$$typeof === 'fb.iconsource')
  ) {
    return new IconSource(icon.domain, icon.src, icon.size);
  }

  if (
    typeof icon === 'object' &&
    typeof icon !== 'function' &&
    icon &&
    (icon.flight_icon_type === 'ImageIconSource' ||
      icon.$$typeof === 'fb.imageiconsource')
  ) {
    return new ImageIconSource(
      icon.src,
      icon.width,
      icon.height,
      icon.resizeStrategy
    );
  }

  return icon;
}

export const FlightSerializableIcon = {
  parseFlightIcon,
};
