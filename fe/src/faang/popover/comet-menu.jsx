/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";

import { CometMenuBaseWithPopover } from "./comet-menu-base-with-popover";

export const CometMenu = forwardRef((props, ref) => {
  return <CometMenuBaseWithPopover {...props} ref={ref} />;
});
