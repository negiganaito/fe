/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
'use client'

import * as stylex from '@stylexjs/stylex';
import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import { jsx } from 'react/jsx-runtime'

import {
  BaseContextualLayerAnchorRootContext,
  BaseContextualLayerAvailableHeightContext,
  BaseContextualLayerContextSizeContext,
  BaseContextualLayerLayerAdjustmentContext,
  BaseContextualLayerOrientationContext,
  BaseLinkNestedPressableContext,
  BaseScrollableAreaContext,
  BaseViewportMarginsContext,
  HiddenSubtreeContext,
  LayoutAnimationBoundaryContext,
} from '@/faang/context'
import { BasePortal } from '@/faang/dialog'
import {
  FocusRegion,
  focusScopeQueries,
} from '@/faang/focus-region'
import { CometTextContext, mergeRefs, useLayoutAnimationEvents, useResizeObserver } from '@/faang/hooks'
import { calculateBaseContextualLayerPosition } from '@/faang/utils'
import { LayoutAnimationEventType } from '@/faang/utils/common/layout-animation-events'
import { isElementFixedOrSticky } from '@/faang/utils/is-element-fixed-or-sticky'

import { BaseContextualLayerAnchorRoot } from './base-contextual-layer-anchor-root'
import BaseContextualLayerDefaultContainer from './base-contextual-layer-default-container'

// type BaseContextualLayerProps = {
//   align?
//   disableAutoAlign?
//   children?
//   containFocus?
//   customContainer?
//   disableAutoFlip?
//   hidden?
//   imperativeRef?
//   onEscapeFocusRegion?
//   onIndeterminatePosition?
//   presencePayload?
//   position?
//   stopClickPropagation?
//   className?: string
//   //
//   context_DEPRECATED?
//   contextRef?
// }

const styles = stylex.create({
  root: {
    left: '0',
    marginRight: '-9999px',
    position: 'absolute',
    top: '0',
  },
})

const w = false // d('Locale').isRTL()

const u = 8

