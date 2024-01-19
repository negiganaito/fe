/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  BaseScrollableAreaContext,
  HiddenSubtreePassiveContext,
} from "@/faang/context";
import { useIntersectionObserver } from "@/faang/hooks";
import { intersectionObserverEntryIsIntersecting } from "@/faang/utils";

const Context = React.createContext(false);

const _useGeminiLayoutIntersectionObserverForSticky = (
  threshold,
  initialState = false
) => {
  const isIntersectingRef = useRef(false);

  const hiddenSubtreePassiveContext = useContext(HiddenSubtreePassiveContext);
  const baseScrollableAreaContextValue = useContext(BaseScrollableAreaContext);
  const scrollableArea =
    baseScrollableAreaContextValue[baseScrollableAreaContextValue.length - 1];

  const [isIntersecting, setIntersecting] = useState(initialState);

  const observer = useIntersectionObserver(
    useCallback(
      (entries) => {
        const { hiddenOrBackgrounded } =
          hiddenSubtreePassiveContext.getCurrentState();
        if (hiddenOrBackgrounded) {
          return;
        }

        const newIsIntersecting =
          !intersectionObserverEntryIsIntersecting(entries);

        if (isIntersectingRef.current !== newIsIntersecting) {
          newIsIntersecting !== isIntersecting &&
            setIntersecting(newIsIntersecting);
          isIntersectingRef.current = newIsIntersecting;
        }
      },
      [hiddenSubtreePassiveContext, isIntersecting]
    ),
    useMemo(() => {
      return {
        root: () => {
          return scrollableArea ? scrollableArea.getDOMNode() : null;
        },
        rootMargin: {
          bottom: 0,
          left: 0,
          right: 0,
          top: threshold - 1,
        },
        threshold: 0,
      };
    }, [scrollableArea, threshold])
  );

  return [observer, isIntersecting];
};

const _useGeminiLayoutIsSticky = () => {
  return useContext(Context);
};

export const useGeminiLayoutIntersectionObserverForSticky = {
  useGeminiLayoutIntersectionObserverForSticky:
    _useGeminiLayoutIntersectionObserverForSticky,

  GeminiLayoutStickyContextProvider: Context.Provider,
  useGeminiLayoutIsSticky: _useGeminiLayoutIsSticky,
};
