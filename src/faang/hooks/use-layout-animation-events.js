/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { LayoutAnimationBoundaryContext } from '@negiganaito/context'
import { LAYOUT_ANIMATION_EVENT } from '@negiganaito/utils/common/layout-animation-events'
import { useContext, useEffect, useRef } from 'react'

function useLayoutAnimationEvents(a) {
  const b = useContext(LayoutAnimationBoundaryContext)
  const e = useRef([])

  useEffect(
    function () {
      const c = (!b ? void 0 : b.animationEventTargets) || []
      c.forEach(function (b) {
        b = b.addListener(LAYOUT_ANIMATION_EVENT, a)
        // @ts-ignore
        e.current = [].concat(e.current, [b])
      })
      return function () {
        e.current.forEach(function (a) {
          a.remove()
        }),
          (e.current = [])
      }
    },
    [a, b],
  )
}

export default useLayoutAnimationEvents
