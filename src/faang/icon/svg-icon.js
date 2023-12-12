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
  SVGIcon,
  svgIcon,
  EmojiIcon,
  LegacySVGIcon,
  legacySVGIcon,
};
