/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useEffect } from "react";

import { BaseContextualLayer } from "@/faang/base-contextual-layer";
import {
  BaseContextualLayerAnchorRootContext,
  LayoutAnimationBoundaryContext,
} from "@/faang/context";
import { useCometDisplayTimingTrackerForInteraction } from "@/faang/hooks";

export const BaseCalloutImpl = ({
  anchorRootRefContext,
  animationContext,
  children,
  contextRef,
  contextualLayerProps,
  imperativeRef,
  scrollableAreaContext,
}) => {
  const trackerRef = useCometDisplayTimingTrackerForInteraction(
    "CometCalloutManager"
  );

  useEffect(() => {
    let nodes = scrollableAreaContext
      .map((node) => {
        return node.getDOMNode();
      })
      .filter(Boolean);
    let scrollFunc = function () {
      return !imperativeRef.current
        ? undefined
        : imperativeRef.current.reposition();
    };
    if (nodes.length > 0) {
      nodes.forEach((node) => {
        return node.addEventListener("scroll", scrollFunc, {
          passive: true,
        });
      });
      return function () {
        nodes.forEach((node) => {
          return node.removeEventListener("scroll", scrollFunc, {
            passive: true,
          });
        });
      };
    }
  }, [imperativeRef, imperativeRef]);

  return !contextualLayerProps || !contextRef ? null : (
    <LayoutAnimationBoundaryContext.Provider value={animationContext}>
      <BaseContextualLayerAnchorRootContext.Provider
        value={anchorRootRefContext}
      >
        {contextualLayerProps && (
          <BaseContextualLayer
            align={contextualLayerProps.align}
            contextRef={contextRef}
            disableAutoAlign={contextualLayerProps.disableAutoAlign}
            disableAutoFlip={contextualLayerProps.disableAutoFlip}
            imperativeRef={imperativeRef}
            position={contextualLayerProps.position}
            ref={trackerRef}
          >
            {children}
          </BaseContextualLayer>
        )}
      </BaseContextualLayerAnchorRootContext.Provider>
    </LayoutAnimationBoundaryContext.Provider>
  );
};
