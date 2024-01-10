/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import stylex from "@stylexjs/stylex";
import { useRouterState } from "@tanstack/react-router";

const loadingBackground = stylex.keyframes({
  "0%": {
    opacity: 0,
  },

  "100%": {
    opacity: 1,
  },
});

const loadingForeground = stylex.keyframes({
  "0%": {
    opacity: 1,
  },

  "39%": {
    opacity: 1,
  },

  "75%": {
    opacity: 0.5,
  },

  "100%": {
    opacity: 1,
  },
});

const dummyAnimation = stylex.keyframes({
  "0%": {
    opacity: 1,
  },

  "39%": {
    opacity: 1,
  },

  "75%": {
    opacity: 0.5,
  },

  "100%": {
    opacity: 1,
  },
});

const styles = stylex.create({
  loadingBackground: {
    animationDelay: "1s",
    animationDuration: ".5s",
    animationFillMode: "both",
    animationName: loadingBackground,
    animationTimingFunction: "ease-out",
    backgroundColor: "#3d5d8e",
    left: 0,
    right: 0,
    height: "6px",
    opacity: "0",
    position: "fixed",
    top: "0",
    width: "100vw",
    zIndex: "999",
  },
  loadingForeground: {
    animationDuration: "2s",
    animationIterationCount: "infinite",
    animationName: loadingForeground,
    animationTimingFunction: "ease-out",
    backgroundColor: "#74a4f2",
    height: "100%",
    width: "100%",
  },
  displayNone: {
    display: "none",
  },

  dummy: {
    width: "100%",
    height: "100%",
    animationIterationCount: "infinite",
    animationTimingFunction: "ease-out",
    backgroundColor: "#74a4f2",
    animationDuration: "2s",
    animationName: dummyAnimation,
  },
});

export function GeminiPageTransitioning() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });

  return (
    <div
      className={stylex(
        styles.loadingBackground,
        isLoading !== true && styles.displayNone
      )}
    >
      <div className={stylex(styles.dummy)} />
    </div>
  );

  // return j.jsx("div", {
  //   className: (h || (h = c("stylex")))(
  //     k.loadingBackground,
  //     a !== !0 && k.displayNone
  //   ),
  //   children: j.jsx("div", {
  //     className: "x1c74tu6 xa4qsjk x14rlmvs xa3vuyk x4o00kh x5yr21d xh8yej3",
  //   }),
  // });
}
