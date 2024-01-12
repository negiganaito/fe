/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useContext, useEffect, useState } from "react";

import {
  executionEnvironment,
  getDocumentScrollElement,
  Scroll,
  supportsCSSSticky,
} from "@/faang/utils";

const isCSSStickySupported = executionEnvironment.canUseDOM
  ? supportsCSSSticky
  : true;

const Context = React.createContext(0);

const useGeminiLayoutHorizontalScrollingListener = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (isCSSStickySupported) {
      return;
    }
    let scrollFn = function () {
      let element = getDocumentScrollElement();
      element = Scroll.getLeft(element);
      setScrollPosition(element);
    };
    let scrollOption = {
      passive: true,
    };
    window.addEventListener("scroll", scrollFn, scrollOption);
    return function () {
      window.removeEventListener("scroll", scrollFn, scrollOption);
    };
  }, [setScrollPosition]);
  return scrollPosition;
};

const _useGeminiLayoutHorizontalScrolling = () => {
  return useContext(Context);
};

export const useGeminiLayoutHorizontalScrolling = {
  useGeminiLayoutHorizontalScrollingListener,
  useGeminiLayoutHorizontalScrolling: _useGeminiLayoutHorizontalScrolling,
  GeminiLayoutHorizontalScrollingContextProvider: Context.Provider,
};
