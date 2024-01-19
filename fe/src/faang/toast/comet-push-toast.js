/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";

import { CometIcon, fbicon } from "@/faang/icon";

import { ix } from "../utils";

import { BaseToasterStateManager } from "./base-toaster-state-manager";
import { CometToast } from "./comet-toast";

let defaultInstance = BaseToasterStateManager.getInstance();

function _cometPushToast(props, duration = 2750, externalInstance) {
  const store = externalInstance ?? defaultInstance;
  const toast = store.push(
    <CometToast
      {...props}
      loadImmediately
      onDismiss={() => {
        return store.expire(toast);
      }}
    />,
    duration
  );
  return toast;
}

function cometPushSimpleToast(message, duration) {
  return cometPushToast(
    {
      message: message,
    },
    duration
  );
}

function cometPushErrorToast(props, duration = 2750, externalInstance) {
  return cometPushToast(
    {
      ...props,
      color: "warning",
      icon: <CometIcon color="warning" icon={fbicon._(ix(502062), 20)} />,
    },
    duration,
    externalInstance
  );
}

export const cometPushToast = {
  cometPushToast: _cometPushToast,
  cometPushSimpleToast,
  cometPushErrorToast,
};
