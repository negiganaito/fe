/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { forwardRef } from "react";

import { CometIcon } from "./comet-icon";

export const TetraIcon = forwardRef((props, ref) => {
  return <CometIcon {...props} ref={ref} />;
});
