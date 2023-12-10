export type FocusWithinHandlerStrictModeProps = {
  children?: any;
  onFocusChange?: (...props: any) => any;
  onFocusVisibleChange?: (...props: any) => any;
  onFocusWithin?: (...props: any) => any;
  onBlurWithin?: (...props: any) => any;
  testOnly?: any;
};

declare function FocusWithinHandlerStrictMode(
  props: FocusWithinHandlerStrictModeProps
);
