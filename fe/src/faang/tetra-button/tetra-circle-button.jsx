/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { forwardRef } from "react";

import { CometCircleButton } from "./comet-circle-button";

export const TetraCircleButton = forwardRef((props, ref) => {
  return <CometCircleButton {...props} ref={ref} />;
});
