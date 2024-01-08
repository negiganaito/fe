/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import {
  // RootRoute, Route,
  Router,
} from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

// Create the router using your route tree
export const router = new Router({ routeTree });
