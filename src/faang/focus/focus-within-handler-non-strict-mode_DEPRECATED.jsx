import { useRef, useState, useMemo, unstable_Scope } from 'react';
import { jsx } from 'react/jsx-runtime';

import { ReactFocusEvent } from '@/faang/react-interactions/react-focus-event';

/**
 *
 * @param {import("./focus-within-handler-non-strict-mode_DEPRECATED").FocusWithinHandlerNonStrictModeReactProps} param0
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
        onFocusWithin: (e) => {
          if (onFocusWithin && !isFocus) {
            onFocusWithin(e);
          }
          // onFocusWithin && !isFocus && onFocusWithin(e)
        },
        onBlurWithin: (e) => {
          if (onBlurWithin && isFocus) {
            onBlurWithin(e);
          }
          // onBlurWithin && isFocus && onBlurWithin(e)
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

  return jsx(unstable_Scope, {
    ref: focusWithinStrictModeRef,
    children:
      typeof children === 'function'
        ? children(isFocus, isFocusVisible)
        : children,
  });
}
