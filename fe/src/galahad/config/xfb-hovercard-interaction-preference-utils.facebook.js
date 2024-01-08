/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { InternalEnumUtils } from "@/faang/utils";

import { HovercardInteractionPreference } from "./hovercard-interaction-preference";

const toJSEnum = InternalEnumUtils.createToJSEnum(
  HovercardInteractionPreference
);

const fromJSEnum = InternalEnumUtils.createFromJSEnum(
  HovercardInteractionPreference
);

export const XFBHovercardInteractionPreferenceUtils_facebook = {
  toJSEnum,
  fromJSEnum,
};
