/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { ReactNode } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */

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

export type FocusWithinHandlerChildren = {
  // 
};

declare function FocusWithinHandlerNonStrictMode_DEPRECATED(
  props: FocusWithinHandlerNonStrictModeReactProps
);
