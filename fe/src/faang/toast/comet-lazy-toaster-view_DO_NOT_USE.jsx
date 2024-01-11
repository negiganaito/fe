/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useEffect, useState } from "react";

import { CometPlaceholder } from "@/faang/comet-placeholder";
import { useToasterStateManager } from "@/faang/hooks";

import { CometToasterView_DO_NOT_USE } from "./comet-toaster-view_DO_NOT_USE";

function hasToasts(toasterState) {
  return Object.keys(toasterState.getState()).length > 0;
}

export function CometLazyToasterView_DO_NOT_USE(props) {
  const toasterState = useToasterStateManager();

  let [hasToastsInitially, setHasToastsInitially] = useState(() => {
    return hasToasts(toasterState);
  });

  useEffect(() => {
    if (hasToastsInitially) {
      return;
    }
    let findToast = hasToasts(toasterState);

    if (findToast) {
      setHasToastsInitially(true);
      return;
    }

    // eslint-disable-next-line no-var
    var listener = toasterState.addListener(() => {
      listener.remove();
      setHasToastsInitially(true);
    });
    return listener.remove;
  }, [toasterState, hasToastsInitially]);

  return hasToastsInitially ? (
    <CometPlaceholder fallback={null}>
      {/* eslint-disable-next-line react/jsx-pascal-case */}
      <CometToasterView_DO_NOT_USE loadImmediately {...props} />
    </CometPlaceholder>
  ) : undefined;
}
