/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useEffect, useRef } from "react";
import { ReactEventHelpers } from "./react-event-helpers";
import { ReactEventHookPropagation } from "./react-event-hook-propagation";
import { ReactUseEvent } from "./react-use-event";

const hoverOptions = {
  passive: true,
};

function createCustomEventObject(name, param, target) {
  return {
    clientX: param.clientX,
    clientY: param.clientY,
    pageX: param.pageX,
    pageY: param.pageY,
    screenX: param.screenX,
    screenY: param.screenY,
    target: target,
    timeStamp: param.timeStamp,
    type: name,
    x: param.clientX,
    y: param.clientY,
  };
}

function isAncestorOrSelfWithHover(a, b) {
  // eslint-disable-next-line no-self-assign
  b = b;
  while (b !== null) {
    if (b === a) return true;
    if (b._hoverEventTarget) return false;
    b = b.parentNode;
  }
  return false;
}

const useHover = (target, options) => {
  const { disabled, onHoverStart, onHoverMove, onHoverEnd, onHoverChange } =
    options;

  const touchstartHandler = ReactUseEvent("touchstart", hoverOptions);
  const mouseoverHandler = ReactUseEvent("mouseover", hoverOptions);
  const mouseoutHandler = ReactUseEvent("mouseout", hoverOptions);
  const mousemoveHandler = ReactUseEvent("mousemove", hoverOptions);
  const pointeroverHandler = ReactUseEvent("pointerover", hoverOptions);
  const pointeroutHandler = ReactUseEvent("pointerout", hoverOptions);
  const pointermoveHandler = ReactUseEvent("pointermove", hoverOptions);
  const pointercancelHandler = ReactUseEvent("pointercancel", hoverOptions);
  const hoverTouchRef = useRef({
    isHovered: false,
    isTouched: false,
  });

  useEffect(() => {
    let targetCurr = target.current;
    let hoverTouchRefCurr = hoverTouchRef.current;

    console.log({ targetCurr, hoverTouchRefCurr });

    if (targetCurr !== null && hoverTouchRefCurr !== null) {
      targetCurr._hoverEventTarget = true;

      const k = function (param) {
        hoverTouchRefCurr.isHovered &&
          !isAncestorOrSelfWithHover(targetCurr, param.relatedTarget) &&
          ((hoverTouchRefCurr.isHovered = false),
          onHoverEnd &&
            onHoverEnd(createCustomEventObject("hoverend", param, targetCurr)),
          onHoverChange && onHoverChange(false),
          y(param));
      };

      const x = function (param) {
        hoverTouchRefCurr.isTouched = false;
        if (disabled === true) {
          y(param);
          return;
        }
        hoverTouchRefCurr.isHovered &&
          onHoverMove &&
          onHoverMove(createCustomEventObject("hovermove", param, targetCurr));
      };

      const y = function (param) {
        hoverTouchRefCurr.isTouched = false;

        ReactEventHelpers.hasPointerEvents
          ? (pointermoveHandler.setListener(document, null),
            pointercancelHandler.setListener(document, null),
            pointeroutHandler.setListener(document, null))
          : mouseoutHandler.setListener(document, null);
        k(param);
      };

      const i = function (event) {
        if (disabled === !0) {
          y(event);
          return;
        }
        if (
          ReactEventHookPropagation.hasEventHookPropagationStopped(
            event,
            "useHover"
          )
        ) {
          return;
        }
        ReactEventHookPropagation.stopEventHookPropagation(event, "useHover");

        if (
          !hoverTouchRefCurr.isHovered &&
          !isAncestorOrSelfWithHover(targetCurr, event.relatedTarget)
        ) {
          hoverTouchRefCurr.isHovered = true;
          if (onHoverStart) {
            onHoverStart(
              createCustomEventObject("hoverstart", event, targetCurr)
            );
          }
          if (onHoverChange) {
            onHoverChange(!0);
          }

          if (ReactEventHelpers.hasPointerEvents) {
            pointermoveHandler.setListener(document, x);
            pointercancelHandler.setListener(document, y);
            pointeroutHandler.setListener(document, k);
          } else {
            mouseoutHandler.setListener(document, k);
          }
        }

        ReactEventHelpers.hasPointerEvents
          ? pointeroverHandler.setListener(targetCurr, (event) => {
              event.pointerType !== "touch" && i(event);
            })
          : (mouseoverHandler.setListener(targetCurr, (event) => {
              hoverTouchRefCurr.isTouched || i(event);
            }),
            touchstartHandler.setListener(targetCurr, () => {
              hoverTouchRefCurr.isTouched = !0;
            }),
            mousemoveHandler.setListener(document, x));
        hoverTouchRefCurr.isHovered &&
          (ReactEventHelpers.hasPointerEvents
            ? (pointermoveHandler.setListener(document, x),
              pointercancelHandler.setListener(document, y),
              pointeroutHandler.setListener(document, k))
            : mouseoutHandler.setListener(document, k));
      };

      /**
      
      d('ReactEventHelpers').hasPointerEvents
              ? pointeroverHandler.setListener(targetCurr, function (a) {
                  a.pointerType !== 'touch' && i(a)
                })
              : (mouseoverHandler.setListener(targetCurr, function (a) {
                  hoverTouchRefCurr.isTouched || i(a)
                }),
                touchstartHandler.setListener(targetCurr, function () {
                  hoverTouchRefCurr.isTouched = !0
                }),
                mousemoveHandler.setListener(doc, x))
            hoverTouchRefCurr.isHovered &&
              (d('ReactEventHelpers').hasPointerEvents
                ? (pointermoveHandler.setListener(doc, x),
                  pointercancelHandler.setListener(doc, y),
                  pointeroutHandler.setListener(doc, k))
                : mouseoutHandler.setListener(doc, k))

       */

      if (ReactEventHelpers.hasPointerEvents) {
        pointeroverHandler.setListener(targetCurr, (a) => {
          if (a.pointerType !== "touch") {
            i(a);
          }
        });
      } else {
        mouseoverHandler.setListener(targetCurr, (a) => {
          hoverTouchRefCurr.isTouched || i(a);
        });
        touchstartHandler.setListener(targetCurr, () => {
          hoverTouchRefCurr.isTouched = true;
        });
        mousemoveHandler.setListener(document, x);
      }

      if (hoverTouchRefCurr.isHovered) {
        if (ReactEventHelpers.hasPointerEvents) {
          pointermoveHandler.setListener(document, x);
          pointercancelHandler.setListener(document, y);
          pointeroutHandler.setListener(document, k);
        } else {
          mouseoutHandler.setListener(document, k);
        }
      }
    }
  }, [
    disabled,
    onHoverChange,
    onHoverEnd,
    onHoverMove,
    onHoverStart,
    pointercancelHandler,
    pointermoveHandler,
    pointeroutHandler,
    pointeroverHandler,
    mousemoveHandler,
    mouseoutHandler,
    mouseoverHandler,
    target,
    touchstartHandler,
  ]);
};

