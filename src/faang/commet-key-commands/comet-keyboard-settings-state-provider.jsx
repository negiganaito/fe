/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";

import { BaseKeyCommandListener } from "./base-key-command-listener";

export const CometKeyboardSettingsStateProvider = ({ children }) => {
  return <BaseKeyCommandListener>{children}</BaseKeyCommandListener>;
};
