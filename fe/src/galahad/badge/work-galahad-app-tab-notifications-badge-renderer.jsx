/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { WorkGalahadUIBaseAppTabBadge } from "./work-galahad-ui-base-app-tab-badge";

export function WorkGalahadAppTabNotificationsBadgeRenderer(props) {
  const count = 0; // WorkGalahadNotificationsBadge.useCount();

  return (
    <WorkGalahadUIBaseAppTabBadge {...props} count={count} showDot={false} />
  );
}
