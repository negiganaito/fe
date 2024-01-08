/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { InternalEnum } from "@/faang/focus-region";

const LAYOUT_ANIMATION_EVENT = "layoutAnimation";
const LayoutAnimationEventType = InternalEnum.Mirrored(["Start", "Stop"]);

export const LayoutAnimationEvent = {
  LAYOUT_ANIMATION_EVENT,
  LayoutAnimationEventType,
};
