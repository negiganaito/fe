/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
export type BaseButtonPopoverContextProps = {
  expanded: boolean;
  haspopup: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type WebPressableGroupContextProps = {};

export type BaseThemeConfigContextProps = {
  darkClassName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  darkVariables: any;
  lightClassName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lightVariables: any;
};
