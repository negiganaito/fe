/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useContext, useEffect } from "react";

import {
  CometKeyCommandUtilsContext,
  HiddenSubtreeContext,
} from "@/faang/context";
import { recoverableViolation } from "@/faang/error";

import { CometLayerKeyCommandWidget } from "./comet-layer-key-command-widget";

export const SetActiveLayerIfAttached = () => {
  const hiddenSubtreeContextValue = useContext(HiddenSubtreeContext);
  const cometKeyCommandUtilsContext = useContext(CometKeyCommandUtilsContext);

  const isSetActiveLayer =
    cometKeyCommandUtilsContext && cometKeyCommandUtilsContext.setActiveLayer;

  const CometLayerKeyCommandWidgetContext = useContext(
    CometLayerKeyCommandWidget.Context
  );

  useEffect(() => {
    if (!isSetActiveLayer) {
      recoverableViolation(
        "The current layer is not wrapped in a *KeyCommandListener",
        "comet_ax"
      );
      return;
    }
    if (!CometLayerKeyCommandWidgetContext) {
      recoverableViolation(
        "setActiveLayer not wrapped in CometLayerKeyCommandWidget.Wrapper",
        "comet_ax"
      );
      return;
    }
    hiddenSubtreeContextValue.hiddenOrBackgrounded ||
      isSetActiveLayer(CometLayerKeyCommandWidgetContext);
  }, [
    CometLayerKeyCommandWidgetContext,
    hiddenSubtreeContextValue,
    isSetActiveLayer,
  ]);

  return null;
};
