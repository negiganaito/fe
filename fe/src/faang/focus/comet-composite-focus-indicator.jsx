/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useMemo } from "react";
import fbt from "fbt";

import {
  CometComponentWithKeyCommands,
  CometKeys,
} from "../commet-key-commands";
import { CometCompositeStructureContext } from "../context/comet-composite-structure-context";

import { BaseFocusRing } from "./base-focus-ring";

export const CometCompositeFocusIndicator = ({
  children,
  compositeInfo,
  elementType,
}) => {
  const commandConfig = useMemo(() => {
    compositeInfo.horizontal === true &&
      elementType.push(
        {
          command: {
            key: CometKeys.RIGHT,
          },
          description: fbt.c("Previous item"),
          handler: () => {},
        },
        {
          command: {
            key: CometKeys.LEFT,
          },
          description: fbt.c("Next item"),
          handler: () => {},
        }
      );

    compositeInfo.vertical === true &&
      elementType.push(
        {
          command: {
            key: CometKeys.UP,
          },
          description: fbt.c("Previous item"),
          handler: () => {},
        },
        {
          command: {
            key: CometKeys.DOWN,
          },
          description: fbt.c("Next item"),
          handler: () => {},
        }
      );
  }, [compositeInfo]);

  return (
    <CometComponentWithKeyCommands
      commandConfig={commandConfig}
      debugName={"composite-role_" + (compositeInfo.role || "")}
      elementType={elementType}
    >
      <CometCompositeStructureContext.Provider value={compositeInfo}>
        <BaseFocusRing
          children={(clazz) => {
            return children(clazz);
          }}
        />
      </CometCompositeStructureContext.Provider>
    </CometComponentWithKeyCommands>
  );
};