const BaseContextualLayer = forwardRef(
  (
    {
      align = 'start',
      disableAutoAlign = false,
      children,
      containFocus = false,
      customContainer = BaseContextualLayerDefaultContainer,
      disableAutoFlip = false,
      hidden = false,
      imperativeRef,
      onEscapeFocusRegion,
      onIndeterminatePosition,
      presencePayload,
      position = 'below',
      stopClickPropagation = false,
      xstyle,
      ...rest
    },
    ref,
  ) => {

    const [
      {
        adjustment: baseContextualLayerLayerAdjustmentValue,
        availableHeight: baseContextualLayerAvailableHeightValue,
        contextSize: baseContextualLayerContextSizeValue,
        isPositionIndeterminate: H,
        position: I,
      },
      J,
    ] = useReducer(ca, position, ba)

    const baseContextualLayerAnchorRootValue = useContext(
      BaseContextualLayerAnchorRootContext,
    )

    const L = useContext(BaseScrollableAreaContext)
    const M = useContext(BaseViewportMarginsContext)
    const N = useContext(LayoutAnimationBoundaryContext)

    const [a, O] = useState(!1)

    const { hidden: G } = useContext(HiddenSubtreeContext)

    const P = G || hidden

    const Q = useRef(null)
    const R = useRef(null)

    const S = useCallback(
      function () {
        return rest.context_DEPRECATED == null && rest.contextRef != null
          ? rest.contextRef.current
          : rest.context_DEPRECATED
      },
      [rest.contextRef, rest.context_DEPRECATED],
    )

    const T = useCallback(() => {
      const a = document.documentElement
      if (a == null) {
        return
      }
      return {
        bottom: a.clientHeight - M.bottom - u,
        left: M.left + u,
        right: a.clientWidth - M.right - u,
        top: M.top + u,
      }
    }, [M.bottom, M.left, M.right, M.top])

    const U = useCallback(
      function () {
        let a = Q.current;
        let b = S();
        let c = T()
        if (a == null || b == null || c == null) return
        b = r(b)
        a = r(a)
        const d = a.bottom - a.top
        a = a.right - a.left
        let e = w ? 'start' : 'end';
        let f = w ? 'end' : 'start';
        let g = I;
        let h = null
        disableAutoFlip ||
          (I === 'above' || I === 'below'
            ? I === 'above' && b.top - d < c.top && b.bottom + d < c.bottom
              ? (g = 'below')
              : I === 'above' && s(L) + b.top < d
                ? (g = 'below')
                : I === 'below' &&
                b.bottom + d > c.bottom &&
                b.top - d > c.top &&
                (g = 'above')
            : (I === 'start' || I === 'end') &&
            (I === f && b.left - a < c.left && b.right + a < c.right
              ? (g = e)
              : I === e &&
              b.right + a > c.right &&
              b.left - a > c.left &&
              (g = f)))
        g === 'above' || g === 'below'
          ? (h = g === 'above' ? b.top - c.top : c.bottom - b.bottom)
          : (g === 'start' || g === 'end') &&
          (h = Math.max(c.bottom, b.bottom) - Math.min(b.top, c.top))

        R.current = {
          height: d,
          width: a,
        }
        J({
          availableHeight: h,
          position: g,
          type: 'determine_direction',
        })
      },
      [S, T, disableAutoFlip, I],
    )

    const V = useCallback(
      function () {
        let a = document.documentElement;
        let b = baseContextualLayerAnchorRootValue.current;
        let d = T();
        let e = S()
        if (!a || !b || !d || !e) {
          return
        }
        const h = t(b)
        if (!h) {
          return
        }
        b = isElementFixedOrSticky(b)

        b = !b && e.nodeType === 1 && isElementFixedOrSticky(e)

        e = L.map(function (a) {
          return a.getDOMNode()
        })
          .filter(Boolean)
          .filter(function (a) {
            return h.contains(a)
          })
          .reduce(function (a, b) {
            return a != null ? v(a, r(b)) : null
          }, r(e))
        if (e == null || (e.left === 0 && e.right === 0)) {
          J({
            type: 'position_indeterminate',
          })
          onIndeterminatePosition && onIndeterminatePosition()
          return
        }
        a = b
          ? {
            bottom: a.clientHeight,
            left: 0,
            right: a.clientWidth,
            top: 0,
          }
          : r(h)
        b = calculateBaseContextualLayerPosition({
          align,
          contextRect: e,
          contextualLayerSize: disableAutoAlign ? null : R.current,
          fixed: b,
          offsetRect: a,
          position: I,
          screenRect: d,
        })
        a = b.adjustment
        d = b.style
        b = Q.current
        if (b) {
          const i = Object.keys(d)
          for (let j = 0; j < i.length; j++) {
            const k = i[j];
            const l = d[k]
            l ? b.style.setProperty(k, l) : b.style.removeProperty(k)
          }
        }
        J({
          adjustment: a,
          contextSize: {
            height: e.bottom - e.top,
            width: e.right - e.left,
          },
          type: 'reposition',
        })
      },
      [
        baseContextualLayerAnchorRootValue,
        T,
        S,
        L,
        disableAutoAlign,
        align,
        I,
        onIndeterminatePosition,
      ],
    )

    const W = useCallback(
      function (a) {
        a === LayoutAnimationEventType.Start && O(!0),
          a === LayoutAnimationEventType.Stop && (O(!1), V())
      },
      [V, O],
    )

    useLayoutEffect(
      function () {
        N != null && N.getIsAnimating() && W(LayoutAnimationEventType.Start)
      },
      [N, W],
    )

    useLayoutAnimationEvents(W)

    useImperativeHandle(
      imperativeRef,
      function () {
        return {
          reposition: function (a) {
            if (!P) {
              a = a || {}
              a = a.autoflip
              a = a === void 0 ? !1 : a
              a && U()
              V()
            }
          },
        }
      },
      [P, V, U],
    )

    const X = useResizeObserver(function (a) {
      const b = a.height
      a = a.width
      R.current = {
        height: b,
        width: a,
      }
      V()
    })

    const Y = useRef(position)

    useLayoutEffect(function () {
      position !== Y.current &&
        (J({
          position,
          type: 'position_changed',
        }),
          P || (U(), V()),
          (Y.current = position))
    })

    const Z = useCallback(
      function (a) {
        Q.current = a
        a != null && !P && (U(), V())
      },
      [P, V, U],
    )

    useEffect(() => {
      if (P) return
      const a = function () {
        U(), V()
      }
      window.addEventListener('resize', a)
      return function () {
        window.removeEventListener('resize', a)
      }
    }, [P, V, U])

    useEffect(() => {
      if (P) return
      const a = L.map(function (a) {
        return a.getDOMNode()
      }).filter(Boolean)
      if (a.length > 0) {
        a.forEach(function (a) {
          return a.addEventListener('scroll', V, {
            passive: !0,
          })
        })
        return function () {
          a.forEach(function (a) {
            return a.removeEventListener('scroll', V, {
              passive: !0,
            })
          })
        }
      }
    }, [P, V, L])

    useEffect(
      function () {
        if (window.addEventListener == null || P) return
        window.addEventListener('scroll', V, {
          passive: !0,
        })
        return function () {
          window.removeEventListener('scroll', V, {
            // @ts-ignore
            passive: !0,
          })
        }
      },
      [P, V],
    )

    const _ref = useMemo(
      function () {
        return mergeRefs(Z, X, ref)
      },
      [Z, X, ref],
    )

    const baseContextualLayerOrientationValue = useMemo(
      function () {
        return {
          align: align,
          position: I,
        }
      },
      [align, I],
    )

    const $ = hidden || H

    return (
      <BasePortal
        target={baseContextualLayerAnchorRootValue.current}
        children={jsx(customContainer, {
          children: jsx(FocusRegion.FocusRegion, {
            autoFocusQuery:
              !$ && containFocus ? focusScopeQueries.headerFirstTabbableSecondScopeQuery : null,
            autoRestoreFocus: !$,
            children: jsx(BaseContextualLayerAnchorRoot, {
              children: jsx(BaseContextualLayerContextSizeContext.Provider, {
                children: jsx(
                  BaseContextualLayerLayerAdjustmentContext.Provider,
                  {
                    children: jsx(
                      BaseContextualLayerAvailableHeightContext.Provider,
                      {
                        children: jsx(
                          BaseContextualLayerOrientationContext.Provider,
                          {
                            children: jsx(
                              BaseLinkNestedPressableContext.Provider,
                              {
                                children: jsx(CometTextContext.Provider, {
                                  children: children,
                                  value: null,
                                }),
                                value: !1,
                              },
                            ),
                            value: baseContextualLayerOrientationValue,
                          },
                        ),
                        value: baseContextualLayerAvailableHeightValue,
                      },
                    ),
                    value: baseContextualLayerLayerAdjustmentValue,
                  },
                ),
                value: baseContextualLayerContextSizeValue,
              }),
            }),
            containFocusQuery: !$ && containFocus ? focusScopeQueries.tabbableScopeQuery : null,
            onEscapeFocusRegion: onEscapeFocusRegion,
            recoverFocusQuery: $ ? null : focusScopeQueries.headerFirstTabbableSecondScopeQuery,
          }),
          hidden: hidden || H || a,
          presencePayload: presencePayload,
          ref: _ref,
          stopClickPropagation: stopClickPropagation,
          testid: void 0,
          xstyle: [styles.root, xstyle],
        })}
      />
    )
  },
)

