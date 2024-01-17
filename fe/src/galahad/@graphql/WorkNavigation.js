/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { graphql } from "react-relay";

export const workNavigationQuery = graphql`
  query WorkNavigationQuery {
    company {
      navigation_renderer(supported: "3ik7wA") {
        __typename
        # ...WorkNavigationGalileoNavExternalRenderer_renderer
        #   @module(import: "WorkNavigationGalileoNavExternalRenderer_renderer")
        # ...WorkNavigationAppBarForInternalEmployeesRenderer_renderer
        #   @module(
        #     import: "WorkNavigationAppBarForInternalEmployeesRenderer_renderer"
        #   )
        ...WorkNavigationClassicRenderer_renderer
          @module(name: "WorkNavigationClassicRenderer.jsx")
      }
    }
  }
`;
