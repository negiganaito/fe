/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import { CometList } from "./comet-list";

export const TetraList = (props) => {
  return <CometList withNegativeMargins {...props} />;
};
