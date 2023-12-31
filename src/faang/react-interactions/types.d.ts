/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

export type EventOption = {
  passive?: boolean;
};

export type UseEventHandle = {
  setListener: (
    target: EventTarget,
    listener: null | ((e: React.SyntheticEvent<EventTarget>) => void)
  ) => void;
  clear: () => void;
};

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
