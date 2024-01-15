/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";

import { WorkGalahadUIBaseAppTabBadge } from "./work-galahad-ui-base-app-tab-badge";

export const WorkGalahadAppTabKeyUpdatesBadgeRenderer = (props) => {
  const count = 0;

  return (
    <WorkGalahadUIBaseAppTabBadge {...props} count={count ? 1 : 0} showDot />
  );
};