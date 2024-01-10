/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import { jsx } from "react/jsx-runtime";

import { CometToasterRoot } from "@/faang/toast/comet-toaster-root";

import { GeminiNavAndChannelContext } from "../context";

import { CometAppShell } from "./comet-app-shell";
import { GeminiAppContent } from "./gemini-app-content";
import { GeminiAppTopLevelProvider } from "./gemini-app-top-level-provider";

// function onError(error) {
//   recoverableViolation(
//     "GeminiApp level component did not catch own error",
//     "work_comet_core",
//     {
//       error,
//     }
//   );
// }

export const GeminiApp = ({ children }) => {
  return (
    <CometAppShell toaster={jsx(CometToasterRoot, {})}>
      <GeminiAppTopLevelProvider>
        <GeminiNavAndChannelContext.Provider>
          <GeminiAppContent>{children}</GeminiAppContent>
        </GeminiNavAndChannelContext.Provider>
        {/* <CometErrorBoundary onError={onError}>
            <CometPlaceholder fallback={null}>
              <CometWatchAndScroll />
            </CometPlaceholder>
          </CometErrorBoundary> */}
        {/* <CometPlaceholder fallback={null} /> */}
      </GeminiAppTopLevelProvider>
    </CometAppShell>
  );
};

/*


 var a = i.jsxs(i.Fragment, {
    children: [i.jsx(c("WorkplaceSearchTypeaheadEventEmitterProvider"), {
        children: i.jsx(c("CometBlinkingTitleMessageProvider.react"), {
            children: i.jsx(c("CometWatchAndScrollProvider.react"), {
                children: i.jsx(c("CometHovercardSettingsProvider.react"), {
                    children: i.jsx(c("GeminiAppTopLevelProvider.react"), {
                        children: i.jsxs(d("GeminiNavAndChannelContext").Provider, {
                            children: [i.jsx(d("DraftsLocalStorageContext").DraftsContextProvider, {
                                children: i.jsx(c("GeminiAppContent.react"), {})
                            }), i.jsx(c("CometErrorBoundary.react"), {
                                onError: k,
                                children: b("cr:1421375") != null ? i.jsx(c("CometPlaceholder.react"), {
                                    fallback: null,
                                    children: i.jsx(b("cr:1421375"), {})
                                }) : null
                            }), i.jsx(c("CometPlaceholder.react"), {
                                fallback: null,
                                children: i.jsx(c("GeminiFrontlineTimeInterstitialDeferred.react"), {})
                            })]
                        })
                    })
                })
            })
        })
    }), i.jsx(c("CometErrorBoundary.react"), {
        onError: k,
        children: i.jsx(c("CometPlaceholder.react"), {
            fallback: null,
            children: i.jsx(d("CometActorGatewayHandler").CometActorGatewayHandler, {})
        })
    })]
});

*/
