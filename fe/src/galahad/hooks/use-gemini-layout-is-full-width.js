/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useEffect, useState } from "react";

import { executionEnvironment, supportsCSSSticky } from "@/faang/utils";

import { GeminiLayoutFullWidthModeContext } from "../context";

const isCSSStickySupported = executionEnvironment.canUseDOM
  ? supportsCSSSticky
  : true;

export function useGeminiLayoutIsFullWidth() {
  let geminiLayoutUserSettingsFullWidthMode =
    GeminiLayoutFullWidthModeContext.useGeminiLayoutUserSettingsFullWidthMode();
  let [isFullWidth, setFullWidth] = useState(() => {
    let isWideScreen =
      window &&
      window.matchMedia &&
      window.matchMedia("(min-width: 1921px)").matches;
    return isWideScreen ?? true;
  });
  useEffect(() => {
    if (isCSSStickySupported) {
      return;
    }
    let match = window.matchMedia("(min-width: 1921px)");
    let handleWidthChange = function (mediaQueryResult) {
      setFullWidth(mediaQueryResult.matches);
    };
    match.addListener(handleWidthChange);
    return function () {
      match.removeListener(handleWidthChange);
    };
  }, []);
  return geminiLayoutUserSettingsFullWidthMode || !isFullWidth;
}
