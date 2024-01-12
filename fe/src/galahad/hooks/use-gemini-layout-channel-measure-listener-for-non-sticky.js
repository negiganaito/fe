/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useEffect, useRef, useState } from "react";
import requestAnimationFrame from "fbjs/lib/requestAnimationFrame";

import { executionEnvironment, supportsCSSSticky } from "@/faang/utils";

import { GeminiLayoutFullWidthModeContext } from "../context";

const isCSSStickySupported = executionEnvironment.canUseDOM
  ? supportsCSSSticky
  : true;

export function useGeminiLayoutChannelMeasureListenerForNonSticky(
  nav,
  entity,
  fullWidthMode
) {
  let fullWidthSettings =
    GeminiLayoutFullWidthModeContext.useGeminiLayoutUserSettingsFullWidthMode();
  let navRef = useRef(null);
  let entityRef = useRef(null);

  let [dimensions, setDimensions] = useState(() => {
    return {
      nav: nav,
      entity: entity,
    };
  });
  useEffect(() => {
    if (isCSSStickySupported) {
      return;
    }
    let measureDimensions = function () {
      let navWidth = navRef.current
        ? navRef.current.getBoundingClientRect().width
        : entity;

      let entityWidth = entityRef.current
        ? entityRef.current.getBoundingClientRect().width
        : entity;

      setDimensions({
        nav: navWidth,
        entity: entityWidth,
      });
    };

    requestAnimationFrame(measureDimensions);

    let resizeOptions = {
      passive: true,
    };

    window.addEventListener("resize", measureDimensions, resizeOptions);
    return function () {
      window.removeEventListener("resize", measureDimensions, resizeOptions);
    };
  }, [fullWidthMode, entity, fullWidthSettings, setDimensions]);

  const navWidth = fullWidthMode ? 95 : dimensions.nav;

  return [navRef, entityRef, navWidth, dimensions.entity];
}
