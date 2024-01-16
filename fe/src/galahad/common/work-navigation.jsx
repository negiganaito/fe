/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useLazyLoadQuery } from "react-relay";

import { useLazyLoadQuery } from "react-relay/relay-hooks/experimental";

export const WorkNavigation = () => {};

export function a() {
  var a = d("CometRelay").useLazyLoadQuery(
    h !== void 0 ? h : (h = b("WorkNavigationQuery.graphql")),
    {}
  );
  a = a.company;
  return j.jsx(d("CometRelay").MatchContainer, {
    match: a.navigation_renderer,
  });
}
// https://mrtnzlml.com/docs/git
