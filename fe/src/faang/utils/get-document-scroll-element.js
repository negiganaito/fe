/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { FlowMigrationUtilsForLegacyFiles } from "../error";

const isWebkit =
  typeof navigator !== "undefined" &&
  navigator.userAgent.indexOf("AppleWebKit") > -1;

export function getDocumentScrollElement(doc) {
  doc = doc || document;
  if (doc.scrollingElement) {
    return doc.scrollingElement;
  }
  doc =
    !isWebkit && doc.compatMode === "CSS1Compat"
      ? doc.documentElement
      : doc.body;
  doc ||
    FlowMigrationUtilsForLegacyFiles.invariantViolation(
      "null result in getDocumentScrollElement"
    );
  return doc;
}
