/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { WorkGalahadUIBaseAppTabBadge } from "./work-galahad-ui-base-app-tab-badge";

const _5553 = false;

export const WorkGalahadAppTabChatBadgeRenderer = (props) => {
  const count = 0; // useGeminiChatUnreadCount

  return (
    <WorkGalahadUIBaseAppTabBadge
      {...props}
      count={count}
      maxCount={_5553 ? 20 : 99}
    />
  );
};
