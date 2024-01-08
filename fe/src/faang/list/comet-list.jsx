/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { forwardRef } from "react";
import stylex from "@stylexjs/stylex";

import { BaseList } from "./base-list";

const styles = stylex.create({
  margins: {
    marginBottom: "1rem",
    marginTop: "4px",
  },
});

export const CometList = forwardRef((props, ref) => {
  const { children, items, withNegativeMargins, ...rest } = props;

  const _children =
    typeof children === "function"
      ? (items ?? []).map((item, index) => {
          return children({
            item: item,
            props: {
              key: item.key ?? index,
            },
          });
        })
      : children;

  return (
    <BaseList
      {...rest}
      ref={ref}
      xstyle={withNegativeMargins && styles.margins}
    >
      {_children}
    </BaseList>
  );
});
