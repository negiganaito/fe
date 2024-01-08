/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useMemo } from "react";
import fbt from "fbt";

import {
  CometComponentWithKeyCommands,
  CometKeys,
} from "@/faang/commet-key-commands";

export const CometHideLayerOnEscape = (props) => {
  const { children, debugName = "ModalLayer", onHide } = props;

  const commandConfigs = useMemo(() => {
    return [
      {
        command: {
          key: CometKeys.ESCAPE,
        },
        description: fbt.c("Close"),
        handler: onHide,
        triggerFromInput: true,
        triggerOnRepeats: false,
      },
    ];
  }, [onHide]);

  return (
    <CometComponentWithKeyCommands
      commandConfigs={commandConfigs}
      debugName={debugName}
      isWrapperFocusable
    >
      {children}
    </CometComponentWithKeyCommands>
  );
};
