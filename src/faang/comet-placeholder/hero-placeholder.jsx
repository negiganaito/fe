/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import {
  Fragment,
  Suspense,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
} from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'

import { useStable } from '@/faang/hooks'
import { HeroFallbackTracker } from '@/faang/trace/hero-fallback-tracker'
import { HeroInteractionContext } from '@/faang/trace/hero-interaction-context'
import { HeroInteractionIDContext } from '@/faang/trace/hero-interaction-id-context'
import { HeroPlaceholderUtils } from '@/faang/trace/hero-placeholder-utils'

// type HeroPlaceholderProps = {
//   children?: ReactNode
//   fallback?: ReactNode
//   name?: string
//   unstable_avoidThisFallback?: any
//   unstable_onSuspense?: any
// }

function m({ cb }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ref = useRef(false)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(function () {
    ref.current || (cb(), (ref.current = true))
  })
  return null
}

export function HeroPlaceholder({
  name,
  children,
  fallback,
  unstable_avoidThisFallback,
  unstable_onSuspense,
}) {
  const heroInteractionContextValue = useContext(HeroInteractionContext)
  const heroInteractionIDContextValue = useContext(HeroInteractionIDContext)

  const simpleUUID1 = useStable(HeroPlaceholderUtils.getSimpleUUID)
  const simpleUUID2 = useStable(HeroPlaceholderUtils.getSimpleUUID)

  const ref = useRef(false)

  const childrenClone = children

  const suspenseCallback = useCallback(
    (cbProps) => {
      if (heroInteractionIDContextValue !== null) {
        heroInteractionContextValue.suspenseCallback(
          heroInteractionIDContextValue,
          simpleUUID1,
          heroInteractionContextValue.pageletStack,
          cbProps,
          name !== null ? name : 'Unnamed Suspense',
        )
      }

      if (unstable_onSuspense) {
        const thenableDescription =
          HeroPlaceholderUtils.createThenableDescription(cbProps)

        unstable_onSuspense(
          thenableDescription !== null ? thenableDescription : '',
        )
      }
    },
    [
      heroInteractionContextValue,
      heroInteractionIDContextValue,
      name,
      simpleUUID1,
      unstable_onSuspense,
    ],
  )

  useLayoutEffect(() => {
    if (
      ref.current === false &&
      heroInteractionIDContextValue !== null &&
      heroInteractionIDContextValue !== null
    ) {
      heroInteractionContextValue.hold(
        heroInteractionIDContextValue,
        heroInteractionContextValue.pageletStack,
        'Hydration',
        simpleUUID2,
        name,
      )

      return () => {
        return heroInteractionContextValue.unhold(
          heroInteractionIDContextValue,
          simpleUUID2,
        )
      }
    }
  }, [
    heroInteractionContextValue,
    heroInteractionIDContextValue,
    name,
    simpleUUID2,
  ])

  let t = function () {
    ref.current = true

    if (heroInteractionIDContextValue !== null) {
      heroInteractionContextValue.unhold(
        heroInteractionIDContextValue,
        simpleUUID2,
      )
    }
  }

  return jsxs(Suspense, {
    children: [
      jsx(m, {
        cb: t,
      }),
      childrenClone,
    ],
    fallback: jsxs(Fragment, {
      children: [
        fallback,
        jsx(m, {
          cb: t,
        }),
        jsx(HeroFallbackTracker, {
          uuid: simpleUUID1,
        }),
      ],
    }),
    suspenseCallback,
    unstable_avoidThisFallback,
  })
}

HeroPlaceholder.displayName = 'HeroPlaceholder'
