/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRelayEnvironment } from "react-relay/hooks";
import nullthrows from "fbjs/lib/nullthrows";

import { usePrevious } from "@/faang/hooks";
import { WorkGalahadVariantDisableMutation } from "@/galahad/@graphql/WorkGalahadVariantDisable";
import { WorkGalahadVariantEnableMutation } from "@/galahad/@graphql/WorkGalahadVariantEnable";

import { WorkGalahadVariantSetting } from "./work-galahad-variant-setting";

const featureNameToVariantMap = new Map([
  ["hasNotifPriorityBadgeCount", "NOTIF_PRIORITY_BADGE_COUNT"],
  ["hasGdriveNotifications", "NOTIF_GDRIVE_SETTING"],
  ["hasNotifDotOnTabs", "NOTIF_DOT_ON_TABS"],
  ["hasSMB", "SMB"],
  ["hasChatFirst", "CHAT_FIRST"],
  ["hasSimplification", "SIMPLIFICATION"],
  ["hasRiverKnight", "RIVER_KNIGHT"],
  ["hasDenseThreadlist", "DENSE_THREADLIST"],
  ["hasGemini", "GEMINI"],
  ["hasChatBubbleless", "CHAT_BUBBLELESS"],
  ["hasChatless", "CHATLESS"],
  ["hasLightSpeed", "LIGHTSPEED_ON_WEB"],
  ["hasInternAppbar", "INTERN_APPBAR"],
  ["hasInternAppbarOpenNewTab", "INTERN_APPBAR_OPEN_NEW_TAB"],
  ["hasInternAppbarEnableHotkeys", "INTERN_APPBAR_ENABLE_HOTKEYS"],
  ["hasBlurChatMessages", "BLUR_CHAT_MESSAGES"],
  ["hasWorkMeetingAlerts", "WORK_MEETING_ALERTS"],
  ["hasDisableLinkPreviews", "DISABLE_LINK_PREVIEWS"],
  ["hasInclusiveLanguageSuggestion", "INCLUSIVE_LANGUAGE_SUGGESTIONS"],
  ["rhcFeedCollapsed", "RHC_COLLAPSE_FEED"],
  ["rhcGroupCollapsed", "RHC_COLLAPSE_GROUP"],
  ["rhcChatCollapsed", "RHC_COLLAPSE_CHAT"],
  ["rhcGroupChatLinkedCollapsed", "RHC_COLLAPSE_GROUP_CHAT_LINKED"],
  ["rhcProfileCollapsed", "RHC_COLLAPSE_PROFILE"],
  ["rhcNextCollapsed", "RHC_COLLAPSE_NEXT"],
  ["rhcKnowledgeCollapsed", "RHC_COLLAPSE_KNOWLEDGE"],
  ["rhcEventCollapsed", "RHC_COLLAPSE_EVENT"],
  ["rhcHelpdeskCollapsed", "RHC_COLLAPSE_HELPDESK"],
  ["rhcWhatsNewCollapsed", "RHC_COLLAPSE_WHATS_NEW"],
  ["rhcDeviceLoginCollapsed", "RHC_COLLAPSE_DEVICE_LOGIN"],
  ["rhcInterviewToolsMarketplaceCollapsed", "RHC_COLLAPSE_INTERVIEW_MKTPLACE"],
  ["rhcHashtagCollapsed", "RHC_COLLAPSE_HASHTAG"],
  ["rhcApprovalsCollapsed", "RHC_COLLAPSE_APPROVALS"],
]);

