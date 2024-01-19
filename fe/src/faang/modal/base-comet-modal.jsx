/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useContext } from "react";
import stylex from "@stylexjs/stylex";

import { HiddenSubtreeContext } from "@/faang/context";
import { BasePortal } from "@/faang/dialog";
import { BaseThemeProvider } from "@/faang/dialog/base-theme-provider";
import { FocusRegion, focusScopeQueries } from "@/faang/focus-region";
import { useStable } from "@/faang/hooks";
import { BaseHeadingContext } from "@/faang/tetra-text";
import {
  CometHeroInteractionContextPassthrough,
  CometHeroInteractionWithDiv,
} from "@/faang/trace";
import { CometLayerKeyCommandWrapper } from "@/galahad/config";

import { BaseContextualLayerAnchorRoot } from "./base-contextual-layer-anchor-root";
import { BaseDocumentScrollView } from "./base-document-scroll-view";
import { VoyageUserJourneyUILayerProvider } from "./voyage-user-journey-ui-layer-provider";

const styles = stylex.create({
  content: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    position: "relative",
  },
  contentDvh: {
    // eslint-disable-next-line @stylexjs/valid-styles
    "@supports (min-height: 100dvh)": {
      minHeight: "100dvh",
    },
  },
  contentDvhWhenNarrow: {
    // eslint-disable-next-line @stylexjs/valid-styles
    "@media (max-width: 679px)": {
      minHeight: "100dvh",
    },
  },
  hidden: {
    visibility: "hidden",
  },
  mask: {
    bottom: 0,
    right: 0,
    position: "fixed",
    left: 0,
    top: 0,
  },
  maskOverlay: {
    backgroundColor: "var(--overlay-alpha-80)",
  },
  root: {
    position: "relative",
  },
  rootStatic: {
    position: "static",
  },
});

const behaviourStyles = stylex.create({
  "above-everything": {
    zIndex: 1,
  },
  "above-nav": {
    zIndex: 3,
  },
  normal: {
    zIndex: "unset",
  },
});

export const BaseCometModal = ({
  blockKeyCommands = false,
  children,
  contextKey,
  hidden = false,
  interactionDesc,
  interactionUUID,
  isOverlayTransparent = false,
  noPortal = false,
  shouldUseDvhMinHeight = false,
  stackingBehavior = "auto",
}) => {
  const { hidden: hiddenSubtree } = useContext(HiddenSubtreeContext);

  const interactionUUIDStable = useStable(() => {
    return interactionUUID;
  });

  const modalOverlay = (
    <VoyageUserJourneyUILayerProvider name="modal">
      <>
        <div
          className={stylex(
            styles.mask,
            !isOverlayTransparent && styles.maskOverlay
          )}
        />
        <BaseContextualLayerAnchorRoot>
          <FocusRegion.FocusRegion
            autoFocusQuery={
              focusScopeQueries.headerFirstTabbableSecondScopeQuery
            }
            autoRestoreFocus
            containFocusQuery={focusScopeQueries.tabbableScopeQuery}
            recoverFocusQuery={
              focusScopeQueries.headerFirstTabbableSecondScopeQuery
            }
          >
            {blockKeyCommands ? (
              children
            ) : (
              <CometLayerKeyCommandWrapper debugName="modal layer">
                {children}
              </CometLayerKeyCommandWrapper>
            )}
          </FocusRegion.FocusRegion>
        </BaseContextualLayerAnchorRoot>
      </>
    </VoyageUserJourneyUILayerProvider>
  );

  const stackingBehaviorMode = hiddenSubtree ? "normal" : stackingBehavior;

  const modalClasses = [
    stackingBehaviorMode === "auto" ? styles.rootStatic : styles.root,
    hidden && styles.hidden,
    stackingBehaviorMode !== "auto" && behaviourStyles[stackingBehaviorMode],
  ];

  const modalContent = (
    <BaseDocumentScrollView contextKey={contextKey} hiddenWhenDetached={hidden}>
      <BaseHeadingContext.Provider value={1}>
        {interactionUUIDStable ? (
          <CometHeroInteractionContextPassthrough clear>
            <CometHeroInteractionWithDiv
              interactionDesc={interactionDesc}
              interactionUUID={interactionUUID}
              xstyle={[
                styles.content,
                shouldUseDvhMinHeight && styles.contentDvh,
                styles.contentDvhWhenNarrow,
              ]}
            >
              {modalOverlay}
            </CometHeroInteractionWithDiv>
          </CometHeroInteractionContextPassthrough>
        ) : (
          <div
            className={stylex(
              styles.content,
              shouldUseDvhMinHeight && styles.contentDvh
            )}
          >
            {modalOverlay}
          </div>
        )}
      </BaseHeadingContext.Provider>
    </BaseDocumentScrollView>
  );

  return noPortal ? (
    <BaseThemeProvider
      children={(themeClass, themeVariable) => {
        return (
          <div
            className={stylex(themeClass, modalClasses)}
            style={themeVariable}
          >
            {modalContent}
          </div>
        );
      }}
    />
  ) : (
    <BasePortal hidden={hiddenSubtree} xstyle={modalClasses}>
      {modalContent}
    </BasePortal>
  );
};
