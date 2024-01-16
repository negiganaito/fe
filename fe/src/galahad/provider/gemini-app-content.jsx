/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";

import { CometSearchKeyCommandWrapper } from "@/faang/commet-key-commands";
import { ErrorGuard } from "@/faang/error";
import { CometNetworkStatusToast } from "@/faang/toast";
import { GeminiPageTransitioning } from "@/galahad/common";

import { GeminiAppViewStack } from "../common/gemini-app-view-stack";

export const GeminiAppContent = ({ children }) => {
  ErrorGuard.applyWithGuard(
    () => CometNetworkStatusToast.subscribe(),
    null,
    []
  );

  return (
    <>
      <GeminiPageTransitioning />
      <CometSearchKeyCommandWrapper>
        {/* 
          i.jsx(c("CometErrorBoundary.react"), {
            onError: n("ChatLSGeminiNotificationHandlerDeferred"),
            children: i.jsx(c("CometPlaceholder.react"), {
              fallback: null,
              children: i.jsx(l, {})
            })
          })
         */}
        {/* 
          i.jsx(c("CometErrorBoundary.react"), {
            onError: n("GeminiFaviconUpdater"),
            children: i.jsx(c("CometPlaceholder.react"), {
                fallback: null,
                children: i.jsx(c("GeminiFaviconUpdater.react"), {})
            })
          })
         */}
        {/* 
        i.jsx(c("CometErrorBoundary.react"), {
          onError: n("GeminiLSChatUnreadCountUpdater"),
          children: i.jsx(c("CometPlaceholder.react"), {
              fallback: null,
              children: i.jsx(c("GeminiLSChatUnreadCountUpdater.react"), {})
          })
        })
        */}
        {/* {children} */}
        <GeminiAppViewStack>{children}</GeminiAppViewStack>;
      </CometSearchKeyCommandWrapper>
    </>
  );
};

/*

function a() {
        j();
        k();
        return i.jsxs(i.Fragment, {
            children: [b("cr:1900") && i.jsx(b("cr:1900"), {}), i.jsx(c("CometErrorBoundary.react"), {
                onError: n("GeminiMetaManager"),
                children: i.jsx(c("GeminiMetaManager.react"), {})
            }), i.jsx(c("GeminiPageTransitioning.react"), {}), i.jsxs(c("CometSearchKeyCommandWrapper.react"), {
                children: [i.jsx(c("CometErrorBoundary.react"), {
                    onError: n("ChatLSGeminiNotificationHandlerDeferred"),
                    children: i.jsx(c("CometPlaceholder.react"), {
                        fallback: null,
                        children: i.jsx(l, {})
                    })
                }), i.jsx(c("CometErrorBoundary.react"), {
                    onError: n("GeminiFaviconUpdater"),
                    children: i.jsx(c("CometPlaceholder.react"), {
                        fallback: null,
                        children: i.jsx(c("GeminiFaviconUpdater.react"), {})
                    })
                }), i.jsx(c("CometErrorBoundary.react"), {
                    onError: n("GeminiLSChatUnreadCountUpdater"),
                    children: i.jsx(c("CometPlaceholder.react"), {
                        fallback: null,
                        children: i.jsx(c("GeminiLSChatUnreadCountUpdater.react"), {})
                    })
                }), i.jsx(m, {
                    children: i.jsx(b("cr:6170"), {})
                })]
            })]
        })
    }


*/
