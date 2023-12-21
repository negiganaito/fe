/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { forwardRef, memo } from "react";
import { jsx } from "react/jsx-runtime";
import stylex from "@stylexjs/stylex";

import { BaseFocusRing } from "@/faang/focus/base-focus-ring";

import { BaseInput } from "./base-input";

const styles = stylex.create({
  root: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ":disabled": {
      color: "var(--disabled-text)",
    },
  },
});

export const BaseTextInput = memo(
  forwardRef((props, ref) => {
    const { suppressFocusRing, xstyle, ...rest } = props;

    return jsx(BaseFocusRing, {
      /**
       *
       * @param {string} _className
       */
      children: (_className) => {
        return jsx(BaseInput, {
          ...rest,
          ref,
          xstyle: [styles.root, _className, xstyle],
        });
      },

      suppressFocusRing,
    });
  })
);
