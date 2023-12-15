/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useKeyboard } from '@negiganaito/keyboards'
import React, {
  ReactNode,
  // @ts-ignore
  unstable_Scope,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react'
import { jsx } from 'react/jsx-runtime'

import { ActiveFocusRegionUtilsContext, useUnsafeRef_DEPRECATED } from '@/faang/hooks'
import { ReactFocusEvent, stopEventHookPropagation } from '@/faang/react-interactions'

import {
  focusElement,
  focusFirst,
  focusNextContained,
  focusPreviousContained,
  getAllNodesFromOneOrManyQueries,
  getFirstNodeFromOneOrManyQueries,
  RecoverFocusStrategy,
  setElementCanTab,
} from '../util'

// type FocusRegionProps = {
//   autoFocusQuery?
//   autoRestoreFocus: boolean
//   children?: ReactNode
//   containFocusQuery?
//   forwardRef?
//   id?: string
//   onEscapeFocusRegion?
//   recoverFocusStrategy?
//   stopOnFocusWithinPropagation?
//   recoverFocusQuery?: boolean
// }

const _map = new Map()

export function FocusRegion({
  autoRestoreFocus,
  autoFocusQuery,
  children,
  containFocusQuery,
  forwardRef,
  id,
  onEscapeFocusRegion,
  recoverFocusStrategy,
  stopOnFocusWithinPropagation,
  recoverFocusQuery,
}) {
  const w =
    recoverFocusStrategy === void 0
      ? RecoverFocusStrategy.Nearest
      : recoverFocusStrategy

  let y =
    stopOnFocusWithinPropagation === void 0 ? !0 : stopOnFocusWithinPropagation
  const z = useRef(null)
  const A = useRef(null)
  const B = useContext(ActiveFocusRegionUtilsContext)

  const a =
    B === null && (autoRestoreFocus || onEscapeFocusRegion)
      ? document.activeElement
      : null
  let C = useUnsafeRef_DEPRECATED(a)
  let D = C.current ?? a

  const E = useMemo(() => {
    return {
      lastFocused: null,
      restorationFocusRegionItem: null,
      scope: null,
      triggeredFocusRegionItems: new Set(),
    }
  }, [])

  const F = useCallback(
    function () {
      if (B != null) {
        let a = B.getActiveFocusRegion()
        if (a !== E) {
          if (E.restorationFocusRegionItem !== a) {
            let b
            if (
              (a == null ? void 0 : a.lastFocused) != null &&
              !((b = z.current) == null
                ? void 0
                : b.containsNode(a.lastFocused))
            )
              a != null && a.triggeredFocusRegionItems.add(E),
                (E.restorationFocusRegionItem = a)
            else if (E.restorationFocusRegionItem == null) {
              b = a == null ? void 0 : a.restorationFocusRegionItem
              E.restorationFocusRegionItem = b
              a != null &&
                (b == null ? void 0 : b.triggeredFocusRegionItems.delete(a))
              b == null ? void 0 : b.triggeredFocusRegionItems.add(E)
              B.setActiveFocusRegion(E)
              return
            }
          }
          ; (a === null ||
            (a != null && E != null && a.lastFocused !== E.lastFocused)) &&
            B.setActiveFocusRegion(E)
        }
      }
    },
    [B, E],
  )

  const G = useRef(null)

  const forcusTarget = useCallback(
    (a) => {
      z.current = a
      E.scope = a
      let b = G.current
      forwardRef && (forwardRef.current = a)
      b !== null && b !== id && _map.get(b) === null && _map.delete(b)
      id != null &&
        (a !== null
          ? ((G.current = id), _map.set(id, a))
          : _map.get(id) === null && _map.delete(id))
    },
    [forwardRef, id, E],
  )

  const ref = useFocusWithin(
    forcusTarget,
    useMemo(() => {
      return {
        onAfterBlurWithin: function () {
          let a = z.current;
          let b = A.current
          A.current = null
          let c = document.activeElement
          if (
            a !== null &&
            recoverFocusQuery != null &&
            b !== null &&
            (c == null || c === document.body || !a.containsNode(c))
          ) {
            c = !0
            let e = !0;
            let f = b.recovery;
            let g = b.recoveryIndex;
            let h = getAllNodesFromOneOrManyQueries(recoverFocusQuery, a)
            if (h !== null && f !== null) {
              let i = new Set(h);
              let j = new Set(f)
              // eslint-disable-next-line no-var
              for (var k = g - 1; k >= 0; k--) {
                // eslint-disable-next-line no-var
                var l = f[k]
                if (i.has(l)) {
                  // eslint-disable-next-line no-var
                  var m = h.indexOf(l)
                  m += 1
                  if (m < h.length) {
                    m = h[m]
                    if (!j.has(m)) {
                      b.detachedCanTab && setElementCanTab(m, !0)
                      o(m, c, e)
                      return
                    }
                  }
                  b.detachedCanTab && setElementCanTab(l, !0)
                  o(l, c, e)
                  return
                }
              }
              if (w === RecoverFocusStrategy.Nearest)
                for (m = g + 1; m < f.length; m++) {
                  l = f[m]
                  if (i.has(l)) {
                    j = h.indexOf(l)
                    k = j - 1
                    if (k >= 0) {
                      g = h[k]
                      b.detachedCanTab && setElementCanTab(g, !0)
                      o(g, c, e)
                      return
                    }
                  }
                }
              l = getFirstNodeFromOneOrManyQueries(recoverFocusQuery, a)
              l && (b.detachedCanTab && setElementCanTab(l, !0), o(l, c, e))
            }
          }
        },
        onBeforeBlurWithin: (a) => {
          let b = z.current
          if (b !== null && recoverFocusQuery !== void 0) {
            a.stopPropagation()
            if (recoverFocusQuery === null) return
            a = a.target
            b = getAllNodesFromOneOrManyQueries(recoverFocusQuery, b)
            if (b === null) return
            let c = b.indexOf(a)
            a = a._tabIndexState
            A.current = {
              detachedCanTab: a != null && a.canTab,
              recovery: b,
              recoveryIndex: c,
            }
          }
        },
        onFocusWithin: function (a) {
          y && stopEventHookPropagation(a, 'useFocusWithin'),
            (E.lastFocused = a.target),
            F()
        },
      }
    }, [recoverFocusQuery, w, y, E, F]),
  )

  const cb = useCallback(() => {
    let a = z.current;
    let b = document.activeElement
    if (autoFocusQuery != null && a !== null && (!b || !a.containsNode(b))) {
      b = E.lastFocused
      b != null && a.containsNode(b) && !p(b)
        ? focusElement(b, {
          focusWithAutoFocus: !0,
          focusWithoutUserIntent: !0,
          preventScroll: !0,
        })
        : focusFirst(autoFocusQuery, a, {
          focusWithAutoFocus: !0,
          focusWithoutUserIntent: !0,
          preventScroll: !0,
        })
    }
  }, [autoFocusQuery, E])

  useLayoutEffect(cb, [cb])
  useEffect(cb, [cb])

  let H = useCallback(
    (a, c) => {
      c === void 0 && (c = !1)
      let e = z.current;
      let f = document.activeElement;
      let g = C.current
      C.current = null
      let h = a == null ? void 0 : a.triggeredFocusRegionItems;
      let i = a == null ? void 0 : a.restorationFocusRegionItem
        ; (h == null ? void 0 : h.size) &&
          h.forEach((a) => {
            return (a.restorationFocusRegionItem = i)
          })
      a != null &&
        i != null &&
        (i.triggeredFocusRegionItems.delete(a),
          (h == null ? void 0 : h.size) &&
          h.forEach((a) => {
            i.triggeredFocusRegionItems.add(a)
          }))
      E.lastFocused = null
      h = B == null ? void 0 : B.getActiveFocusRegion()
      let j =
        h != null
          ? h.restorationFocusRegionItem
          : {
            lastFocused: g,
          }
      h === a && (B == null ? void 0 : B.setActiveFocusRegion(i))
      g =
        (e !== null && f !== null && e.containsNode(f)) ||
        f == null ||
        f === document.body
      if ((autoRestoreFocus === !0 || onEscapeFocusRegion != null) && g) {
        let k = (a) => {
          a === void 0 && (a = !1)
          if ((j == null ? void 0 : j.lastFocused) != null) {
            let b = !0;
            let c = !0;
            let e = document.activeElement
              ; (a || e === null || e === document.body) &&
                focusElement(j.lastFocused, {
                  focusWithoutUserIntent: c,
                  preventScroll: b,
                })
          }
        }
        c
          ? k(c)
          : window.requestAnimationFrame(function () {
            return k()
          })
      }
    },
    [B, autoRestoreFocus, onEscapeFocusRegion, E],
  )

  let I = useCallback(() => {
    H(E, !0), onEscapeFocusRegion && onEscapeFocusRegion()
  }, [H, onEscapeFocusRegion, E])

  useKeyboard(
    z,
    useMemo(() => {
      return {
        onKeyDown: (a) => {
          if (
            containFocusQuery == null ||
            a.key !== 'Tab' ||
            a.isDefaultPrevented()
          )
            return
          let b = z.current
          b !== null &&
            (a.shiftKey
              ? focusPreviousContained(
                containFocusQuery,
                b,
                a,
                !0,
                onEscapeFocusRegion != null ? I : void 0,
              )
              : focusNextContained(
                containFocusQuery,
                b,
                a,
                !0,
                onEscapeFocusRegion != null ? I : void 0,
              ))
        },
      }
    }, [containFocusQuery, I, onEscapeFocusRegion]),
  )

  useLayoutEffect(() => {
    C.current = D
    let a = E
    return function () {
      H(a)
    }
  }, [B, autoRestoreFocus, H, E, D])

  return jsx(unstable_Scope, {
    children: children,
    id: id,
    ref,
  })
}

function o(a, preventScroll, focusWithoutUserIntent) {
  let e = document.activeElement
  window.requestAnimationFrame(function () {
    document.activeElement === e &&
      focusElement(a, {
        focusWithoutUserIntent: focusWithoutUserIntent,
        preventScroll: preventScroll,
      })
  })
}

function p(a) {
  return a.offsetWidth === 0 && a.offsetHeight === 0
}

export function focusRegionById(a, b, c) {
  a = _map.get(a)
  if (a) {
    a = a.DO_NOT_USE_queryFirstNode(b)
    if (a !== null) {
      focusElement(a, {
        preventScroll: c,
      })
      return a
    }
  }
  return null
}
