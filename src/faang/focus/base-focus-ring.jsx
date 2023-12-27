/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import stylex from "@stylexjs/stylex";

import { FocusWithinHandler } from "./focus-within-handler";

const defaultStyles = stylex.create({
  focused: {
    // eslint-disable-next-line @stylexjs/valid-styles
    "@media (forced-colors: active)": {
      outline: "var(--focus-ring-outline-forced-colors)",
    },
    boxShadow: "var(--focus-ring-shadow-default)",
    outline: "none",
  },
  focusedInset: {
    boxShadow: "var(--focus-ring-shadow-inset)",
  },
  focusedLink: {
    outline: "var(--focus-ring-outline-link)",
  },
  unfocused: {
    outline: "none",
  },
});

const styles = {
  default: defaultStyles.focused,
  inset: defaultStyles.focusedInset,
};

/**
 * @typedef {Object}  BaseFosusRingProps
 * @property {(className: string) => any} children
 * @property {"default" | "inset"} focusRingPosition
 * @property {string} [mode]
 * @property {suppressFocusRing} [suppressFocusRing]
 * @property {any} [testOnly]
 */

/**
 *
 * @param {BaseFosusRingProps} baseFosusRingProps
 * @returns
 */
export const BaseFocusRing = ({
  children,
  focusRingPosition = "default",
  mode = "focus-visible",
  suppressFocusRing = false,
  testOnly,
}) => {
  const focusRingPositionStyles = styles[focusRingPosition];

  return (
    <FocusWithinHandler
      testOnly={testOnly}
      children={(isFocus, isFocusVisible) => {
        let _focus = false;

        if (!suppressFocusRing) {
          if (isFocus && isFocusVisible) {
            _focus = true;
          } else if (isFocus && mode === "focus") {
            _focus = true;
          }
        }

        // if (suppressFocusRing && isFocus) {
        //   if (isFocusVisible || mode === "focus") {
        //     _focus = true;
        //   }
        // }

        return children(
          _focus ? focusRingPositionStyles : defaultStyles.unfocused
        );
      }}
    />
  );

  // return jsx(FocusWithinHandler, {
  //   /**
  //    *
  //    * @param {boolean} isFocus
  //    * @param {boolean} isFocusVisible
  //    */
  //   children: (isFocus, isFocusVisible) => {
  //     let _focus = false;

  //     // if (!_focus) {
  //     //   if (isFocus && isFocusVisible) {
  //     //     _focus = true;
  //     //   } else if (isFocus && mode === 'focus') {
  //     //     _focus = true;
  //     //   }
  //     // }

  //     // return children(
  //     //   _focus ? focusRingPositionStyles : defaultStyles.unfocused
  //     // );

  //     if (suppressFocusRing && isFocus) {
  //       if (isFocusVisible || mode === "focus") {
  //         _focus = true;
  //       }
  //     }

  //     return children(
  //       _focus ? focusRingPositionStyles : defaultStyles.unfocused
  //     );
  //   },

  //   testOnly,
  // });
};

BaseFocusRing.displayName = "BaseFocusRing.react";
BaseFocusRing.focusRingXStyle = defaultStyles.focused;
BaseFocusRing.focusRingInsetXStyle = defaultStyles.focusedInset;
BaseFocusRing.linkFocusRingXStyle = defaultStyles.focusedLink;
