/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";

import { CometSearchKeyCommandWidget } from "./comet-search-key-command-widget";

export function CometSearchKeyCommandWrapper({ children, ...rest }) {
  return (
    <CometSearchKeyCommandWidget.Wrapper {...rest}>
      {children}
    </CometSearchKeyCommandWidget.Wrapper>
  );
}
