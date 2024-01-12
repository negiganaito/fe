/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { getJSEnumSafe } from "@/faang/utils";

import { WorkGalahadAppTabID } from "./work-galahad-app-tab-id";

function getTabID(id) {
  return getJSEnumSafe(WorkGalahadAppTabID, id);
}
function getChatTabID() {
  return "chats";
}
function getProductSpecificHomeTabID() {
  // return c("gkx")("1703310") ? "gardens" : "home";

  return "home";
}

export const WorkGalahadAppTabIDUtil = {
  getTabID,
  getChatTabID,
  getProductSpecificHomeTabID,
};
