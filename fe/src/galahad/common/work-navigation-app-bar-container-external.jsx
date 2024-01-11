/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { CometPlaceholder } from "@/faang/comet-placeholder";

import { GeminiAppsGlimmer } from "./gemini-apps-glimmer";
import { WorkGalahadUIAppsRoot } from "./work-galahad-ui-apps-root";

export const WorkNavigationAppBarContainerExternal = () => {
  return (
    <WorkGalahadUIAppsRoot>
      <CometPlaceholder fallback={<GeminiAppsGlimmer />}>
        {/* Load company */}
        {/* <WorkNavigation /> */}
      </CometPlaceholder>
    </WorkGalahadUIAppsRoot>
  );
};
