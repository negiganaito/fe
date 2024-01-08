/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, memo } from "react";
import stylex from "@stylexjs/stylex";

import { BaseView } from "@/faang/base-row";
import { BaseFocusRing } from "@/faang/focus";
import { BaseInput } from "@/faang/form";

const styles = stylex.create({
  switch: {
    cursor: "pointer",
    height: "100%",
    marginTop: "0",
    opacity: ".001",
    outline: "none",
    padding: 0,
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
  },
  wrapper: {
    position: "relative",
  },
});

export const BaseSwitch = memo(
  forwardRef((props, ref) => {
    // eslint-disable-next-line no-unused-vars
    const { suppressFocusRing, children, testid, xstyle, ...rest } = props;

    return (
      <BaseFocusRing
        suppressFocusRing={suppressFocusRing}
        children={(clazz) => {
          return (
            <BaseView
              testid={undefined}
              xstyle={[styles.wrapper, clazz, xstyle]}
            >
              {children}
              <BaseInput
                {...rest}
                aria-checked={rest?.checked ?? false}
                ref={ref}
                role="switch"
                type="checkbox"
                xstyle={styles.switch}
              />
            </BaseView>
          );
        }}
      />
    );
  })
);
