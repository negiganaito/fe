/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";

import { DateFormatConfig } from "@/faang/abstract-calendar";
import { TetraText } from "@/faang/tetra-text";
import { DateConsts } from "@/faang/timezone";

export const CometFormCalendarWeekLabel = ({ className }) => {
  const weekLabels = [];

  for (let dayIndex = 0; dayIndex < DateConsts.DAYS_PER_WEEK; dayIndex++) {
    weekLabels.push(
      <div key={"label" + dayIndex} className={className}>
        <TetraText numberOfLines={1} type="meta4">
          {
            DateFormatConfig.shortDayNames[
              (DateFormatConfig.weekStart + dayIndex) % DateConsts.DAYS_PER_WEEK
            ]
          }
        </TetraText>
      </div>
    );
  }
  return weekLabels;
};
