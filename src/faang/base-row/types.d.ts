/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

export type BaseRowProps = {
  align?: "center" | "end" | "justify" | "start";
  children: ReactNode;
  columns?: number;
  direction?: "backward" | "forward";
  expanding?: boolean;
  verticalAlign?: "bottom" | "center" | "stretch" | "top";
  wrap?: "backward" | "forward" | "none";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  xstyle?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useDeprecatedStyles?: any;
};

export type BaseViewReactProps = {
  suppressHydrationWarning?: boolean;
  hidden?: boolean;
  testid?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  xstyle?: any;
} & React.JSX.IntrinsicElements["div"];

export type BaseRowItemReactProps = {
  expanding?: boolean;
  useDeprecatedStyles?: boolean;
  verticalAlign?: "bottom" | "top" | "center" | "stretch";
};
