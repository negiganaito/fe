/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useMemo } from "react";
import fbt from "fbt";

import { CometKeys } from "@/faang/commet-key-commands";

// eslint-disable-next-line max-params
export function useComboboxKeyConfig(a, b, d, e, f, g) {
  return useMemo(() => {
    return [
      {
        command: {
          key: CometKeys.ENTER,
        },
        description: fbt.c("Select date"),
        handler: function () {
          d();
          f();
        },
        triggerFromInputs: true,
      },
      {
        command: {
          key: CometKeys.ESCAPE,
        },
        description: fbt.c("Close calendar"),
        handler: function () {
          b && (g(""), d());
        },
        triggerFromInputs: true,
      },
      {
        command: {
          key: CometKeys.DOWN,
        },
        description: fbt.c("Show calendar"),
        handler: function () {
          f();
          e();
          a();
        },
        triggerFromInputs: true,
      },
      {
        command: {
          key: CometKeys.UP,
        },
        description: fbt.c("Show calendar"),
        handler: function () {
          f();
          e();
          a();
        },
        triggerFromInputs: true,
      },
      {
        command: {
          alt: true,
          key: CometKeys.DOWN,
        },
        description: fbt.c("Show calendar"),
        handler: e,
        isHiddenCommand: true,
        triggerFromInputs: true,
      },
      {
        command: {
          alt: true,
          key: CometKeys.UP,
        },
        description: fbt.c("Close calendar"),
        handler: d,
        isHiddenCommand: true,
        triggerFromInputs: true,
      },
    ];
  }, [a, b, d, e, f, g]);
}
