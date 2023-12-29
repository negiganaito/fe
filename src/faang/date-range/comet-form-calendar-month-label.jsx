/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { memo } from "react";

import { TetraText } from "@/faang/tetra-text";

export const CometFormCalendarMonthLabel = memo(({ date }) => {
  return <TetraText type="headlineEmphasized3">{date.format("F Y")}</TetraText>;
});
