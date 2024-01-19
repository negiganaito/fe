/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";

import { CometCalloutManager } from "@/faang/callout";
import { BaseToasterStateManagerProvider } from "@/faang/toast";

export const CometAppShell = ({ children, toaster }) => {
  return (
    <BaseToasterStateManagerProvider>
      <CometCalloutManager>{children}</CometCalloutManager>
      {toaster}
    </BaseToasterStateManagerProvider>
  );
};

/*

children: i.jsx(c("CometNUXTourManager.react"), {
  children: i.jsx(c("CometNUXManager.react"), {
      children: i.jsx(c("VideoPlayerGlobalComponents.react"), {
          children: b
      })
  })
})

*/
