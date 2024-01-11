/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useMemo } from "react";
import stylex from "@stylexjs/stylex";

import { BasePortalTargetContext } from "@/faang/context";
import { useStable } from "@/faang/hooks";
import { executionEnvironment } from "@/faang/utils";

import { GeminiLayoutTopLevelProvider } from "../provider/gemini-layout-top-level-provider";

import { CometContextualLayerAnchorRoot } from "./comet-contextual-layer-anchor-root";

const styles = stylex.create({
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: "inherit",
    position: "relative",
  },
  contentContainerHidden: {
    display: "none",
  },
});

export const GeminiAppViewStack = () => {
  const dom = useStable(() =>
    executionEnvironment.canUseDOM ? document.createElement("div") : null
  );

  const Container = useMemo(() => {
    return <ChannelGeminiContainer />;
  });

  return (
    <BasePortalTargetContext.Provider value={dom}>
      <CometContextualLayerAnchorRoot>
        <GeminiLayoutTopLevelProvider>
          <GeminiLayoutPage.GeminiLayoutPage />
        </GeminiLayoutTopLevelProvider>
      </CometContextualLayerAnchorRoot>
    </BasePortalTargetContext.Provider>
  );
};
