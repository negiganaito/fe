/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { WorkCometIconChat } from "../icons/work-comet-icon-chat";
import { WorkCometIconChatFilled } from "../icons/work-comet-icon-chat-filled";
import { WorkCometIconKnowledgeLibrary } from "../icons/work-comet-icon-knowledge-library";
import { WorkCometIconKnowledgeLibraryFilled } from "../icons/work-comet-icon-knowledge-library-filled";
import { WorkCometIconNotifications } from "../icons/work-comet-icon-notifications";
import { WorkCometIconNotificationsFilled } from "../icons/work-comet-icon-notifications-filled";
import { WorkCometIconWorkplace } from "../icons/work-comet-icon-workplace";

const size = 32;

// eslint-disable-next-line complexity
export const WorkGalahadUIAppTabSelectorSVGIcon = ({ selected, iconName }) => {
  const color = selected ? "active-tab" : "inactive-tab";

  switch (iconName) {
    // case "ADMIN": {
    //   return selected ? (
    //     <WorkCometIconAdminPanelFilled size={size} color={color} />
    //   ) : (
    //     <WorkCometIconAdminPanel size={size} color={color} />
    //   );
    // }

    case "CHAT": {
      return selected ? (
        <WorkCometIconChatFilled size={size} color={color} />
      ) : (
        <WorkCometIconChat size={size} color={color} />
      );
    }

    case "HOME": {
      return <WorkCometIconWorkplace size={size} color={color} />;
    }

    case "NOTIFICATIONS": {
      return selected ? (
        <WorkCometIconNotificationsFilled size={size} color={color} />
      ) : (
        <WorkCometIconNotifications size={size} color={color} />
      );
    }

    // case "FEED": {
    //   return selected ? (
    //     <WorkCometIconNewsfeedFilled size={size} color={color} />
    //   ) : (
    //     <WorkCometIconNewsfeed size={size} color={color} />
    //   );
    // }

    // case "COMPASS": {
    //   return selected ? (
    //     <WorkCometIconCompassFilled size={size} color={color} />
    //   ) : (
    //     <WorkCometIconCompass size={size} color={color} />
    //   );
    // }

    // case "PROFILE": {
    //   return selected ? (
    //     <WorkCometIconProfileFilled size={size} color={color} />
    //   ) : (
    //     <WorkCometIconProfile size={size} color={color} />
    //   );
    // }

    // case "DIRECT": {
    //   return selected ? (
    //     <WorkCometIconInboxFilled size={size} color={color} />
    //   ) : (
    //     <WorkCometIconInbox size={size} color={color} />
    //   );
    // }

    case "KNOWLEDGE_LIBRARY": {
      return selected ? (
        <WorkCometIconKnowledgeLibraryFilled size={size} color={color} />
      ) : (
        <WorkCometIconKnowledgeLibrary size={size} color={color} />
      );
    }

    // case "CONTENT_MANAGER": {
    //   return a
    //     ? j.jsx(c("Image.react"), {
    //         src: h("968083"),
    //       })
    //     : j.jsx(c("Image.react"), {
    //         src: h("291098"),
    //       });
    // }

    // case "MEETING":
    //   return a
    //     ? j.jsx(c("WorkCometIconCalendarFilled.react"), {
    //         size: l,
    //         color: d,
    //       })
    //     : j.jsx(c("WorkCometIconCalendar.react"), {
    //         size: l,
    //         color: d,
    //       });
    // case "TOOLS":
    //   return a
    //     ? j.jsx(c("WorkCometIconToolsFilled.react"), {
    //         size: l,
    //         color: d,
    //       })
    //     : j.jsx(c("WorkCometIconTools.react"), {
    //         size: l,
    //         color: d,
    //       });
    // case "WATCH":
    //   return a
    //     ? j.jsx(c("WorkCometIconWatchTvFilled.react"), {
    //         size: l,
    //         color: d,
    //       })
    //     : j.jsx(c("WorkCometIconWatchTv.react"), {
    //         size: l,
    //         color: d,
    //       });
    // case "WORKROOMS":
    //   return a
    //     ? j.jsx(c("WorkCometIconWorkroomsFilled.react"), {
    //         size: l,
    //         color: d,
    //       })
    //     : j.jsx(c("WorkCometIconWorkrooms.react"), {
    //         size: l,
    //         color: d,
    //       });
    // case "SHIFTS":
    //   return j.jsx(k, {
    //     selected: a,
    //   });

    default:
      return null;
  }
};

WorkGalahadUIAppTabSelectorSVGIcon.supportsIcon = function (type) {
  return type !== "HEADLINES";
};
