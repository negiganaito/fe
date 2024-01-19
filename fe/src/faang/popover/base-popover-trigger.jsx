/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, {
  useCallback,
  useContext,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { jsx, jsxs } from "react/jsx-runtime";

import { BaseContextualLayer } from "../base-contextual-layer";
import { BaseContextualLayerDefaultContainer } from "../base-contextual-layer/base-contextual-layer-default-container";
import { CometPlaceholder } from "../comet-placeholder";
import { BaseScrollableAreaContext, CometMenuContext } from "../context";
import { BaseButtonPopoverContext } from "../context/base-button-popover-context";
import { CometHideLayerOnEscape } from "../dialog";
import { CometErrorBoundary } from "../error";
import {
  useCometPrerendererImpl,
  useMergeRefs,
  useOnOutsideClick,
  useVisibilityObserver,
} from "../hooks";
import { CometHeroInteractionWithDiv } from "../trace";
import { HeroInteractionContextPassthrough } from "../trace/hero-interaction-context-passthrough";
import { CometEventTimings } from "../utils";

import { BasePopoverLayerVisibility } from "./base-popover-layer-visibility";
import { CometPrerenderer } from "./comet-prerenderer";

const p = true;

function popoverRendererComp({ content, fallback }) {
  return (
    <CometPlaceholder fallback={fallback ?? null}>{content}</CometPlaceholder>
  );
}

function repositionContextual({ contextualLayerRef }) {
  useLayoutEffect(() => {
    contextualLayerRef.current &&
      contextualLayerRef.current.reposition({
        autoflip: true,
      });
  }, [contextualLayerRef]);

  return null;
}

// export type BasePopoverTriggerProps = {
//   children?
//   doNotCloseOnOutsideClick?: boolean
//   fallback?: ReactNode
//   imperativeRef?
//   interactionTracker?
//   onHighIntentPreload?
//   onLayerDetached?
//   onVisibilityChange?
//   popover?
//   popoverRenderer?
//   popoverPreloadResource?
//   popoverProps?
//   popoverType?: string
//   preloadTrigger?
//   tracePolicy?
//   visibleOnLoad?: boolean
//   triggerOutsideClickOnDrag?
// }

export function BasePopoverTrigger({
  children,
  doNotCloseOnOutsideClick = false,
  fallback,
  imperativeRef,
  interactionTracker,
  onHighIntentPreload,
  onLayerDetached,
  onVisibilityChange,
  popover,
  popoverRenderer = popoverRendererComp,
  popoverPreloadResource,
  popoverProps,
  popoverType = "dialog",
  preloadTrigger,
  tracePolicy,
  visibleOnLoad = false,
  triggerOutsideClickOnDrag,
  ...rest
}) {
  const H = useRef(false);
  const [I, J] = useState(false);

  const [K, L] = useState(null);
  const contextRef = useRef(null);
  const N = useRef(null);
  const O = useCallback(
    (a) => {
      J(a);
      if (onVisibilityChange) {
        onVisibilityChange(a);
      }
    },
    [onVisibilityChange]
  );

  const onCloseCb = useCallback(() => {
    O(!1);
    L(null);
    N.current = null;
  }, [O]);

  const Q = useCallback(
    (a) => {
      if (!I)
        if (!interactionTracker) {
          O(!0);
        } else {
          const [b, a0] = CometEventTimings.getCurrentQueueTime(
            a ?? a.timeStamp
          );

          interactionTracker(
            (e) => {
              N.current = e;
              O(!0);
              // L(
              //   c('CometHeroLogging').genHeroInteractionUUIDAndMarkStart(
              //     e.getTraceId(),
              //   ),
              // )
            },
            b,
            a0
          );
        }
    },
    [I, interactionTracker, O]
  );

  useImperativeHandle(
    imperativeRef,
    () => {
      return {
        hide: () => {
          onCloseCb();
        },
        show: () => {
          Q();
        },
      };
    },
    [Q, onCloseCb]
  );

  const cometInteractionVCRef = useCallback(
    (a) => {
      // CometInteractionVC
      // b('cr:1791018') &&
      //   a != null &&
      //   K != null &&
      //   b('cr:1791018').addMutationRootForTraceId(K, a)
    },
    [K]
  );

  const imperativeContextLayerRef = useRef(null);
  const [prerenderingProps, y, u, S, a] = useCometPrerendererImpl(
    popoverRenderer,
    I,
    popoverPreloadResource,
    onHighIntentPreload
  );

  useLayoutEffect(() => {
    if (visibleOnLoad === !0 && H.current === !1) {
      H.current = !0;
      Q();
    }
    // visibleOnLoad === !0 && H.current === !1 && ((H.current = !0), Q())
  }, [Q, visibleOnLoad]);

  const T = useContext(BaseScrollableAreaContext);

  const U = useVisibilityObserver({
    onHidden: useCallback(
      ({ hiddenReason }) => {
        if (hiddenReason === "COMPONENT_UNMOUNTED") {
          return;
        }
        T[T.length - 1] && onCloseCb();
      },
      [onCloseCb, T]
    ),
  });

  const baseButtonPopoverContextValue = useMemo(() => {
    switch (popoverType) {
      case "menu":
        return {
          expanded: I,
          haspopup: "menu",
        };
      case "dialog":
      default:
        return null;
    }
  }, [I, popoverType]);

  const W = useCallback(
    (a) => {
      contextRef.current = a ? a : null;
      U(a);
    },
    [U]
  );

  const X = () => {
    const b = !N.current ? void 0 : N.current.getTrace();
    if (!N.current || !b) {
      return;
    }
    let { traceStatus } = b;
    if (traceStatus && traceStatus !== "START") {
      return;
    }
    traceStatus = !0;
    N.current.cancelTrace("close_popover", traceStatus);
  };

  const Y = useCallback(() => {
    doNotCloseOnOutsideClick || (p && X(), onCloseCb());
  }, [doNotCloseOnOutsideClick, onCloseCb]);

  const outSideClickRef = useOnOutsideClick(
    I ? Y : null,
    useMemo(() => {
      return {
        isTargetEligible: (a) => {
          const b = contextRef.current;
          return b ? !b.contains(a) : !0;
        },
        triggerOutsideClickOnDrag: triggerOutsideClickOnDrag,
      };
    }, [triggerOutsideClickOnDrag])
  );

  const Z = useCallback(
    (a) => {
      I ? onCloseCb() : Q(a);
    },
    [I, onCloseCb, Q]
  );

  const baseContextualLayerRef = useMergeRefs(
    outSideClickRef,
    cometInteractionVCRef
  );

  const cometMenuContextValue = useMemo(() => {
    return {
      onClose: onCloseCb,
    };
  }, [onCloseCb]);

  const isPopoverTypeMenu = popoverType === "menu";

  return jsxs(React.Fragment, {
    children: [
      jsx(BaseButtonPopoverContext.Provider, {
        value: baseButtonPopoverContextValue,
        children: children(W, Z, onCloseCb, y, u, S, a, I),
      }),
      jsx(CometErrorBoundary, {
        children: jsx(CometPrerenderer, {
          prerenderingProps: prerenderingProps,
          children: (a) => {
            return jsx(BaseContextualLayer, {
              ...a,
              ...rest,
              containFocus: !0,
              contextRef: contextRef,
              customContainer: BaseContextualLayerDefaultContainer, // BaseContextualLayerDefaultContainer
              imperativeRef: imperativeContextLayerRef,
              key: "popover",
              onEscapeFocusRegion: isPopoverTypeMenu ? onCloseCb : void 0,
              ref: baseContextualLayerRef,
              children: jsx(CometHideLayerOnEscape, {
                onHide: onCloseCb,
                children: jsx(CometMenuContext.Provider, {
                  value: cometMenuContextValue,
                  children: jsx(HeroInteractionContextPassthrough, {
                    clear: true,
                    children: jsx(CometHeroInteractionWithDiv, {
                      interactionDesc:
                        "popover_" +
                        (popoverPreloadResource
                          ? popoverPreloadResource.getModuleId()
                          : "Unknown"),

                      interactionUUID: K,
                      children: jsx(BasePopoverLayerVisibility, {
                        onLayerDetached: onLayerDetached,
                        children: popoverRenderer({
                          content: jsxs(React.Fragment, {
                            children: [
                              jsx(repositionContextual, {
                                contextualLayerRef: imperativeContextLayerRef,
                              }),
                              jsx(popover, {
                                ...popoverProps,
                                onClose: onCloseCb,
                              }),
                            ],
                          }),
                          fallback: jsxs(React.Fragment, {
                            children: [
                              jsx(repositionContextual, {
                                contextualLayerRef: imperativeContextLayerRef,
                              }),
                              fallback,
                            ],
                          }),
                        }),
                      }),
                    }),
                  }),
                }),
              }),
            });

            // return React.createElement(
            //   // @ts-ignore
            //   BaseContextualLayer,
            //   Object.assign({}, a, rest, {
            //     containFocus: !0,
            //     contextRef: contextRef,
            //     customContainer: BaseContextualLayerDefaultContainer, // BaseContextualLayerDefaultContainer
            //     imperativeRef: imperativeContextLayerRef,
            //     key: 'popover',
            //     onEscapeFocusRegion: isPopoverTypeMenu ? onCloseCb : void 0,
            //     ref: baseContextualLayerRef,
            //   }),
            //   jsx(CometHideLayerOnEscape, {
            //     onHide: onCloseCb,
            //     children: jsx(CometMenuContext.Provider, {
            //       value: cometMenuContextValue,
            //       children: jsx(HeroInteractionContextPassthrough, {
            //         clear: true,
            //         children: jsx(CometHeroInteractionWithDiv, {
            //           interactionDesc:
            //             'popover_' +
            //             (popoverPreloadResource
            //               ? popoverPreloadResource.getModuleId()
            //               : 'Unknown'),

            //           interactionUUID: K,
            //           children: jsx(BasePopoverLayerVisibility, {
            //             onLayerDetached: onLayerDetached,
            //             children: popoverRenderer({
            //               content: jsxs(React.Fragment, {
            //                 children: [
            //                   jsx(repositionContextual, {
            //                     contextualLayerRef: imperativeContextLayerRef,
            //                   }),
            //                   jsx(
            //                     popover,
            //                     Object.assign({}, popoverProps, {
            //                       onClose: onCloseCb,
            //                     }),
            //                   ),
            //                 ],
            //               }),
            //               fallback: jsxs(React.Fragment, {
            //                 children: [
            //                   jsx(repositionContextual, {
            //                     contextualLayerRef: imperativeContextLayerRef,
            //                   }),
            //                   fallback,
            //                 ],
            //               }),
            //             }),
            //           }),
            //         }),
            //       }),
            //     }),
            //   }),
            // )
          },
        }),
      }),
    ],
  });
}
