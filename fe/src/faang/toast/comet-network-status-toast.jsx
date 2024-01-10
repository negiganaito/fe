/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import fbt from "fbt";

import { fbicon, SVGICON, TetraIcon } from "../icon";
import { NetworkStatus } from "../network";
import { ix } from "../utils";

import { BaseToasterStateManager } from "./base-toaster-state-manager";
import { CometIconWirelessSlashFilled } from "./comet-icon-wireless-slash-filled";
import { cometPushToast } from "./comet-push-toast";

let Comp;

const onNetworkChange = ({ online }) => {
  let instance = BaseToasterStateManager.getInstance();

  if (Comp) {
    instance.expire(Comp);
    Comp = null;
  }

  Comp = online
    ? cometPushToast.cometPushToast(
        {
          icon: <TetraIcon color="positive" icon={fbicon._(ix(485124), 24)} />,
          message: fbt(
            "Your internet connection was restored.",
            "Your internet connection was restored."
          ),
        },
        4e3,
        instance
      )
    : cometPushToast.cometPushToast(
        {
          action: {
            label: fbt("Refresh", "Refresh"),
            onPress: () => {
              // d(
              //   'CometRelayEnvironmentFactory',
              // ).commitLocalUpdateForEachEnvironment(function (a, b, c) {
              //   c.invalidateStore()
              // })

              window.location.reload();
            },
          },

          icon: (
            <TetraIcon
              color="disabled"
              icon={SVGICON.legacySVGIcon(CometIconWirelessSlashFilled)}
              size={24}
            />
          ),

          message: fbt(
            "You are currently offline.",
            "You are currently offline."
          ),
        },
        Infinity,
        instance
      );
};

const subscribe = () => {
  NetworkStatus.onChange(onNetworkChange);
};

export const CometNetworkStatusToast = {
  subscribe,
};
