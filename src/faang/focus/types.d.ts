/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

export type FocusWithinHandlerNonStrictModeReactProps = {
  children:
    | ((
        isFocus: boolean | undefined,
        isFocusVisible: boolean | undefined
      ) => React.ReactNode)
    | React.ReactNode;
  onFocusChange?: (...props: any) => any;
  onFocusVisibleChange?: (...props: any) => any;
  onFocusWithin?: (...props: any) => any;
  onBlurWithin?: (...props: any) => any;
  testOnly?: string;
};

export type FocusWithinHandlerStrictModeProps = {
  children?: any;
  onFocusChange?: (...props: any) => any;
  onFocusVisibleChange?: (...props: any) => any;
  onFocusWithin?: (...props: any) => any;
  onBlurWithin?: (...props: any) => any;
  testOnly?: string;
};