function ca(state, option) {
  let c
  switch (option.type) {
    case 'determine_direction':
      if (
        state.position !== option.position ||
        state.availableHeight !== option.availableHeight
      )
        return Object.assign({}, state, {
          availableHeight: option.availableHeight,
          position: option.position,
        })
      break
    case 'reposition':
      if (
        state.adjustment !== option.adjustment ||
        ((c = state.contextSize) == null ? void 0 : c.height) !==
        ((c = option.contextSize) == null ? void 0 : c.height) ||
        ((c = state.contextSize) == null ? void 0 : c.width) !==
        ((c = option.contextSize) == null ? void 0 : c.width)
      )
        return Object.assign({}, state, {
          adjustment: option.adjustment,
          contextSize: option.contextSize,
          isPositionIndeterminate: !1,
        })
      break
    case 'position_indeterminate':
      return Object.assign({}, state, {
        isPositionIndeterminate: !0,
      })
    case 'position_changed':
      if (state.position !== option.position)
        return Object.assign({}, state, {
          position: option.position,
        })
      break
  }
  return state
}

function ba(position) {
  return {
    adjustment: null,
    availableHeight: null,
    contextSize: null,
    isPositionIndeterminate: !1,
    position,
  }
}

function r(a) {
  a = a.getBoundingClientRect()
  return {
    bottom: a.bottom,
    left: a.left,
    right: a.right,
    top: a.top,
  }
}

function s(a) {
  return (a = !(a = a[a.length - 1])
    ? void 0
    : !(a = a.getDOMNode())
      ? void 0
      : a.scrollTop) != null
    ? a
    : window.pageYOffset
}

function t(a) {
  const b = getComputedStyle(a)
  return b && b.getPropertyValue('position') !== 'static'
    ? a
    : (a instanceof HTMLElement && a.offsetParent) ||
    a.ownerDocument.documentElement
}

function v(a, b) {
  return a.bottom < b.top ||
    b.bottom < a.top ||
    a.right < b.left ||
    b.right < b.left
    ? null
    : {
      bottom: Math.min(a.bottom, b.bottom),
      left: Math.max(a.left, b.left),
      right: Math.min(a.right, b.right),
      top: Math.max(a.top, b.top),
    }
}

export default BaseContextualLayer
