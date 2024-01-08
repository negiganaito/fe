/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
let modifierKeys = ["alt", "command", "shift"];

export function createKeyCommand(keyConfig) {
  return modifierKeys
    .filter((modifierKey) => {
      return (!keyConfig ? undefined : keyConfig[modifierKey]) === true;
    })
    .concat(!keyConfig ? undefined : keyConfig.key)
    .join(" ");
}
