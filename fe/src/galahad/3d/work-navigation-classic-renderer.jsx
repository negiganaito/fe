/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import { useFragment } from "react-relay";

import { workNavigationClassicRendererFragment } from "../@graphql/WorkNavigationClassicRenderer";
import { WorkGalahadAppTabTopApps } from "../common/work-galahad-app-tab-top-apps";
import { WorkNavigationList } from "../common/work-navigation-list";

let query;

const WorkNavigationClassicRenderer = ({ renderer }) => {
  useFragment(
    query ? query : (query = workNavigationClassicRendererFragment),
    renderer
  );

  return (
    <WorkNavigationList>
      <WorkGalahadAppTabTopApps />
      {/* <WorkNavigationCollapseButtonAndNubs /> */}
    </WorkNavigationList>
  );
};

export default WorkNavigationClassicRenderer;
