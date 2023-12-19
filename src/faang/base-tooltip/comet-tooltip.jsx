/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";

import { BaseTooltip } from "./base-tooltip";
import { CometTooltipImpl } from "./comet-tooltip-impl";

export const CometTooltip = (props) => {
  const { delayMs, ...rest } = props;

  return (
    <BaseTooltip
      {...rest}
      delayTooltipMs={delayMs}
      tooltipImpl={CometTooltipImpl}
    />
  );
};