const GeminiVariantContext = createContext({
  hasNotifPriorityBadgeCount: !0,
  hasNotifDotOnTabs: !1,
  hasGdriveNotifications: !0,
  hasChatFirst: !1,
  hasSMB: !1,
  hasSimplification: !1,
  hasRiverKnight: !1,
  hasDenseThreadlist: !1,
  hasGemini: !1,
  hasChatBubbleless: !1,
  hasChatless: !1,
  hasLightSpeed: !1,
  hasInternAppbar: !0,
  hasInternAppbarOpenNewTab: !1,
  hasInternAppbarEnableHotkeys: !1,
  hasBlurChatMessages: !1,
  hasWorkMeetingAlerts: !0,
  hasDisableLinkPreviews: !1,
  hasInclusiveLanguageSuggestion: !0,
  rhcFeedCollapsed: !1,
  rhcGroupCollapsed: !1,
  rhcChatCollapsed: !1,
  rhcGroupChatLinkedCollapsed: !1,
  rhcProfileCollapsed: !1,
  rhcNextCollapsed: !1,
  rhcKnowledgeCollapsed: !1,
  rhcEventCollapsed: !1,
  rhcHelpdeskCollapsed: !1,
  rhcWhatsNewCollapsed: !1,
  rhcDeviceLoginCollapsed: !1,
  rhcHashtagCollapsed: !1,
  rhcInterviewToolsMarketplaceCollapsed: !1,
  rhcApprovalsCollapsed: !1,
});

const ToggleContext = createContext(() => {});

const r = [
  "CHAT_BUBBLELESS",
  "CHAT_FIRST",
  "CHATLESS",
  "GEMINI",
  "INTERN_APPBAR",
  "LIGHTSPEED_ON_WEB",
  "SIMPLIFICATION",
  "SMB",
];

const s = {
  rhcFeedCollapsed: WorkGalahadVariantSetting.rhc_collapse_feed === "ENABLED",
  rhcGroupCollapsed: WorkGalahadVariantSetting.rhc_collapse_group === "ENABLED",
  rhcChatCollapsed: WorkGalahadVariantSetting.rhc_collapse_chat === "ENABLED",
  rhcGroupChatLinkedCollapsed:
    WorkGalahadVariantSetting.rhc_collapse_group_chat_linked === "ENABLED",
  rhcProfileCollapsed:
    WorkGalahadVariantSetting.rhc_collapse_profile === "ENABLED",
  rhcNextCollapsed: WorkGalahadVariantSetting.rhc_collapse_next === "ENABLED",
  rhcKnowledgeCollapsed:
    WorkGalahadVariantSetting.rhc_collapse_knowledge === "ENABLED",
  rhcEventCollapsed: WorkGalahadVariantSetting.rhc_collapse_event === "ENABLED",
  rhcHelpdeskCollapsed:
    WorkGalahadVariantSetting.rhc_collapse_helpdesk === "ENABLED",
  rhcWhatsNewCollapsed:
    WorkGalahadVariantSetting.rhc_collapse_whats_new === "ENABLED",
  rhcDeviceLoginCollapsed:
    WorkGalahadVariantSetting.rhc_collapse_device_login === "ENABLED",
  rhcHashtagCollapsed:
    WorkGalahadVariantSetting.rhc_collapse_hashtag === "ENABLED",
  rhcInterviewToolsMarketplaceCollapsed:
    WorkGalahadVariantSetting.rhc_collapse_interview_mktplace === "ENABLED",
  rhcApprovalsCollapsed:
    WorkGalahadVariantSetting.rhc_collapse_approvals === "ENABLED",
};

