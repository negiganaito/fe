/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
class SVGIcon {
  constructor(component) {
    this.component = component;
  }
}

function svgIcon(component) {
  return new SVGIcon(component);
}

class EmojiIcon {
  constructor(codepoints, component) {
    this.codepoints = codepoints;
    this.component = component;
  }
}

class LegacySVGIcon {
  constructor(component) {
    this.component = component;
  }
}

function legacySVGIcon(component) {
  return new LegacySVGIcon(component);
}

export const SVGICON = {
  EmojiIcon,
  LegacySVGIcon,
  SVGIcon,
  legacySVGIcon,
  svgIcon,
};
