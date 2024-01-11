/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useEffect, useState } from "react";

import {
  executionEnvironment,
  getDocumentScrollElement,
  Scroll,
  supportsCSSSticky,
} from "@/faang/utils";

const isCSSStickySupported = executionEnvironment.canUseDOM
  ? supportsCSSSticky
  : true;

const n = React.createContext(0);

const useGeminiLayoutHorizontalScrollingListener = () => {
  const [b, e] = useState(0);

  useEffect(() => {
    if (isCSSStickySupported) {
      return;
    }
    let scrollFn = function () {
      let a = getDocumentScrollElement();
      a = Scroll.getLeft(a);
      e(a);
    };
    let scrollOption = {
      passive: !0,
    };
    window.addEventListener("scroll", scrollFn, scrollOption);
    return function () {
      window.removeEventListener("scroll", scrollFn, scrollOption);
    };
  }, [e]);
  return b;
};

export const useGeminiLayoutHorizontalScrolling = {
  useGeminiLayoutHorizontalScrollingListener,
};
