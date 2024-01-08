/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { Route as rootRoute } from "./routes/__root";
import { Route as DocumentImport } from "./routes/document";
import { Route as DocumentCategoryIndexImport } from "./routes/document.category";
import { Route as DocumentIndexImport } from "./routes/document.index";
import { Route as LoginImport } from "./routes/login";
import { Route as IndexImport } from "./routes";

const LoginRoute = LoginImport.update({
  path: "/login",
  getParentRoute: () => rootRoute,
});

const DocumentRoute = DocumentImport.update({
  path: "/document",
  getParentRoute: () => rootRoute,
});

const IndexRoute = IndexImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
});

const DocumentIndexRoute = DocumentIndexImport.update({
  path: "/",
  getParentRoute: () => DocumentRoute,
});

const DocumentCategoryIndexRoute = DocumentCategoryIndexImport.update({
  path: "/category/",
  getParentRoute: () => DocumentRoute,
});

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  DocumentRoute.addChildren([DocumentIndexRoute, DocumentCategoryIndexRoute]),
  LoginRoute,
]);
