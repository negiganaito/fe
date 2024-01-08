/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import { fbt } from "fbt";

import {
  CometComponentWithKeyCommands,
  CometKeys,
} from "@/faang/commet-key-commands";
import { focusScopeQueries } from "@/faang/focus-region";

import { FocusGroup } from "./focus-group";

const [FocusGroupComp, FocusItem] = FocusGroup.createFocusGroup(
  focusScopeQueries.tabbableScopeQuery
);

function _FocusGroup(props) {
  let commandConfigs = [
    {
      command: {
        key: CometKeys.UP,
      },
      description: fbt.c("Previous item"),
      handler: function () {},
    },
    {
      command: {
        key: CometKeys.DOWN,
      },
      description: fbt.c("Next item"),
      handler: function () {},
    },
  ];

  return (
    <CometComponentWithKeyCommands commandConfigs={commandConfigs}>
      <FocusGroupComp {...props} />
    </CometComponentWithKeyCommands>
  );
}

export const CometMenuFocusGroup = {
  FocusGroup: _FocusGroup,
  FocusItem,
};
