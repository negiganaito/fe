/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";

import { WorkGalahadUIAppTabSelectorSVGIcon } from "./work-galahad-ui-app-tab-selector-svg-icon";

export const WorkGalahadUIAppTabSelectorIcon = ({ icon, selected }) => {
  return (
    <WorkGalahadUIAppTabSelectorSVGIcon selected={selected} iconName={icon} />
  );
};
