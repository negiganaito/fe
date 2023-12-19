/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import stylex from "@stylexjs/stylex";
import { jsx } from "react/jsx-runtime";

const styles = stylex.create({
  color: (color) => ({
    // eslint-disable-next-line @stylexjs/valid-styles
    color: color ?? "initial",
  }),
});

/**
 *
 * @param {import("./types").BaseSVGIconProps} param0
 * @returns
 */
export function BaseSVGIcon({ alt, xstyle, color, icon, size = 8 }) {
  return jsx(icon, {
    height: size,
    title: !alt || alt === "" ? undefined : alt,
    width: size,
    ...stylex.props([color !== null && styles.color(color), xstyle]),
  });
}
