/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { graphql } from "react-relay";

// eslint-disable-next-line no-unused-vars
const WorkNavigationClassicRendererFragment = graphql`
  fragment WorkNavigationClassicRenderer_renderer on NavigationRenderer {
    years
  }
`;

export const workNavigationQuery = graphql`
  query WorkNavigationQuery {
    company {
      navigation_renderer {
        # ...WorkNavigationGalileoNavExternalRenderer_renderer
        #   @module(import: "WorkNavigationGalileoNavExternalRenderer_renderer")
        # ...WorkNavigationAppBarForInternalEmployeesRenderer_renderer
        #   @module(
        #     import: "WorkNavigationAppBarForInternalEmployeesRenderer_renderer"
        #   )
        ...WorkNavigationClassicRenderer_renderer
          @module(name: "work-navigation-classic-renderer.jsx")
      }
    }
  }
`;
