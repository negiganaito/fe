/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import stylex from "@stylexjs/stylex";
import fbt from "fbt";

const styles = stylex.create({
  badge: {
    borderRadius: "18px",
    color: "var(--always-white)",
    height: "18px",
    minWidth: "6px",
    paddingTop: "0",
    paddingRight: "6px",
    paddingBottom: "0",
    paddingLeft: "6px",
    position: "absolute",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "var(--wig-page-background,var(--nav-bar-background))",
    right: "-8px",
    textAlign: "center",
    top: "-8px",
  },
  showDot: {
    width: "12px",
    height: "12px",
    top: "-6px",
    right: "-6px",
    paddingTop: "0",
    paddingRight: "0",
    paddingBottom: "0",
    paddingLeft: "0",
  },
  badgeCherry: {
    backgroundColor: "var(--notification-badge)",
  },
  badgeGrey: {
    backgroundColor: "var(--always-gray-40)",
  },
  badgeHovered: {
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "var(--new-notification-background)",
  },
  blueBorder: {
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "var(--primary-deemphasized-button-background)",
  },
  badgeNumber: {
    lineHeight: "1.3",
    minHeight: "13px",
    fontSize: ".625rem",
  },

  dummy: {
    lineHeight: 1.3,
    minHeight: "13px",
    fontSize: ".625rem",
  },
});

export const WorkGalahadUIBaseAppTabBadge = ({
  count,
  hovered,
  maxCount = 99,
  selected,
  showDot = false,
  useGreyBadging,
}) => {
  return !count ? null : (
    <span
      className={stylex(
        styles.badge,
        !useGreyBadging && styles.badgeCherry,
        hovered && !selected && styles.badgeHovered,
        useGreyBadging && styles.badgeGrey.backgroundColor,
        selected && styles.blueBorder,
        showDot && styles.showDot
      )}
      aria-label={fbt(
        "Unread count of " + fbt.param("notifications or messages", count),
        "Unread count of {notifications or messages}"
      )}
      role="status"
    >
      {!showDot && (
        <span className={stylex(styles.dummy)} aria-hidden="true">
          {count > maxCount ? maxCount + "+" : count}
        </span>
      )}
    </span>
  );
};