export const Provider = ({ children }) => {
  const [featureState, setFeatureState] = useState({
    hasNotifPriorityBadgeCount:
      WorkGalahadVariantSetting.notif_priority_badge_count === "ENABLED" ||
      WorkGalahadVariantSetting.notif_priority_badge_count === "DEFAULT",
    hasNotifDotOnTabs:
      WorkGalahadVariantSetting.notif_dot_on_tabs === "ENABLED",
    hasGdriveNotifications:
      WorkGalahadVariantSetting.notif_gdrive_setting === "ENABLED",
    hasSMB: WorkGalahadVariantSetting.smb === "ENABLED",
    hasChatFirst: WorkGalahadVariantSetting.chat_first === "ENABLED",
    hasSimplification: WorkGalahadVariantSetting.simplification === "ENABLED",
    hasRiverKnight:
      WorkGalahadVariantSetting.river_knight === "ENABLED" ||
      WorkGalahadVariantSetting.river_knight === "DEFAULT",
    hasDenseThreadlist:
      WorkGalahadVariantSetting.dense_threadlist === "ENABLED",
    hasGemini: WorkGalahadVariantSetting.gemini === "ENABLED",
    hasChatBubbleless: WorkGalahadVariantSetting.chat_bubbleless === "ENABLED",
    hasChatless: WorkGalahadVariantSetting.chatless === "ENABLED",
    hasLightSpeed: WorkGalahadVariantSetting.lightspeed_on_web === "ENABLED",
    hasInternAppbar:
      WorkGalahadVariantSetting.intern_appbar === "ENABLED" ||
      WorkGalahadVariantSetting.intern_appbar === "DEFAULT",
    hasInternAppbarOpenNewTab:
      WorkGalahadVariantSetting.intern_appbar_open_new_tab === "ENABLED" ||
      WorkGalahadVariantSetting.intern_appbar_open_new_tab === "DEFAULT",
    hasInternAppbarEnableHotkeys:
      WorkGalahadVariantSetting.intern_appbar_enable_hotkeys === "ENABLED",
    hasBlurChatMessages:
      WorkGalahadVariantSetting.blur_chat_messages === "ENABLED",
    hasWorkMeetingAlerts:
      WorkGalahadVariantSetting.work_meeting_alerts === "ENABLED" ||
      WorkGalahadVariantSetting.work_meeting_alerts === "DEFAULT",
    hasInclusiveLanguageSuggestion:
      WorkGalahadVariantSetting.inclusive_language_suggestions === "ENABLED" ||
      WorkGalahadVariantSetting.inclusive_language_suggestions === "DEFAULT",
    hasDisableLinkPreviews:
      WorkGalahadVariantSetting.disable_link_previews === "ENABLED",
    ...s,
  });

  const [loadingStates, setLoadingStates] = useState({});

  const relayEnvironment = useRelayEnvironment();

  const prevRiverKnightState = usePrevious(featureState.hasRiverKnight);

  useEffect(() => {
    prevRiverKnightState &&
      prevRiverKnightState !== featureState.hasRiverKnight &&
      dispatchEvent(window.document, "resize");
  }, [featureState.hasRiverKnight, prevRiverKnightState]);

  const toggleFeature = useCallback(
    (featureName, source) => {
      if (
        featureNameToVariantMap.has(featureName) &&
        loadingStates[featureName] !== true
      ) {
        //
        setLoadingStates((loadingStates) => {
          loadingStates[featureName] = true;
          return loadingStates;
        });
        let commitMutation = featureState[featureName]
          ? WorkGalahadVariantDisableMutation
          : WorkGalahadVariantEnableMutation;

        commitMutation(relayEnvironment, {
          input: {
            variant: nullthrows(featureNameToVariantMap.get(featureName)),
            source: source,
          },
          onCompleted: () => {
            setLoadingStates((loadingStates) => {
              loadingStates[featureName] = false;
              return loadingStates;
            });
            r.includes(featureNameToVariantMap.get(featureName)) &&
              window.location.reload();
          },
        });
      }

      setFeatureState((featureState) => {
        let updatedState = { ...featureState };
        updatedState[featureName] = !featureState[featureName];
        return updatedState;
      });
    },
    [featureState, relayEnvironment, loadingStates]
  );

  return (
    <GeminiVariantContext.Provider value={featureState}>
      <ToggleContext.Provider value={toggleFeature}>
        {children}
      </ToggleContext.Provider>
    </GeminiVariantContext.Provider>
  );
};

function useGeminiVariant() {
  return useContext(GeminiVariantContext);
}
function useGeminiVariantToggler() {
  return useContext(ToggleContext);
}

export const GeminiVariantState = {
  Provider,
  useGeminiVariant,
  useGeminiVariantToggler,
  GeminiVariantContext,
};
