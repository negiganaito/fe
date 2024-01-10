/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useMemo } from "react";

import { CometErrorBoundary, recoverableViolation } from "@/faang/error";

import { CometLazyToasterView_DO_NOT_USE } from "./comet-lazy-toaster-view_DO_NOT_USE";

/*
__d("CometToasterRoot.react", 
  ["CometErrorBoundary.react", 
  "CometLazyToasterView_DO_NOT_USE.react", 
  "react", "recoverableViolation", 
  "useHideNotificationsToasts"]
*/

const filters = new Set(["CometToastNotification"]);

// TODO
const useHideNotificationsToasts = true;

function onError(error) {
  recoverableViolation("The toaster is broken", "CometAppShell", {
    error,
  });
}

export const CometToasterRoot = (props) => {
  const { align, maxWidth } = props;

  return useMemo(() => {
    return (
      <CometErrorBoundary onError={onError}>
        {/* eslint-disable-next-line react/jsx-pascal-case */}
        <CometLazyToasterView_DO_NOT_USE
          align={align}
          filterToasts={useHideNotificationsToasts ? filters : null}
          maxWidth={maxWidth}
        />
      </CometErrorBoundary>
    );
  });
};
