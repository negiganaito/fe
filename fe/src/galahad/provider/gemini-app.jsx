/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

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

export const GeminiApp = () => {
  return (
    <CometAppShell toaster={<CometToasterRoot />}>
      <GeminiAppTopLevelProvider>
        <GeminiNavAndChannelContext.Provider>
          <GeminiNavAndChannelContext.Provider>
            <GeminiAppContent />
          </GeminiNavAndChannelContext.Provider>
          {/* <CometErrorBoundary onError={onError}>
            <CometPlaceholder fallback={null}>
              <CometWatchAndScroll />
            </CometPlaceholder>
          </CometErrorBoundary> */}
          {/* <CometPlaceholder fallback={null} /> */}
        </GeminiNavAndChannelContext.Provider>
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
