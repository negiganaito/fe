/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { forwardRef, memo } from "react";
import { jsx } from "react/jsx-runtime";
import stylex from "@stylexjs/stylex";

import { CometTooltip } from "@/faang/base-tooltip";
import { CometPlaceholder } from "@/faang/comet-placeholder";
import { CometVisualCompletionAttributes } from "@/faang/common";
import { ErrorBoundary } from "@/faang/error";
import { VoyageUserJourneyUILayerProvider } from "@/faang/modal/voyage-user-journey-ui-layer-provider";
import { CometPressable } from "@/faang/pressable";

import { WorkGalahadUIBaseAppTabBadge } from "../badge/work-galahad-ui-base-app-tab-badge";
import { ChannelGeminiNavFocusableGroup } from "../focus/channel-gemini-nav-focusable-group";
import { workplace2DSThemeConditionallyApply } from "../utils/workplace-2ds-theme-conditionally-apply";

const e = stylex.create({
  container: {
    width: "100%",
  },
  link: {
    borderRadius: "8px",
    boxSizing: "border-box",
    display: "flex",
    height: "60px",
    paddingBottom: "8px",
    paddingRight: "4px",
    paddingLeft: "4px",
    paddingTop: "8px",
    width: "100%",
  },
  tooltipContainer: {
    width: "100%",
  },
  linkLight: {
    color: "var(--secondary-text)",
  },
  linkHoveredLight: {
    backgroundColor: "var(--hover-overlay)",
  },
  linkSelectedNoLabel: {
    backgroundColor: "var(--primary-deemphasized-button-background)",
  },
  content: {
    borderStyle: "solid",
    borderWidth: 0,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    marginTop: "0",
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    minHeight: "0",
    minWidth: "0",
    paddingTop: "0",
    paddingRight: "0",
    paddingBottom: "0",
    paddingLeft: "0",
    position: "relative",
    zIndex: "0",
    flexGrow: "1",
    flexShrink: "0",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    wordBreak: "keep-all",
  },
  addOn: {
    height: "auto",
    position: "relative",
  },
  largeAddOn: {
    height: "40px",
  },
});

let k = stylex.create({
  link: {
    borderRadius: "100px",
    width: "60px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  linkLight: {
    color: "var(--always-gray-75)",
  },
  linkHoveredLight: {
    backgroundColor: "var(--hover-overlay)",
  },
  largeAddOn: {
    height: "50px",
  },
});

const styles = workplace2DSThemeConditionallyApply(e, k);

export const WorkGalahadUIAppNavButton = memo(
  forwardRef((props, ref) => {
    const {
      label,
      ariaLabel,
      selected = false,
      useGreyBadging = false,
      badgeCount = 0,
      BadgeRenderer,
      href,
      onPress,
      elementId,
      linkDataFT,
      largeAddOn = false,
      preventLocalNavigation = true,
      addOn,
      onPressIn,
      onHoverIn,
      onHoverOut,
      // eslint-disable-next-line no-unused-vars
      "data-testid": dt,
      target,
      tooltipHidden = false,
    } = props;

    const roleProps = selected
      ? {
          role: "link",
          "aria-current": "page",
        }
      : {
          role: "link",
        };

    const { linkHoveredLight, linkSelectedNoLabel } = styles;

    const NavButton = (
      <VoyageUserJourneyUILayerProvider name={"nav-button." + elementId}>
        <ChannelGeminiNavFocusableGroup.WorkGalahadNavFocusableItem>
          <div
            data-ft={linkDataFT}
            data-testid={undefined}
            {...stylex.props(styles.container)}
          >
            <CometPressable
              {...roleProps}
              ref={ref}
              id={elementId}
              aria-label={ariaLabel ?? label}
              onPress={onPress}
              linkProps={
                href
                  ? {
                      url: href,
                      preventLocalNavigation,
                      target,
                    }
                  : undefined
              }
              xstyle={({ hovered }) => {
                return [
                  styles.link,
                  styles.linkLight,
                  hovered && linkHoveredLight,
                  selected && linkSelectedNoLabel,
                ];
              }}
              onPressIn={onPressIn}
              onHoverIn={onHoverIn}
              onHoverOut={onHoverOut}
              children={({ hovered, overlay }) => {
                return (
                  <>
                    <div
                      className={stylex(styles.content)}
                      {...CometVisualCompletionAttributes.IGNORE_DYNAMIC}
                    >
                      <div
                        className={stylex(
                          styles.addOn,
                          !!largeAddOn && styles.largeAddOn
                        )}
                      >
                        {addOn}
                        {BadgeRenderer ? (
                          <ErrorBoundary
                            fallback={() => {
                              return null;
                            }}
                          >
                            <CometPlaceholder
                              fallback={null}
                              children={jsx(BadgeRenderer, {
                                hovered,
                                selected,
                                useGreyBadging,
                              })}
                            />
                          </ErrorBoundary>
                        ) : (
                          <WorkGalahadUIBaseAppTabBadge
                            count={badgeCount}
                            hovered={hovered}
                            selected={selected}
                            useGreyBadging={useGreyBadging}
                          />
                        )}
                      </div>
                    </div>
                    {overlay}
                  </>
                );
              }}
            />
          </div>
        </ChannelGeminiNavFocusableGroup.WorkGalahadNavFocusableItem>
      </VoyageUserJourneyUILayerProvider>
    );

    return (
      <span className={stylex(styles.tooltipContainer)}>
        {tooltipHidden ? (
          NavButton
        ) : (
          <CometTooltip position="end" tooltip={label} delayMs={0}>
            {NavButton}
          </CometTooltip>
        )}
      </span>
    );
  })
);
