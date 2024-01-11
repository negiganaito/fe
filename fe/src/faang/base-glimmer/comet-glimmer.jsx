/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import stylex from "@stylexjs/stylex";

import { useCurrentDisplayMode } from "../hooks";

import { BaseGlimmer } from "./base-glimmer";

const styles = stylex.create({
  dark: {
    backgroundColor: "var(--placeholder-icon)",
  },
  light: {
    backgroundColor: "var(--wash)",
  },
});

export const CometGlimmer = ({ xstyle, ...rest }) => {
  const mode = useCurrentDisplayMode();

  return (
    <BaseGlimmer
      xstyle={[mode === "dark" ? styles.dark : styles.light, xstyle]}
      {...rest}
    />
  );
};
