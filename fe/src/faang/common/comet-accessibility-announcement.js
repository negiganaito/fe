/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useRef } from "react";
import stylex from "@stylexjs/stylex";

const styles = stylex.create({
  offscreenAccessibilityElement: {
    clip: "rect(0,0,0,0)",
    clipPath: "inset(50%)",
    height: "1px",
    overflowX: "hidden",
    overflowY: "hidden",
    position: "absolute",
    width: "1px",
  },
});

export function CometAccessibilityAnnouncement(props) {
  const {
    assertive = false,
    children = null,
    isVisible = false,
    role = "alert",
  } = props;

  const ref = useRef(null);

  return (
    <div
      aria-atomic={true}
      aria-live={assertive ? "assertive" : "polite"}
      className={stylex(!isVisible && styles.offscreenAccessibilityElement)}
      ref={ref}
      role={role}
    >
      {children}
    </div>
  );
}
