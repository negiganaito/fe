/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

// import { useEffect } from 'react'

// import { ReactUseEvent } from './react-use-event';

// const j = {
//   passive: !0
// };

// function useKeyboard(a, b) {
//   let d = b.disabled
//   let e = d === void 0 ? !1 : d
//   let f = b.onKeyDown
//   let g = b.onKeyUp
//   let h = ReactUseEvent('keydown')
//   let k = ReactUseEvent('keyup', j);

//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   useEffect(() => {
//     let b = a.current;
//     b  && (h.setListener(b, !e && f || null),
//       k.setListener(b, !e && g || null))
//   }, [e, f, h, k, a, g])
// }

// export const ReactKeyboardEvent = {
//   useKeyboard
// }

import { useEffect } from "react";

import { ReactUseEvent } from "./react-use-event";

const defaultEventOptions = {
  passive: true,
};

function useKeyboard(ref, options) {
  const { disabled = false, onKeyDown, onKeyUp } = options;

  const keyDownEvent = ReactUseEvent("keydown");
  const keyUpEvent = ReactUseEvent("keyup", defaultEventOptions);

  useEffect(() => {
    const element = ref.current;

    if (element ) {
      keyDownEvent.setListener(element, (!disabled && onKeyDown) || null);
      keyUpEvent.setListener(element, (!disabled && onKeyUp) || null);
    }
  }, [disabled, onKeyDown, keyDownEvent, onKeyUp, keyUpEvent, ref]);
}

export const ReactKeyboardEvent = {
  useKeyboard,
};
