/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { memo, useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import stylex from "@stylexjs/stylex";

import { CometIcon, IconSource, ImageIconSource, SVGICON } from "@/faang/icon";

import { CometImage } from "../base-image";

const styles = stylex.create({
  circle: {
    borderRadius: "50%",
  },
  contained: {
    backgroundColor: "var(--secondary-button-background)",
    borderRadius: "50%",
    height: "var(--menu-item-icon-container-size,36px)",
    minWidth: "var(--menu-item-icon-container-size,36px)",
  },
  iconRelativeContainer: {
    position: "relative",
  },
  inset: {
    boxShadow: "inset 0 0 0 1px var(--media-inner-border)",
    position: "absolute",
    left: 0,
    top: 0,
  },
  normal: {
    height: "var(--menu-item-icon-default-size,initial)",
    minWidth: "var(--menu-item-icon-default-size,initial)",
  },
  root: {
    alignItems: "center",
    alignSelf: "baseline",
    display: "flex",
    justifyContent: "center",
    marginRight: "12px",
  },
  roundedRect: {
    borderRadius: "8px",
  },
  dummy1: {
    position: "relative",
  },
});

// TODO
export const CometMenuItemIcon = memo((props) => {
  const {
    disabled,
    emojiSize = 20,
    icon,
    iconColor,
    iconCssSelectorId,
    iconSize = 20,
    use = "normal",
  } = props;

  const child = useMemo(() => {
    if (icon instanceof IconSource) {
      return jsx(CometIcon, {
        color: iconColor ?? "primary",
        disabled,
        icon,
      });
    }
    if (icon instanceof ImageIconSource)
      return jsx(CometIcon, {
        disabled,
        icon,
      });
    if (icon instanceof SVGICON.SVGIcon) {
      return jsx(CometIcon, {
        color: iconColor ?? "primary",
        disabled,
        icon,
        size: iconSize,
      });
    }
    if (icon instanceof SVGICON.LegacySVGIcon) {
      return jsx(CometIcon, {
        color: iconColor ?? "primary",
        disabled,
        icon,
        size: iconSize,
      });
    }
    if (icon instanceof SVGICON.EmojiIcon)
      return jsx("CometEmoji.react", {
        emoji: icon.codepoints,
        size: emojiSize,
      });
    if (
      typeof icon === "object" &&
      typeof icon !== "function" &&
      !icon._isSVG &&
      icon.src
    ) {
      const _size = use === "contained" ? 36 : 20;
      return jsxs("div", {
        className: styles.dummy1, // 'x1n2onr6',
        children: [
          jsx(CometImage, {
            height: _size,
            src: icon.src,
            width: _size,
            xstyle: [
              icon.style === "circle" && styles.circle,
              icon.style === "roundedRect" && styles.roundedRect,
            ],
          }),
          icon.style !== "square"
            ? jsx("div", {
                className: stylex(
                  icon.style === "circle" && styles.circle,
                  styles.inset,
                  icon.style === "roundedRect" && styles.roundedRect
                ),
                style: {
                  height: _size,
                  width: _size,
                },
              })
            : null,
        ],
      });
    }
    return jsx(CometIcon, {
      color: iconColor ?? "secondary",
      disabled,
      icon,
    });
  }, [disabled, emojiSize, icon, iconColor, iconSize, use]);

  return jsx("div", {
    className: stylex([
      styles.root,
      (use === "contained" || use === "contained_small_icon") &&
        styles.contained,
      use === "normal" && styles.normal,
    ]),
    id: iconCssSelectorId,
    children: child,
  });
});
