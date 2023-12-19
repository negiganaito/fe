/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useContext, useEffect, useRef } from 'react'

import { LayoutAnimationEvent } from '@/faang/common'
import { LayoutAnimationBoundaryContext } from '@/faang/context'

export function useLayoutAnimationEvents(a) {
  const b = useContext(LayoutAnimationBoundaryContext)
  const e = useRef([])

  useEffect(
    () => {
      const c = (!b ? void 0 : b.animationEventTargets) || []
      c.forEach((b) => {
        b = b.addListener(LayoutAnimationEvent.LAYOUT_ANIMATION_EVENT, a)
        // @ts-ignore
        e.current = [].concat(e.current, [b])
      })
      return function () {
        e.current.forEach((a) => {
          a.remove()
        })        
        e.current = []
      }
    },
    [a, b],
  )
}
