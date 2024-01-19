/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import stylex from "@stylexjs/stylex";
import fbt from "fbt";

import { testID } from "@/faang/utils";

const styles = stylex.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    flexGrow: 1,
  },
});

export const WorkGalahadUIAppsLists = ({ children }) => {
  return (
    <div
      role="grid"
      aria-label={fbt("Workplace apps", "Workplace apps")}
      className={stylex(styles.wrapper)}
      {...testID("galahad-nav-column")}
    >
      {children}
    </div>
  );
};
