/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useCallback, useState } from "react";
import emptyFunction from "fbjs/lib/emptyFunction";

import { useCometPreloaderImpl } from "./use-comet-preloader-impl";

// eslint-disable-next-line max-params
export function useCometPrerendererImpl(
  popoverType,
  isPopoverVisible,
  popoverPreloadResource,
  showCallback,
  hideCallback
) {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [isButtonVisible, setButtonVisible] = useState(false);

  const [preloadResource, cancelPreload, finishPreload, updatePreload] =
    useCometPreloaderImpl(
      popoverType,
      popoverPreloadResource,
      showCallback,
      hideCallback
    );

  const handleShow = useCallback(
    (content) => {
      const showTooltip = () => {
        if (popoverType === "tooltip") {
          setTooltipVisible(true);
        }
      };
      const showButtonAggressive = () => {
        if (popoverType === "button_aggressive") {
          setButtonVisible(true);
        }
      };
      preloadResource(content, showTooltip, showButtonAggressive);
    },
    [preloadResource, popoverType]
  );

  const handleHide = useCallback(() => {
    cancelPreload();
    setTooltipVisible(false);
  }, [cancelPreload]);

  const handleUpdate = useCallback(
    (content) => {
      updatePreload(content);
      if (popoverType === "button" || popoverType === "button_aggressive") {
        setButtonVisible(true);
      }
    },
    [updatePreload, popoverType]
  );

  const handleFinish = useCallback(
    (content) => {
      finishPreload(content);
      setButtonVisible(content);
    },
    [finishPreload]
  );

  if (!popoverType) {
    return [
      {
        isVisible: isPopoverVisible,
        shouldPrerender: false,
      },
      emptyFunction,
      emptyFunction,
      emptyFunction,
      emptyFunction,
    ];
  }

  const options = {
    isVisible: isPopoverVisible,
    shouldPrerender: isTooltipVisible || isButtonVisible,
  };

  return [options, handleShow, handleHide, handleUpdate, handleFinish];
}
