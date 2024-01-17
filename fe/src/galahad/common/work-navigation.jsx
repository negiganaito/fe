/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import { useLazyLoadQuery } from "react-relay";

import { RelayMatchContainer } from "./relay-match-container";

let query;

export const WorkNavigation = () => {
  const { company } = useLazyLoadQuery(
    query ? query : (query = WorkNavigationQuery),
    {}
  );

  return <RelayMatchContainer match={company.navigation_renderer} />;
};
// https://mrtnzlml.com/docs/git
