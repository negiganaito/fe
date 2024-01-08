/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useMemo } from "react";
import { jsx } from "react/jsx-runtime";

import { BaseThemeDisplayModeContext } from "@/faang/context";

import { stylexCompat } from "../utils";

import { useCurrentDisplayMode } from "./use-current-display-mode";

const THEME_CLASSES = {
  dark: "__fb-dark-mode ",
  light: "__fb-light-mode ",
};

/**
 *
 * @param {string} val
 * @returns
 */
export function useCometTheme(val) {
  const displayMode = useCurrentDisplayMode();

  /**
   * @type {string}
   */
  let mode;

  if (val === "invert") {
    mode = displayMode === "light" ? "dark" : "light";
  } else {
    mode = val;
  }

  const wrapper = useMemo(() => {
    return ({ children }) => {
      return jsx(BaseThemeDisplayModeContext.Provider, {
        children,
        value: mode,
      });
    };
  }, [mode]);

  const styles = stylexCompat.makeNamespace({
    theme: THEME_CLASSES[mode],
  });

  return [wrapper, styles];
}
