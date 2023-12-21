/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";
import stylex from "@stylexjs/stylex";

const styles = stylex.create({
  container: {
    backgroundColor: "var(--tooltip-background)",
    borderRadius: "var(--tooltip-corner-radius)",

    boxShadow: "var(--tooltip-box-shadow)",
    display: "block",
    filter: "opacity(1)",
    marginBottom: "2px",
    marginTop: "2px",
    maxWidth: "334px",
    opacity: "0",
    paddingBottom: "12px",
    paddingLeft: "12px",
    paddingRight: "12px",
    paddingTop: "12px",
    position: "relative",
    transitionDuration: "var(--fds-duration-extra-extra-short-out)",
    transitionProperty: "opacity",
    transitionTimingFunction: "var(--fds-animation-fade-out)",
  },
  containerVisible: {
    opacity: "1",
    transitionDuration: "var(--fds-duration-extra-extra-short-in)",
    transitionTimingFunction: "var(--fds-animation-fade-in)",
  },
});

export const BaseTooltipContainer = forwardRef((props, ref) => {
  const {
    children,
    id,
    role = "tooltip",
    shouldFadeIn = false,
    xstyle,
  } = props;

  return (
    <div
      className={stylex(
        styles.container,
        xstyle,
        shouldFadeIn && styles.containerVisible
      )}
      data-testid={undefined}
      id={id}
      ref={ref}
      role={role}
    >
      {children}
    </div>
  );
});