export const ReactHoverEvent_Legacy = {
  useHover,
};

/*

__d(
  'ReactHoverEvent.react',
  [
    'ReactEventHelpers',
    'ReactEventHookPropagation',
    'ReactUseEvent.react',
    'react',
  ],
  function (a, b, c, d, e, f, g) {
    'use strict'
    b = d('react')
    var h = b.useEffect,
      useRef = b.useRef
    function j(a, b, c) {
      return {
        clientX: b.clientX,
        clientY: b.clientY,
        pageX: b.pageX,
        pageY: b.pageY,
        screenX: b.screenX,
        screenY: b.screenY,
        target: c,
        timeStamp: b.timeStamp,
        type: a,
        x: b.clientX,
        y: b.clientY,
      }
    }
    var hoverOptions = {
      passive: !0,
    }
    function l(a, b) {
      b = b
      while (b != null) {
        if (b === a) return !0
        if (b._hoverEventTarget) return !1
        b = b.parentNode
      }
      return !1
    }
    function a(target, options) {
      var disabled = options.disabled,
        onHoverStart = options.onHoverStart,
        onHoverMove = options.onHoverMove,
        onHoverEnd = options.onHoverEnd,
        onHoverChange = options.onHoverChange,
        touchstartHandler = c('ReactUseEvent.react')(
          'touchstart',
          hoverOptions,
        ),
        mouseoverHandler = c('ReactUseEvent.react')('mouseover', hoverOptions),
        mouseoutHandler = c('ReactUseEvent.react')('mouseout', hoverOptions),
        mousemoveHandler = c('ReactUseEvent.react')('mousemove', hoverOptions),
        pointeroverHandler = c('ReactUseEvent.react')(
          'pointerover',
          hoverOptions,
        ),
        pointeroutHandler = c('ReactUseEvent.react')(
          'pointerout',
          hoverOptions,
        ),
        pointermoveHandler = c('ReactUseEvent.react')(
          'pointermove',
          hoverOptions,
        ),
        pointercancelHandler = c('ReactUseEvent.react')(
          'pointercancel',
          hoverOptions,
        ),
        hoverTouchRef = useRef({
          isHovered: !1,
          isTouched: !1,
        })
      h(
        function () {
          var targetCurr = target.current,
            hoverTouchRefCurr = hoverTouchRef.current
          if (targetCurr !== null && hoverTouchRefCurr !== null) {
            targetCurr._hoverEventTarget = !0
            var doc = document,
              i = function (event) {
                if (disabled === !0) {
                  y(event)
                  return
                }
                if (
                  d('ReactEventHookPropagation').hasEventHookPropagationStopped(
                    event,
                    'useHover',
                  )
                )
                  return
                d('ReactEventHookPropagation').stopEventHookPropagation(
                  event,
                  'useHover',
                )
                !hoverTouchRefCurr.isHovered &&
                  !l(targetCurr, event.relatedTarget) &&
                  ((hoverTouchRefCurr.isHovered = !0),
                  onHoverStart &&
                    onHoverStart(j('hoverstart', event, targetCurr)),
                  onHoverChange && onHoverChange(!0),
                  d('ReactEventHelpers').hasPointerEvents
                    ? (pointermoveHandler.setListener(doc, x),
                      pointercancelHandler.setListener(doc, y),
                      pointeroutHandler.setListener(doc, k))
                    : mouseoutHandler.setListener(doc, k))
              },
              k = function (a) {
                hoverTouchRefCurr.isHovered &&
                  !l(targetCurr, a.relatedTarget) &&
                  ((hoverTouchRefCurr.isHovered = !1),
                  onHoverEnd && onHoverEnd(j('hoverend', a, targetCurr)),
                  onHoverChange && onHoverChange(!1),
                  y(a))
              },
              x = function (a) {
                hoverTouchRefCurr.isTouched = !1
                if (disabled === !0) {
                  y(a)
                  return
                }
                hoverTouchRefCurr.isHovered &&
                  onHoverMove &&
                  onHoverMove(j('hovermove', a, targetCurr))
              },
              y = function (a) {
                ;(hoverTouchRefCurr.isTouched = !1),
                  d('ReactEventHelpers').hasPointerEvents
                    ? (pointermoveHandler.setListener(doc, null),
                      pointercancelHandler.setListener(doc, null),
                      pointeroutHandler.setListener(doc, null))
                    : mouseoutHandler.setListener(doc, null),
                  k(a)
              }
            d('ReactEventHelpers').hasPointerEvents
              ? pointeroverHandler.setListener(targetCurr, function (a) {
                  a.pointerType !== 'touch' && i(a)
                })
              : (mouseoverHandler.setListener(targetCurr, function (a) {
                  hoverTouchRefCurr.isTouched || i(a)
                }),
                touchstartHandler.setListener(targetCurr, function () {
                  hoverTouchRefCurr.isTouched = !0
                }),
                mousemoveHandler.setListener(doc, x))
            hoverTouchRefCurr.isHovered &&
              (d('ReactEventHelpers').hasPointerEvents
                ? (pointermoveHandler.setListener(doc, x),
                  pointercancelHandler.setListener(doc, y),
                  pointeroutHandler.setListener(doc, k))
                : mouseoutHandler.setListener(doc, k))
          }
        },
        [
          disabled,
          onHoverChange,
          onHoverEnd,
          onHoverMove,
          onHoverStart,
          pointercancelHandler,
          pointermoveHandler,
          pointeroutHandler,
          pointeroverHandler,
          mousemoveHandler,
          mouseoutHandler,
          mouseoverHandler,
          target,
          touchstartHandler,
        ],
      )
    }
    g.useHover = a
  },
  98,
)

*/
