/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";

import { CometIcon, fbicon } from "@/faang/icon";
import { CometProgressRingIndeterminate } from "@/faang/progress-ring";

import { ix } from "../utils";

export const CometFormInputValidationStateIcon = {
  CORRECT: (
    <CometIcon
      color="positive"
      icon={fbicon._(ix(498146), 20)}
      testid={undefined}
    />
  ),
  ERROR: (
    <CometIcon
      color="negative"
      icon={fbicon._(ix(502062), 20)}
      testid={undefined}
    />
  ),
  LOADING: <CometProgressRingIndeterminate color="disabled" size={20} />,
  WARN: (
    <CometIcon
      color="warning"
      icon={fbicon._(ix(502062), 20)}
      testid={undefined}
    />
  ),
};
