/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useCallback, useState } from "react";
import stylex from "@stylexjs/stylex";

import { useVisibilityObserver } from "../hooks";

import { BaseLoadingStateElement } from "./base-loading-state-element";

const rootAnimation = stylex.keyframes({
  "0%": {
    opacity: "var(--glimmer-opacity-min)",
  },

  "100%": {
    opacity: "var(--glimmer-opacity-max)",
  },
});

const time = 200;

const styles = stylex.create({
  paused: {
    animationPlayState: "paused",
  },
  root: {
    // eslint-disable-next-line @stylexjs/valid-styles
    animationDirection: "var(--glimmer-animation-direction)",
    animationDuration: "var(--glimmer-animation-duration)",
    animationIterationCount: "infinite",
    animationName: rootAnimation,
    animationTimingFunction: "var(--glimmer-animation-timing-function)",
    opacity: "var(--glimmer-opacity-min)",
  },
});

export const BaseGlimmer = ({ children, index, xstyle }) => {
  const [mount, setMount] = useState(true);

  const onHidden = useCallback(({ hiddenReason }) => {
    hiddenReason !== "COMPONENT_UNMOUNTED" && setMount(true);
  }, []);

  let onVisible = useCallback(() => {
    setMount(false);
  }, []);

  const ref = useVisibilityObserver({
    onHidden: onHidden,
    onVisible: onVisible,
  });

  return (
    <BaseLoadingStateElement
      ref={ref}
      style={{ animationDelay: (index % 10) * time + "ms" }}
      xstyle={[styles.root, mount && styles.paused, xstyle]}
    >
      {children}
    </BaseLoadingStateElement>
  );
};
