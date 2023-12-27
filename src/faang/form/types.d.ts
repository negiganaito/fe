/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";

export type CometFormTextInputProps = {
  autoFocus_PLEASE_USE_FOCUS_REGION_INSTEAD?: boolean;
  auxContent?: any;
  emojiSkittle?: any;
  helperText?: any;
  helperTextIsHidden?: boolean;
  icon?: any;
  label?: string;
  labelRef?: any;
  onValueChange?: (
    value: string,
    event: React.ChangeEvent<HTMLElement>
  ) => void;
  suppressFocusRing?: boolean;
  testid?: string;
  validationState?: any;
  validator?: any;
  xstyle?: any;
} & Omit<React.JSX.IntrinsicElements["input"], "className">;
