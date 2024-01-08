/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { unstable_Scope, useMemo, useRef, useState } from "react";
import { jsx } from "react/jsx-runtime";

import { ReactFocusEvent } from "@/faang/react-interactions/react-focus-event";

/**
 *
 * @param {import("./types").FocusWithinHandlerNonStrictModeReactProps} param0
 */
export function FocusWithinHandlerNonStrictMode_DEPRECATED({
  onBlurWithin,
  onFocusChange,
  onFocusVisibleChange,
  onFocusWithin,
  children,
  testOnly,
}) {
  const ref = useRef(null);

  // let temp
  // const [isFocus, setFocus] = useState(
  //   (temp = testOnly && testOnly.focus) != null ? temp : false,
  // )
  // const [isFocusVisible, setFocusVisible] = useState(
  //   (temp = testOnly && testOnly.focusVisible) != null ? temp : false,
  // )

  let temp;

  const [isFocus, setFocus] = useState(
    (temp = testOnly && testOnly.focus ? temp : false)
  );

  const [isFocusVisible, setFocusVisible] = useState(
    (temp = testOnly && testOnly.focusVisible ? temp : false)
  );

  const focusWithinStrictModeRef = ReactFocusEvent.useFocusWithin(
    ref,
    useMemo(() => {
      return {
        onBlurWithin: (ev) => {
          if (onBlurWithin && isFocus) {
            onBlurWithin(ev);
          }
        },
        onFocusWithin: (ev) => {
          if (onFocusWithin && !isFocus) {
            onFocusWithin(ev);
          }
        },
        onFocusWithinChange: onFocusChange
          ? (ev) => {
              setFocus(ev);
              onFocusChange(ev);
            }
          : setFocus,
        onFocusWithinVisibleChange: onFocusVisibleChange
          ? (ev) => {
              setFocusVisible(ev);
              onFocusVisibleChange(ev);
            }
          : setFocusVisible,
      };
    }, [
      isFocus,
      onBlurWithin,
      onFocusChange,
      onFocusVisibleChange,
      onFocusWithin,
    ])
  );

  return jsx(unstable_Scope, {
    children:
      typeof children === "function"
        ? children(isFocus, isFocusVisible)
        : children,
    ref: focusWithinStrictModeRef,
  });
}
