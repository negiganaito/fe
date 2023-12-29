/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useContext, useEffect, useRef } from "react";

import { HiddenSubtreePassiveContext } from "../context";
import { pointerEventDistance } from "../utils";

// export function useOnOutsideClick(a, b) {
//   let e = useRef(null);
//   let f = useContext(HiddenSubtreePassiveContext);
//   let g = useRef(null);
//   useEffect(() => {
//     let h = e.current;
//     if (!a || !h) return;
//     let i = b || {};
//     let j = i.isTargetEligible;
//     i = i.triggerOutsideClickOnDrag;
//     let k = i === void 0 ? !1 : i;
//     function l(a) {
//       return a instanceof Node && !h.contains(a) && (!j || j(a));
//     }
//     function m(a) {
//       if (a.isPrimary) {
//         let b = l(a.target);
//         b && (g.current = a);
//       }
//     }
//     function n(b) {
//       let c = l(b.target);
//       if (g.current && c && b.isPrimary) {
//         c = pointerEventDistance.isWithinThreshold(g.current, b);
//         (c || k) && a(b);
//       }
//       g.current = null;
//     }
//     function o(b) {
//       l(b.target) && a(b);
//     }
//     let p = "PointerEvent" in window;
//     let q = !1;
//     function r() {
//       q ||
//         (p
//           ? (document.addEventListener("pointerup", n),
//             document.addEventListener("pointerdown", m))
//           : // eslint-disable-next-line no-sequences
//             document.addEventListener("click", o)),
//         (q = !0);
//     }
//     function s() {
//       q &&
//         (p
//           ? (document.removeEventListener("pointerup", n),
//             document.removeEventListener("pointerdown", m))
//           : // eslint-disable-next-line no-sequences
//             document.removeEventListener("click", o)),
//         (q = !1);
//     }
//     i = f.getCurrentState();
//     i.hiddenOrBackgrounded || r();
//     let t = f.subscribeToChanges((a) => {
//       a.hiddenOrBackgrounded
//         ? //  TODO
//           setTimeout(() => {
//             s();
//           }, 0)
//         : r();
//     });
//     return function () {
//       t.remove();
//       s();
//     };
//   }, [a, f, b]);
//   return e;
// }

export function useOnOutsideClick(onClickOutside, options) {
  const targetRef = useRef(null);
  const hiddenSubtreeContext = useContext(HiddenSubtreePassiveContext);
  const clickEventRef = useRef(null);

  useEffect(() => {
    const targetElement = targetRef.current;
    if (!onClickOutside || !targetElement) return;

    const { isTargetEligible, triggerOutsideClickOnDrag = false } =
      options || {};

    function isOutsideTargetElement(target) {
      return (
        target instanceof Node &&
        !targetElement.contains(target) &&
        (!isTargetEligible || isTargetEligible(target))
      );
    }

    function handlePointerDown(event) {
      if (event.isPrimary) {
        const isOutside = isOutsideTargetElement(event.target);
        isOutside && (clickEventRef.current = event);
      }
    }

    function handlePointerUp(event) {
      const isOutside = isOutsideTargetElement(event.target);
      if (clickEventRef.current && isOutside && event.isPrimary) {
        const isWithinThreshold = pointerEventDistance.isWithinThreshold(
          clickEventRef.current,
          event
        );
        (isWithinThreshold || triggerOutsideClickOnDrag) &&
          onClickOutside(event);
      }
      clickEventRef.current = null;
    }

    function handleClick(event) {
      isOutsideTargetElement(event.target) && onClickOutside(event);
    }

    const supportsPointerEvents = "PointerEvent" in window;
    let eventListenersAttached = false;

    function attachEventListeners() {
      if (!eventListenersAttached) {
        supportsPointerEvents
          ? (document.addEventListener("pointerup", handlePointerUp),
            document.addEventListener("pointerdown", handlePointerDown))
          : document.addEventListener("click", handleClick);

        eventListenersAttached = true;
      }
    }

    function detachEventListeners() {
      if (eventListenersAttached) {
        supportsPointerEvents
          ? (document.removeEventListener("pointerup", handlePointerUp),
            document.removeEventListener("pointerdown", handlePointerDown))
          : document.removeEventListener("click", handleClick);

        eventListenersAttached = false;
      }
    }

    const initialContextState = hiddenSubtreeContext.getCurrentState();
    initialContextState.hiddenOrBackgrounded
      ? setTimeout(() => detachEventListeners(), 0)
      : attachEventListeners();

    const subscription = hiddenSubtreeContext.subscribeToChanges((state) => {
      state.hiddenOrBackgrounded
        ? setTimeout(() => detachEventListeners(), 0)
        : attachEventListeners();
    });

    return () => {
      subscription.remove();
      detachEventListeners();
    };
  }, [onClickOutside, options, hiddenSubtreeContext]);

  return targetRef;
}
