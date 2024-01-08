/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { jsx } from "react/jsx-runtime";
import removeFromArray from "fbjs/lib/removeFromArray";

import { HiddenSubtreeContext, HiddenSubtreePassiveContext } from "../context";
import { useUnsafeRef_DEPRECATED } from "../hooks";

function o(a, b) {
  return a.backgrounded === b.backgrounded && a.hidden === b.hidden;
}

function p(a, b) {
  const c = a.backgrounded || b.backgrounded;
  a = a.hidden || b.hidden;
  return {
    backgrounded: c,
    hidden: a,
    hiddenOrBackgrounded: c || a,
    hiddenOrBackgrounded_FIXME: c || a,
  };
}

/**
 * @typedef HiddenSubtreeContextProviderProps
 * @property {*} children
 * @property {*} ignoreParent
 * @property {boolean} isBackgrounded
 * @property {*} isHidden
 */

// type HiddenSubtreeContextProviderProps = {
//   children
//   ignoreParent?: boolean
//   isBackgrounded?: boolean
//   isHidden?: boolean
// }

/**
 *
 * @param {HiddenSubtreeContextProviderProps} props
 * @returns
 */
export function HiddenSubtreeContextProvider({
  children,
  ignoreParent,
  isBackgrounded = false,
  isHidden,
}) {
  // var b = a.children,
  //   d = a.ignoreParent,
  //   e = a.isBackgrounded,
  //   f = e === void 0 ? false : e,
  //   g = a.isHidden
  const e = useContext(HiddenSubtreeContext);
  const q = useContext(HiddenSubtreePassiveContext);
  const r = useMemo(() => {
    return {
      backgrounded: isBackgrounded,
      hidden: isHidden,
      hiddenOrBackgrounded: isBackgrounded || isHidden,
      hiddenOrBackgrounded_FIXME: isBackgrounded || isHidden,
    };
  }, [isBackgrounded, isHidden]);

  const s = useUnsafeRef_DEPRECATED(r);
  const t = useRef(null);
  const u = useRef([]);
  const v = useCallback(() => {
    const a = ignoreParent ? s.current : p(s.current, q.getCurrentState());
    if (!t.current || !o(a, t.current)) {
      t.current = a;
      const b = Array.from(u.current);
      b.forEach((bb) => {
        bb(a);
      });
    }
  }, [ignoreParent, q]);

  useLayoutEffect(() => {
    s.current = r;
    v();
  }, [r, v]);

  useEffect(() => {
    if (ignoreParent !== true) {
      const a = q.subscribeToChanges(v);
      return () => {
        return a.remove();
      };
    }
  }, [ignoreParent, v, q]);

  const HiddenSubtreePassiveValue = useMemo(() => {
    return {
      getCurrentState: function () {
        return ignoreParent === true
          ? s.current
          : p(s.current, q.getCurrentState());
      },
      subscribeToChanges: (a) => {
        const b = u.current;
        b.push(a);
        return {
          remove: () => {
            removeFromArray(b, a);
          },
        };
      },
    };
  }, [q, ignoreParent]);

  const w = ignoreParent === true ? r : p(r, e);

  const hiddenSubtreeValue = useMemo(() => {
    return {
      backgrounded: w.backgrounded,
      hidden: w.hidden,
      hiddenOrBackgrounded: w.backgrounded || w.hidden,
      hiddenOrBackgrounded_FIXME: w.backgrounded || w.hidden,
    };
  }, [w.backgrounded, w.hidden]);

  return jsx(HiddenSubtreeContext.Provider, {
    value: hiddenSubtreeValue,
    children: jsx(HiddenSubtreePassiveContext.Provider, {
      value: HiddenSubtreePassiveValue,
      children,
    }),
  });
}
