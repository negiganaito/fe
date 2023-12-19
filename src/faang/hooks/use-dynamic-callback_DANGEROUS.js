/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import {useCallback,useLayoutEffect,useRef} from 'react'

export function useDynamicCallbackDANGEROUS(a) {
  let b = useRef(a);
  useLayoutEffect(() =>{
    b.current = a
  }, [a]);
  return useCallback(()=> {
    return b.current.apply(b, arguments)
  }, [])
}
