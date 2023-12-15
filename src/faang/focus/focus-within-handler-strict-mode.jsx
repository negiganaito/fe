/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import {
  unstable_Scope,
  useInsertionEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { jsx } from 'react/jsx-runtime';

import { ReactFocusEvent } from '@/faang/react-interactions/react-focus-event';

/**
 *
 * @param {import("./focus-within-handler-strict-mode").FocusWithinHandlerStrictModeProps} props
 */
export function FocusWithinHandlerStrictMode({
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

  const [isFocus, setFocus] = useState(testOnly?.focus ?? false);
  const [isFocusVisible, setFocusVisible] = useState(
    testOnly?.focusVisible ?? false
  );

  const focusWithinStrictMode = ReactFocusEvent.useFocusWithinStrictMode(
    useMemo(() => {
      return {
        onBlurWithin: (e) => {
          if (onBlurWithin && isFocus) {
            onBlurWithin(e);
          }
        },
        onFocusWithin: (e) => {
          if (onFocusWithin && !isFocus) {
            onFocusWithin(e);
          }
        },
        onFocusWithinChange: onFocusChange
          ? (e) => {
            setFocus(e);
            onFocusChange(e);
          }
          : setFocus,
        onFocusWithinVisibleChange: onFocusVisibleChange
          ? (e) => {
            setFocusVisible(e);
            onFocusVisibleChange(e);
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

  useInsertionEffect(() => {
    focusWithinStrictMode(ref.current);
    return () => {
      focusWithinStrictMode(null);
    };
  }, [ref, focusWithinStrictMode]);

  return jsx(unstable_Scope, {
    children:
      typeof children === 'function'
        ? children(isFocus, isFocusVisible)
        : children,
    ref,
  });
}
