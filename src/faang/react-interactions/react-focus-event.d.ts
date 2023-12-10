import React from 'react';

export type FocusEvent = React.SyntheticEvent<EventTarget>;

export type UseFocusOptions = {
  disabled?: boolean;
  onBlur?: (event: FocusEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onFocusChange?: (value: boolean) => void;
  onFocusVisibleChange?: (value: boolean) => void;
};

export type UseFocusWithinOptions = {
  disabled?: boolean;
  onAfterBlurWithin?: (e: FocusEvent) => void;
  onBeforeBlurWithin?: (e: FocusEvent) => void;
  onBlurWithin?: (e: FocusEvent) => void;
  onFocusWithin?: (e: FocusEvent) => void;
  onFocusWithinChange?: (v: boolean) => void;
  onFocusWithinVisibleChange?: (v: boolean) => void;
};

declare namespace ReactFocusEvent {
  function useFocus(
    focusTargetRef: { current: null | Node },
    options: UseFocusOptions
  );
  function useFocusWithinStrictMode(props: any): any;
  function useFocusWithin(
    focusWithinTargetRef:
      | { current: null | T }
      | ((focusWithinTarget: null | T) => void),
    options: UseFocusWithinOptions
  ): (focusWithinTarget: null | T) => void;
}
