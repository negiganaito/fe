/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useMemo } from "react";
import stylex from "@stylexjs/stylex";

import { CometSearchKeyCommandWrapper } from "@/faang/commet-key-commands";
import { BasePortalTargetContext } from "@/faang/context";
import { useStable } from "@/faang/hooks";
import { executionEnvironment } from "@/faang/utils";

import { GeminiLayoutTopLevelProvider } from "../provider/gemini-layout-top-level-provider";

import { ChannelGeminiContainer } from "./channel-gemini-container";
import { CometContextualLayerAnchorRoot } from "./comet-contextual-layer-anchor-root";
import { GeminiLayoutPage } from "./gemini-layout-page";
import { WorkNavigationAppBarContainerExternal } from "./work-navigation-app-bar-container-external";

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

const NavContentAndChannelContainer = ({ children }) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export const GeminiAppViewStack = ({ children }) => {
  const dom = useStable(() =>
    executionEnvironment.canUseDOM ? document.createElement("div") : null
  );

  const MainNavContentComp = useMemo(() => {
    return <WorkNavigationAppBarContainerExternal />;
  });

  const ChannelContent = useMemo(() => {
    return <ChannelGeminiContainer />;
  });

  return (
    <BasePortalTargetContext.Provider value={dom}>
      <CometContextualLayerAnchorRoot>
        <GeminiLayoutTopLevelProvider>
          <GeminiLayoutPage.GeminiLayoutPage
            // 2
            channelContent={ChannelContent}
            // 1
            mainNavContent={MainNavContentComp}
            navContentAndChannelContainer={NavContentAndChannelContainer}
          >
            <CometSearchKeyCommandWrapper xstyle={styles.contentContainer}>
              {children}
            </CometSearchKeyCommandWrapper>
          </GeminiLayoutPage.GeminiLayoutPage>
        </GeminiLayoutTopLevelProvider>
      </CometContextualLayerAnchorRoot>
    </BasePortalTargetContext.Provider>
  );
};
