/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable no-sequences */

import {
  unstable_Scope,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { jsx } from "react/jsx-runtime";

import { ActiveFocusRegionUtilsContext } from "@/faang/context";
import { useUnsafeRef_DEPRECATED } from "@/faang/hooks";
import {
  ReactEventHookPropagation,
  ReactFocusEvent,
  ReactKeyboardEvent,
} from "@/faang/react-interactions";

import { FocusManager } from "./focus-element";
import { FocusRegionType } from "./focus-region-type";
import { setElementCanTab } from "./set-element-can-tab";

function q(a, b, c) {
  let e = document.activeElement;
  window.requestAnimationFrame(() => {
    document.activeElement === e &&
      FocusManager.focusElement(a, {
        preventScroll: b,
        focusWithoutUserIntent: c,
      });
  });
}

function r(a) {
  return a.offsetWidth === 0 && a.offsetHeight === 0;
}

let t = new Map();

function a(a) {
  let b = a.autoRestoreFocus;
  let e = a.autoFocusQuery;
  let f = a.children;
  let g = a.containFocusQuery;
  let i = a.forwardRef;
  let u = a.id;
  let v = a.onEscapeFocusRegion;
  let w = a.recoverFocusStrategy;
  let x = w === void 0 ? FocusRegionType.RecoverFocusStrategy.Nearest : w;
  let y = a.recoverFocusQuery;
  w = a.stopOnFocusWithinPropagation;
  let z = w === void 0 ? !0 : w;
  let A = useRef(null);
  let B = useRef(null);
  let C = useContext(ActiveFocusRegionUtilsContext);
  a = C === null && (b === !0 || v) ? document.activeElement : null;
  let D = useUnsafeRef_DEPRECATED(a);
  // eslint-disable-next-line no-cond-assign
  let E = (w = D.current) ? w : a;
  let F = useMemo(() => {
    return {
      lastFocused: null,
      scope: null,
      restorationFocusRegionItem: null,
      triggeredFocusRegionItems: new Set(),
    };
  }, []);
  let G = useCallback(() => {
    if (C) {
      let a = C.getActiveFocusRegion();
      if (a !== F) {
        if (F.restorationFocusRegionItem !== a) {
          let b;
          if (
            (!a ? void 0 : a.lastFocused) &&
            !(!(b = A.current) ? void 0 : b.containsNode(a.lastFocused))
          )
            a && a.triggeredFocusRegionItems.add(F),
              (F.restorationFocusRegionItem = a);
          else if (!F.restorationFocusRegionItem) {
            b = !a ? void 0 : a.restorationFocusRegionItem;
            F.restorationFocusRegionItem = b;
            a && (!b ? void 0 : b.triggeredFocusRegionItems["delete"](a));
            !b ? void 0 : b.triggeredFocusRegionItems.add(F);
            C.setActiveFocusRegion(F);
            return;
          }
        }
        (a === null || (a && F && a.lastFocused !== F.lastFocused)) &&
          C.setActiveFocusRegion(F);
      }
    }
  }, [C, F]);
  let H = useRef(null);
  let I = useCallback(
    (a) => {
      A.current = a;
      F.scope = a;
      let b = H.current;
      i && (i.current = a);
      b !== null && b !== u && t.get(b) === null && t["delete"](b);
      u &&
        (a !== null
          ? ((H.current = u), t.set(u, a))
          : t.get(u) === null && t["delete"](u));
    },
    [i, u, F]
  );
  I = ReactFocusEvent.useFocusWithinStrictMode(
    useMemo(() => {
      return {
        initializer: I,
        onBeforeBlurWithin: function (a) {
          let b = A.current;
          if (b !== null && y !== void 0) {
            a.stopPropagation();
            if (y === null) return;
            a = a.target;
            b = FocusManager.getAllNodesFromOneOrManyQueries(y, b);
            if (b === null) return;
            let c = b.indexOf(a);
            a = a._tabIndexState;
            B.current = {
              detachedCanTab: a && a.canTab,
              recoveryIndex: c,
              recovery: b,
            };
          }
        },
        // eslint-disable-next-line complexity
        onAfterBlurWithin: function () {
          let a = A.current;
          let b = B.current;
          B.current = null;
          let c = document.activeElement;
          if (
            a !== null &&
            y &&
            b !== null &&
            (!c || c === document.body || !a.containsNode(c))
          ) {
            c = !0;
            let e = !0;
            let f = b.recovery;
            let g = b.recoveryIndex;
            let h = FocusManager.getAllNodesFromOneOrManyQueries(y, a);
            if (h !== null && f !== null) {
              let i = new Set(h);
              let j = new Set(f);
              // eslint-disable-next-line no-inner-declarations, no-var
              for (var k = g - 1; k >= 0; k--) {
                // eslint-disable-next-line no-inner-declarations, no-var
                var l = f[k];
                if (i.has(l)) {
                  // eslint-disable-next-line no-inner-declarations, no-var
                  var m = h.indexOf(l);
                  m = m + 1;
                  if (m < h.length) {
                    m = h[m];
                    // eslint-disable-next-line max-depth
                    if (!j.has(m)) {
                      b.detachedCanTab &&
                        setElementCanTab.setElementCanTab(m, !0);
                      q(m, c, e);
                      return;
                    }
                  }
                  b.detachedCanTab && setElementCanTab.setElementCanTab(l, !0);
                  q(l, c, e);
                  return;
                }
              }
              if (x === FocusRegionType.RecoverFocusStrategy.Nearest)
                for (m = g + 1; m < f.length; m++) {
                  l = f[m];
                  if (i.has(l)) {
                    j = h.indexOf(l);
                    k = j - 1;
                    // eslint-disable-next-line max-depth
                    if (k >= 0) {
                      g = h[k];
                      b.detachedCanTab &&
                        setElementCanTab.setElementCanTab(g, !0);
                      q(g, c, e);
                      return;
                    }
                  }
                }
              l = FocusManager.getFirstNodeFromOneOrManyQueries(y, a);
              l &&
                (b.detachedCanTab && setElementCanTab.setElementCanTab(l, !0),
                q(l, c, e));
            }
          }
        },
        onFocusWithin: function (a) {
          z &&
            ReactEventHookPropagation.stopEventHookPropagation(
              a,
              "useFocusWithin"
            ),
            (F.lastFocused = a.target),
            G();
        },
      };
    }, [y, x, z, F, G])
  );
  w = useCallback(() => {
    let a = A.current;
    let b = document.activeElement;
    if (e && a !== null && (!b || !a.containsNode(b))) {
      b = F.lastFocused;
      b && a.containsNode(b) && !r(b)
        ? FocusManager.focusElement(b, {
            focusWithAutoFocus: !0,
            focusWithoutUserIntent: !0,
            preventScroll: !0,
          })
        : FocusManager.focusFirst(e, a, {
            focusWithAutoFocus: !0,
            focusWithoutUserIntent: !0,
            preventScroll: !0,
          });
    }
  }, [e, F]);
  useLayoutEffect(w, [w]);
  useEffect(w, [w]);
  let J = useCallback(
    // eslint-disable-next-line complexity
    (a, c) => {
      c === void 0 && (c = !1);
      let e = A.current;
      let f = document.activeElement;
      let g = D.current;
      D.current = null;
      let h = !a ? void 0 : a.triggeredFocusRegionItems;
      let i = !a ? void 0 : a.restorationFocusRegionItem;
      (!h ? void 0 : h.size) &&
        h.forEach((a) => {
          // eslint-disable-next-line no-return-assign
          return (a.restorationFocusRegionItem = i);
        });
      a &&
        i &&
        (i.triggeredFocusRegionItems["delete"](a),
        (!h ? void 0 : h.size) &&
          h.forEach((a) => {
            i.triggeredFocusRegionItems.add(a);
          }));
      F.lastFocused = null;
      h = !C ? void 0 : C.getActiveFocusRegion();
      let j = h
        ? h.restorationFocusRegionItem
        : {
            lastFocused: g,
          };
      h === a && (!C ? void 0 : C.setActiveFocusRegion(i));
      g =
        (e !== null && f !== null && e.containsNode(f)) ||
        !f ||
        f === document.body;
      if ((b === !0 || v) && g) {
        let k = function (a) {
          a === void 0 && (a = !1);
          if (!j ? void 0 : j.lastFocused) {
            let b = !0;
            let c = !0;
            let e = document.activeElement;
            (a || e === null || e === document.body) &&
              FocusManager.focusElement(j.lastFocused, {
                preventScroll: b,
                focusWithoutUserIntent: c,
              });
          }
        };
        c
          ? k(c)
          : window.requestAnimationFrame(() => {
              return k();
            });
      }
    },
    [C, b, v, F]
  );
  let K = useCallback(() => {
    J(F, !0), v && v();
  }, [J, v, F]);
  ReactKeyboardEvent.useKeyboard(
    A,
    useMemo(() => {
      return {
        onKeyDown: function (a) {
          if (!g || a.key !== "Tab" || a.isDefaultPrevented()) return;
          let b = A.current;
          b !== null &&
            (a.shiftKey
              ? FocusManager.focusPreviousContained(g, b, a, !0, v ? K : void 0)
              : FocusManager.focusNextContained(g, b, a, !0, v ? K : void 0));
        },
      };
    }, [g, K, v])
  );
  useLayoutEffect(() => {
    D.current = E;
    let a = F;
    return function () {
      J(a);
    };
  }, [C, b, J, F, E]);
  return jsx(unstable_Scope, {
    ref: I,
    id: u,
    children: f,
  });
}

function b(a, b, c) {
  a = t.get(a);
  if (a) {
    a = a.DO_NOT_USE_queryFirstNode(b);
    if (a !== null) {
      FocusManager.focusElement(a, {
        preventScroll: c,
      });
      return a;
    }
  }
  return null;
}

export const FocusRegionStrictMode = {
  FocusRegion: a,
  focusRegionById: b,
};
