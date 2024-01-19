/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { forwardRef, memo, useCallback, useMemo } from "react";
import { useFluxStore } from "flux-hooks";

import { isClickWithModifierKey } from "@/faang/utils";

import { GeminiNavAndChannelContext } from "../context";
import { useChannelGeminiEntryPoint } from "../hooks/use-channel-gemini-entry-point";
import { WorkGalahadNavActions } from "../store/work-galahad-nav-actions";
import { workGalahadNavStore } from "../store/work-galahad-nav-store";

import { WorkGalahadUIAppNavButton } from "./work-galahad-ui-app-nav-button";
import { WorkGalahadUIAppTabSelectorIcon } from "./work-galahad-ui-app-tab-selector-icon";
import { WorkGalahadUIAppsListItem } from "./work-galahad-ui-apps-list-item";

function getSelectedAppTabID() {
  return workGalahadNavStore.getSelectedAppTabID();
}

const _1717554 = false;

const excludedTabIds = new Set([
  "knowledge_library",
  "events",
  "shifts",
  "home",
]);

export const WorkGalahadAppTabItem = memo(
  forwardRef((props, ref) => {
    // eslint-disable-next-line no-unused-vars
    const { badgeCount, isFirst, onHoverIn, onPress, tab, testid } = props;

    const {
      defaultEntityKey,
      href,
      title,
      // eslint-disable-next-line no-unused-vars
      trackingNodeType,
      tabIconName,
      id,
      badgeRenderer,
      // eslint-disable-next-line no-unused-vars
      nuxConfig,
    } = tab;

    const { isAutoHideEnabled } =
      GeminiNavAndChannelContext.useNavUIState(workGalahadNavStore);

    let selectedTabID = useFluxStore(workGalahadNavStore, getSelectedAppTabID);

    const isSelectedTab = selectedTabID === id;

    const ariaLabel = formatBadgeLabel(title, badgeCount);

    // handleEntryPointPresent,
    // handleShow,
    // handleHide,
    // handleUpdate,
    // isEntryPointPreloaded,
    const [
      // resetEntryPoint
      handleEntryPointPresent,
      handleShow,
      handleHide,
      handleUpdate,
      isEntryPointPreloaded,
    ] = useChannelGeminiEntryPoint(tab.channelEntryPoint, tab.id);

    const handleHoverIn = useCallback(
      (event) => {
        !onHoverIn ? undefined : onHoverIn();
        handleShow(event);
      },
      [onHoverIn, handleShow]
    );

    // TODO move outside or here
    const shouldApplySpecialStyling = _1717554 || excludedTabIds.has(id);

    const handleTabClick = useCallback(
      (event) => {
        onPress();

        if (isClickWithModifierKey(event)) {
          return;
        }
        // c("WorkGalahadSearchOverlayEventEmitter").emit("hide");
        //  b.addMetadata("has_preloaded", G ? 1 : 0);
        handleEntryPointPresent();

        WorkGalahadNavActions.selectAppTabID(id);
        WorkGalahadNavActions.allowChannelAutoFocus();

        const shouldApplyFullPageTransition =
          shouldApplySpecialStyling || isSelectedTab;

        href &&
          href !== "" &&
          href !== "#" &&
          shouldApplyFullPageTransition &&
          handleSpecialStyling({}, id, defaultEntityKey, href);

        WorkGalahadNavActions.dismissAllStackedChannels();

        // TODO for send log
        // WorkNavigationFalcoEvent.onReady((log) => {
        //   // eslint-disable-next-line max-nested-callbacks
        //   log(() => {
        //     return {
        //       event: B ? "app_tab_double_click" : "app_tab_click",
        //       app_tab: id,
        //     };
        //   });
        // });
      },
      [
        badgeCount,
        defaultEntityKey,
        isEntryPointPreloaded,
        href,
        id,
        isSelectedTab,
        handleEntryPointPresent,
        shouldApplySpecialStyling,
        onPress,
      ]
    );

    const tabIcon = useMemo(() => {
      return (
        <WorkGalahadUIAppTabSelectorIcon
          selected={isSelectedTab}
          icon={tabIconName}
        />
      );
    }, [isSelectedTab, tabIconName]);

    const shouldApplyGreyBadging = shouldApplySpecialStyling
      ? false
      : !isSelectedTab;

    const tabProps = {
      href: href ? href : undefined,
      elementId: id,
      label: title,
      ariaLabel: ariaLabel,
      selected: isSelectedTab,
      useGreyBadging: isAutoHideEnabled, //  || y === "doNotDisturb",
      // linkDataFT: trackingNodeType
      //   ? TrackingNodes.getTrackingInfo(trackingNodeType)
      //   : undefined,
      "data-testid": "app_tab_selector_" + id,
      onPress: handleTabClick,
      preventLocalNavigation: shouldApplyGreyBadging,
      addOn: tabIcon,
      BadgeRenderer: badgeRenderer,
      onHoverIn: handleHoverIn,
      onHoverOut: handleHide,
      onPressIn: handleUpdate,
    };

    const UINavButton = <WorkGalahadUIAppNavButton {...tabProps} />;

    return (
      <WorkGalahadUIAppsListItem
        ref={ref}
        testid={undefined}
        withTopSpacing={!isFirst}
        key={id}
      >
        {UINavButton}
      </WorkGalahadUIAppsListItem>
    );
  })
);

function formatBadgeLabel(title, badgeCount) {
  // return badgeCount > 0
  //   ? fbt._(
  //       {
  //         "*": "{title}, {number} new items",
  //         _1: "{title}, 1 new item",
  //       },
  //       [fbt._plural(badgeCount, "number"), fbt._param("title", title)]
  //     )
  //   : title;

  // if (badgeCount > 0) {
  //   return (
  //     <fbt desc="{title}, {number} new items / {title}, 1 new item">
  //       {/* eslint-disable-next-line react/no-namespace */}
  //       <fbt:param name="name" gender={this.state.ex1Gender}>
  //         <b className="padRight">{this.state.ex1Name}</b>
  //       </fbt:param>
  //     </fbt>
  //   );
  // }

  return title;
}

// eslint-disable-next-line max-params
function handleSpecialStyling(a, appTabID, entityKey, uri) {
  // a.addMetadata("full_page_transition", 1);
  WorkGalahadNavActions.markPendingTransition({
    appTabID: appTabID,
    entityKey: entityKey,
    uri: uri,
  });
}
