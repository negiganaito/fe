/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, memo, useLayoutEffect, useRef } from 'react'

import { useMergeRefs } from '@/faang/hooks'

export const BaseDOMContainer = memo(forwardRef(
  ({ node }, ref) => {
    const storeRef = useRef(null)
    useLayoutEffect(() => {
      if (node && storeRef.current) {
        storeRef.current.appendChild(node)

        return () => {
          storeRef.current.removeChild(node)
        }
      }
    }, [node])

    const mergeRef = useMergeRefs(ref, storeRef)

    return <div ref={mergeRef} />
  },
))

