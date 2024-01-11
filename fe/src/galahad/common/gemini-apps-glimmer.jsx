/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import stylex from "@stylexjs/stylex";

import { CometGlimmer } from "@/faang/base-glimmer";

const styles = stylex.create({
  root: {
    width: "100%",
  },
  iconRow: {
    height: "60px",
    marginBottom: "4px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    borderRadius: "20px",
    width: "40px",
    height: "40px",
  },

  dummy: {
    width: "100%",
  },

  dummy2: {
    height: "60px",
    marginBottom: "4px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const GeminiAppsGlimmer = () => {
  return (
    <div className={stylex(styles.dummy)}>
      <div className={stylex(styles.dummy2)}>
        <CometGlimmer index={0} xstyle={styles.icon} />
      </div>
      <div className={stylex(styles.dummy2)}>
        <CometGlimmer index={1} xstyle={styles.icon} />
      </div>
      <div className={stylex(styles.dummy2)}>
        <CometGlimmer index={2} xstyle={styles.icon} />
      </div>
    </div>
  );
};
