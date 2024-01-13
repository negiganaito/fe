/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { WebPixelRatio } from "../config/web-pixel-ratio";
import { JSResource } from "../utils/js-resource";

export const WorkGalahadHomeTabContainer_entrypoint = {
  root: JSResource("WorkGalahadHomeTabContainer", () =>
    import(/* webpackPrefetch: true */ "./work-galahad-home-tab-container.jsx")
  ),
  getPreloadProps: (params) => {
    const _1031519 = false;

    const initialProps = {
      groupCount: 6,
      peopleCount: 15,
      user: c("CurrentUser").getID(),
      scale: WebPixelRatio.get(),
      isHybridLeftNav: _1031519,
      hasMessengerThread: undefined,
      id: "HOME",
    };
  },
};
