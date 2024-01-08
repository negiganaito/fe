/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { forwardRef, useMemo } from "react";
import stylex from "@stylexjs/stylex";

import { BaseRowContext } from "@/faang/context";

import { BaseView } from "./base-view";

const alignVariable = {
  end: "start",
  start: "end",
};

const expandingStyles = stylex.create({
  expanding: {
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  row: {
    display: "flex",
    flexShrink: 0,
  },
});

const alignStyles = stylex.create({
  center: {
    justifyContent: "center",
  },
  end: {
    justifyContent: "flex-end",
  },
  justify: {
    justifyContent: "space-between",
  },
  start: {
    justifyContent: "flex-start",
  },
});

const verticalAlignStyles = stylex.create({
  bottom: {
    alignItems: "flex-end",
  },
  center: {
    alignItems: "center",
  },
  stretch: {
    alignItems: "stretch",
  },
  top: {
    alignItems: "flex-start",
  },
});

const wrapStyles = stylex.create({
  backward: {
    flexWrap: "wrap-reverse",
  },
  forward: {
    flexWrap: "wrap",
  },
  none: {
    flexWrap: "nowrap",
  },
});

const directionStyles = stylex.create({
  backward: {
    flexDirection: "row-reverse",
  },
  forward: {
    flexDirection: "row",
  },
});

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").BaseRowProps>
 */
export const BaseRow = forwardRef(
  (
    {
      children,
      align = "justify",
      columns = 0,
      direction = "forward",
      expanding = false,
      verticalAlign = "stretch",
      wrap = "none",
      xstyle,
      ...rest
    },
    ref
  ) => {
    let baseRowContextValue = useMemo(() => {
      return {
        columns,
        wrap,
      };
    }, [columns, wrap]);

    return (
      <BaseView
        {...rest}
        ref={ref}
        xstyle={[
          expandingStyles.row,
          expanding && expandingStyles.expanding,
          alignStyles[
            direction === "backward" && (align === "start" || align === "end")
              ? alignVariable[align]
              : align
          ],
          verticalAlignStyles[verticalAlign],
          wrapStyles[wrap],
          directionStyles[direction],
          xstyle,
        ]}
      >
        <BaseRowContext.Provider value={baseRowContextValue}>
          {children}
        </BaseRowContext.Provider>
      </BaseView>
    );
  }
);
