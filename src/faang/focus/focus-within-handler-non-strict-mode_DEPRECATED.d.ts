import { ReactNode } from 'react';

export type FocusWithinHandlerNonStrictModeReactProps = {
  children?:
    | ReactNode
    | ((
        isFocus: boolean | undefined,
        isFocusVisible: boolean | undefined
      ) => any);
  onFocusChange?: (...props: any) => any;
  onFocusVisibleChange?: (...props: any) => any;
  onFocusWithin?: (...props: any) => any;
  onBlurWithin?: (...props: any) => any;
  testOnly?: any;
};

export type FocusWithinHandlerChildren = {};

declare function FocusWithinHandlerNonStrictMode_DEPRECATED(
  props: FocusWithinHandlerNonStrictModeReactProps
);
