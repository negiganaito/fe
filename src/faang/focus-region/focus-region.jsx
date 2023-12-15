/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import {
  unstable_Scope,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react'
import { jsx } from 'react/jsx-runtime'

import { ActiveFocusRegionUtilsContext } from '@/faang/context'
import { useUnsafeRef_DEPRECATED } from '@/faang/hooks'
import { ReactEventHookPropagation, ReactFocusEvent, ReactKeyboardEvent } from '@/faang/react-interactions'

import { FocusManager } from './focus-element'
import { FocusRegionType } from './focus-region-type'
import { setElementCanTab } from './set-element-can-tab'

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

export function _FocusRegion({
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
    recoverFocusStrategy === undefined
      ? FocusRegionType.Nearest
      : recoverFocusStrategy

  let y =
    stopOnFocusWithinPropagation === undefined ? true : stopOnFocusWithinPropagation
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
    () => {
      if (B != null) {
        let a = B.getActiveFocusRegion()
        if (a !== E) {
          if (E.restorationFocusRegionItem !== a) {
            let b
            if (
              (a == null ? undefined : a.lastFocused) != null &&
              !((b = z.current) == null
                ? undefined
                : b.containsNode(a.lastFocused))
            )
              a != null && a.triggeredFocusRegionItems.add(E),
                (E.restorationFocusRegionItem = a)
            else if (E.restorationFocusRegionItem == null) {
              b = a == null ? undefined : a.restorationFocusRegionItem
              E.restorationFocusRegionItem = b
              a != null &&
                (b == null ? undefined : b.triggeredFocusRegionItems.delete(a))
              b == null ? undefined : b.triggeredFocusRegionItems.add(E)
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

  const ref = ReactFocusEvent.useFocusWithin(
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
            c = true
            let e = true;
            let f = b.recovery;
            let g = b.recoveryIndex;
            let h = FocusManager.getAllNodesFromOneOrManyQueries(recoverFocusQuery, a)
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
                      b.detachedCanTab && setElementCanTab.setElementCanTab(m, true)
                      deferredFocusElement(m, c, e)
                      return
                    }
                  }
                  b.detachedCanTab && setElementCanTab.setElementCanTab(l, true)
                  deferredFocusElement(l, c, e)
                  return
                }
              }
              if (w === FocusRegionType.Nearest)
                for (m = g + 1; m < f.length; m++) {
                  l = f[m]
                  if (i.has(l)) {
                    j = h.indexOf(l)
                    k = j - 1
                    if (k >= 0) {
                      g = h[k]
                      b.detachedCanTab && setElementCanTab.setElementCanTab(g, true)
                      deferredFocusElement(g, c, e)
                      return
                    }
                  }
                }
              l = FocusManager.getFirstNodeFromOneOrManyQueries(recoverFocusQuery, a)
              l && (b.detachedCanTab && setElementCanTab.setElementCanTab(l, true), deferredFocusElement(l, c, e))
            }
          }
        },
        onBeforeBlurWithin: (a) => {
          let b = z.current
          if (b !== null && recoverFocusQuery !== undefined) {
            a.stopPropagation()
            if (recoverFocusQuery === null) return
            a = a.target
            b = FocusManager.getAllNodesFromOneOrManyQueries(recoverFocusQuery, b)
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
          y && ReactEventHookPropagation.stopEventHookPropagation(a, 'useFocusWithin'),
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
      b != null && a.containsNode(b) && !isElementHidden(b)
        ? FocusManager.focusElement(b, {
          focusWithAutoFocus: true,
          focusWithoutUserIntent: true,
          preventScroll: true,
        })
        : FocusManager.focusFirst(autoFocusQuery, a, {
          focusWithAutoFocus: true,
          focusWithoutUserIntent: true,
          preventScroll: true,
        })
    }
  }, [autoFocusQuery, E])

  useLayoutEffect(cb, [cb])
  useEffect(cb, [cb])

  let H = useCallback(
    (a, c) => {
      c === undefined && (c = false)
      let e = z.current;
      let f = document.activeElement;
      let g = C.current
      C.current = null
      let h = a == null ? undefined : a.triggeredFocusRegionItems;
      let i = a == null ? undefined : a.restorationFocusRegionItem
        ; (h == null ? undefined : h.size) &&
          h.forEach((a) => {
            return (a.restorationFocusRegionItem = i)
          })
      a != null &&
        i != null &&
        (i.triggeredFocusRegionItems.delete(a),
          (h == null ? undefined : h.size) &&
          h.forEach((a) => {
            i.triggeredFocusRegionItems.add(a)
          }))
      E.lastFocused = null
      h = B == null ? undefined : B.getActiveFocusRegion()
      let j =
        h != null
          ? h.restorationFocusRegionItem
          : {
            lastFocused: g,
          }
      h === a && (B == null ? undefined : B.setActiveFocusRegion(i))
      g =
        (e !== null && f !== null && e.containsNode(f)) ||
        f == null ||
        f === document.body
      if ((autoRestoreFocus === true || onEscapeFocusRegion != null) && g) {
        let k = (a) => {
          a === undefined && (a = false)
          if ((j == null ? undefined : j.lastFocused) != null) {
            let b = true;
            let c = true;
            let e = document.activeElement
              ; (a || e === null || e === document.body) &&
                FocusManager.focusElement(j.lastFocused, {
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
    H(E, true), onEscapeFocusRegion && onEscapeFocusRegion()
  }, [H, onEscapeFocusRegion, E])

  ReactKeyboardEvent.useKeyboard(
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
              ? FocusManager.focusPreviousContained(
                containFocusQuery,
                b,
                a,
                true,
                onEscapeFocusRegion != null ? I : undefined,
              )
              : FocusManager.focusNextContained(
                containFocusQuery,
                b,
                a,
                true,
                onEscapeFocusRegion != null ? I : undefined,
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

// function o(a, preventScroll, focusWithoutUserIntent) {
//   let e = document.activeElement
//   window.requestAnimationFrame(function () {
//     document.activeElement === e &&
//       focusElement(a, {
//         focusWithoutUserIntent: focusWithoutUserIntent,
//         preventScroll: preventScroll,
//       })
//   })
// }


function deferredFocusElement(targetElement, preventScroll, focusWithoutUserIntent) {
  let originalActiveElement = document.activeElement;
  window.requestAnimationFrame(() => {
    if (document.activeElement === originalActiveElement) {
      FocusManager.focusElement(targetElement, {
        focusWithoutUserIntent,
        preventScroll
      });
    }
  });
}

// function p(a) {
//   return a.offsetWidth === 0 && a.offsetHeight === 0
// }

function isElementHidden(element) {
  return element.offsetWidth === 0 && element.offsetHeight === 0;
}

// export function focusRegionById(a, b, c) {
//   a = _map.get(a)
//   if (a) {
//     a = a.DO_NOT_USE_queryFirstNode(b)
//     if (a !== null) {
//       focusElement(a, {
//         preventScroll: c,
//       })
//       return a
//     }
//   }
//   return null
// }


function focusRegionById(regionId, selector, preventScroll) {
  const region = _map.get(regionId);
  if (region) {
    const focusedNode = region.DO_NOT_USE_queryFirstNode(selector);
    if (focusedNode !== null) {
      FocusManager.focusElement(focusedNode, {
        preventScroll
      });
      return focusedNode;
    }
  }
  return null;
}


export const FocusRegion = {
  FocusRegion: _FocusRegion,
  focusRegionById
}
