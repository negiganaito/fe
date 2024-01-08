/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { createContext, forwardRef, useContext, useMemo } from "react";
import stylex from "@stylexjs/stylex";

import { mergeRefs } from "@/faang/hooks";
import { getLoadingStateAriaProps } from "@/faang/utils";

// type BaseLoadingStateElementProps = {
//   children?: ReactNode
//   disableLoadingStateTracker?: boolean
//   isFocusTarget?: boolean
//   progress?: any
//   style?: CSSProperties
//   className?: string
// }

const l = createContext(false);

const styles = stylex({
  hideOutline: {
    outline: "none",
  },
});

export const BaseLoadingStateElement = forwardRef(
  (
    {
      disableLoadingStateTracker = true,
      xstyle,
      style,
      children,
      progress,
      isFocusTarget,
    },
    ref
  ) => {
    const a = useContext(l);

    const _ref = useMemo(() => {
      return disableLoadingStateTracker ? ref : mergeRefs(ref);
    }, [disableLoadingStateTracker, ref]);

    if (a) {
      return (
        <div
          {...stylex.props(xstyle)}
          data-testid={undefined}
          ref={ref}
          style={style}
        >
          {children}
        </div>
      );
    }

    const ariaProps = getLoadingStateAriaProps(progress, {
      max: 100,
      min: 0,
    });

    return (
      <l.Provider value={true}>
        <div
          {...ariaProps}
          {...stylex.props(styles.hideOutline, xstyle)}
          data-focus-target={isFocusTarget}
          data-testid={undefined}
          ref={_ref}
          style={style}
        >
          {children}
        </div>
      </l.Provider>
    );
  }
);

BaseLoadingStateElement.displayName = "BaseLoadingStateElement.react";
