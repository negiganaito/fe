/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
// import React, { useCallback, useState } from "react";
// import { useRelayEnvironment } from "react-relay/hooks";

// import { HovercardInteractionPreference } from "@/galahad/config/hovercard-interaction-preference";

// import { XFBHovercardInteractionPreferenceUtils_facebook } from "../config/xfb-hovercard-interaction-preference-utils.facebook";

// const CometHovercardSettings = {
//   hovercardInteractionPreference: 2,
// };

// const n =
//   HovercardInteractionPreference.cast(
//     CometHovercardSettings.hovercardInteractionPreference
//   ) ?? 2;

// export const CometHovercardSettingsProvider = ({ children }) => {
//   const environment = useRelayEnvironment();
//   const [f, g] = useState(n);

//   const h = useCallback(
//     (a) => {
//       let c = XFBHovercardInteractionPreferenceUtils_facebook.fromJSEnum(a);
//       if (c) {
//         g(a);
//         m.onReady((a) => {
//           a({
//             environment: b,
//             input: {
//               input: {
//                 preference: c,
//               },
//             },
//           });
//         });
//         return;
//       }
//     },
//     [b]
//   );
// };

export {};
