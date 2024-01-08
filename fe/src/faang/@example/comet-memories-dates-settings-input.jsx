/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import fbt from "fbt";

import { CometUnitHeader } from "@/faang/tetra-text";

export const CometMemoriesDatesSettingsInput = ({
  filterDates,
  onRefresh,
  setFilteredDates,
}) => {
  return (
    <CometUnitHeader
      body={
        <div className="xyamay9">
          <fbt desc="Tell us if there's a specific date or date range that you'd rather not see in your memories.">
            Tell us if there's a specific date or date range that you'd rather
            not see in your memories.
          </fbt>
        </div>
      }
      headline={fbt("Hide Memories of Dates", "Hide Memories of Dates")}
      level={3}
    />
  );
};
