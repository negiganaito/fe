/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  1: {
    marginRight: "1ch",
  },
  0.25: {
    marginRight: ".25ch",
  },
  0.5: {
    marginRight: ".5ch",
  },
  0.75: {
    marginRight: ".75ch",
  },
});

/**
 * @typedef CometNonBreakingSpace
 * @property {1 | 0.25 | 0.5 | 0.75} size
 */

/**
 *
 * @param {CometNonBreakingSpace} CometNonBreakingSpace
 */
export function CometNonBreakingSpace({ size }) {
  if (size) {
    return <span className={stylex(styles[size])} children="\ufeff" />;
    // eslint-disable-next-line react/jsx-no-useless-fragment
  } else return <React.Fragment children="\xa0" />;
}
