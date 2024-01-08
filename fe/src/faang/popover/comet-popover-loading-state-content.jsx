/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { jsx } from "react/jsx-runtime";
import stylex from "@stylexjs/stylex";

import { CometProgressRingIndeterminate } from "@/faang/progress-ring";

// type CometPopoverLoadingStateContentProps = {
//   className?: string,
// };

const styles = stylex.create({
  root: {
    alignItems: "center",
    display: "flex",
    height: "56px",
    justifyContent: "center",
    minWidth: "334px",
    width: "100%",
  },
});

export function CometPopoverLoadingStateContent({ xstyle }) {
  return jsx("div", {
    className: stylex(styles.root, xstyle),
    children: jsx(CometProgressRingIndeterminate, {
      color: "disabled",
      size: 24,
    }),
  });
}
