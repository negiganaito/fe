/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useFluxStore } from "flux-hooks";

import { WorkAppTabSet } from "../config/work-app-tab-set";
import { workGalahadNavStore } from "../store/work-galahad-nav-store";

function o() {
  return workGalahadNavStore.getSelectedAppTabID();
}
function p() {
  return workGalahadNavStore.getNavigationKey();
}
function q() {
  // return workGalahadNavStore.showInviteLinkOnHeader && c("gkx")("678688");
}
function r() {
  return workGalahadNavStore.getStackedChannelData();
}
function s() {
  return workGalahadNavStore.isChannelAutoFocusAllowed();
}

// function t(a) {
//   if (c("gkx")("1531107")) return !1;
//   else if (a === "chats" || a === "gardens" || a === "meetings") return !1;
//   return !0;
// }

export const ChannelGemini = () => {
  const f = useFluxStore(workGalahadNavStore, r);
  const g = useFluxStore(workGalahadNavStore, o);
  const j = useFluxStore(workGalahadNavStore, p);
  const { isSearchOverlayShown } = useFluxStore(workGalahadNavStore, s);

  const val = WorkAppTabSet.find((tab) => {
    return tab.id === g;
  });

  !val ? undefined : val.trackingNodeType;
};
