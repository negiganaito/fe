/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import {
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { jsx } from "react/jsx-runtime";
import stylex from "@stylexjs/stylex";

import { BaseView } from "@/faang/base-row";
import { HiddenSubtreeContext } from "@/faang/context";
import { usePrevious, useStable } from "@/faang/hooks";
import { HiddenSubtreeContextProvider } from "@/faang/popover";

const styles = stylex.create({
  detached: {
    // eslint-disable-next-line @stylexjs/valid-styles
    MsOverflowStyle: "none",
    height: "100%",
    overflowX: "auto",
    overflowY: "auto",
    position: "fixed",
    // eslint-disable-next-line @stylexjs/valid-styles
    scrollbarWidth: "none",
    left: 0,
    top: 0,
    width: "100%",
    // eslint-disable-next-line @stylexjs/valid-styles
    "::-webkit-scrollbar": {
      display: "none",
      height: 0,
      width: 0,
    },
  },
});

const p = new Map();
const q = new Set();
let r = null;

function s(a, b) {
  return !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
}

function t() {
  let a = null;
  p.forEach((b, c) => {
    !a ? (a = c) : a && c && s(a, c) && !q.has(c) && (a = c);
  });
  return a;
}

function u(a) {
  return !r || s(r, a);
}

// type BaseDocumentScrollViewProps = {
//   contextKey?
//   detached?: boolean
//   detachedDefaultValue?: boolean
//   detachedPageOffsets?
//   disableNavigationScrollReset?: boolean
//   hiddenWhenDetached?: boolean
//   maintainScrollForContext?: boolean
//   onInitialScroll?
//   resetScrollOnMount?: boolean
//   children?
// }

export function BaseDocumentScrollView({
  contextKey = undefined,
  detached = false,
  detachedDefaultValue = false,
  detachedPageOffsets,
  disableNavigationScrollReset = false,
  hiddenWhenDetached = false,
  maintainScrollForContext = false,
  onInitialScroll,
  resetScrollOnMount = true,
  ...rest
}) {
  let y = useRef();
  let z = useRef({
    x: 0,
    y: 0,
  });
  let A = useStable(() => {
    return {};
  });
  let B = usePrevious(contextKey);
  const [C, D] = useState(detachedDefaultValue);
  const [E, F] = useState({
    x: 0,
    y: 0,
  });
  let G = usePrevious(C);
  const { hidden: H } = useContext(HiddenSubtreeContext);

  useLayoutEffect(() => {
    let a = y.current;
    if (a) {
      if (u(a)) {
        if (r) {
          let b = p.get(r);
          b && b(!1);
        }
        r = a;
      } else D(!0);
      p.set(a, (a) => {
        // eslint-disable-next-line no-sequences
        a || F({ ...z.current }), D(!a);
      });
      return function () {
        p["delete"](a);
        if (r === a) {
          r = t();
          if (r) {
            let b = p.get(r);
            b && b(!0);
          }
        }
      };
    }
  }, []);
  let I = useCallback(
    (b, c) => {
      // eslint-disable-next-line no-sequences
      window.scrollTo && window.scrollTo(b, c),
        typeof onInitialScroll === "function" && onInitialScroll(b, c);
    },
    [onInitialScroll]
  );
  useLayoutEffect(() => {
    (resetScrollOnMount || G) && !C && C !== G && I(E.x, E.y);
  }, [C, E, G, I, resetScrollOnMount]);
  useLayoutEffect(() => {
    if ((resetScrollOnMount || B) && contextKey !== B) {
      let a =
        maintainScrollForContext && contextKey && contextKey in A
          ? // @ts-ignore
            A[contextKey]
          : {
              x: 0,
              y: 0,
            };
      C ? F(a) : disableNavigationScrollReset !== !0 && I(a.x, a.y);
    }
  }, [
    contextKey,
    A,
    C,
    maintainScrollForContext,
    B,
    I,
    resetScrollOnMount,
    disableNavigationScrollReset,
  ]);
  useLayoutEffect(() => {
    if (!C) {
      let b = function () {
        let b = window.pageXOffset;
        let c = window.pageYOffset;
        z.current = {
          x: b,
          y: c,
        };
        contextKey &&
          // @ts-ignore
          (A[contextKey] = {
            x: b,
            y: c,
          });
      };
      window.addEventListener("scroll", b, {
        passive: !0,
      });
      return function () {
        return window.removeEventListener("scroll", b, {
          // @ts-ignore
          passive: !0,
        });
      };
    }
  }, [C, contextKey, A]);
  useLayoutEffect(() => {
    let a = y.current;
    if (a)
      if (H) {
        q.add(a);
        if (!C) {
          D(!0);
          r = t();
          if (r) {
            // eslint-disable-next-line no-inner-declarations, no-var
            var b = p.get(r);
            b && b(!0);
          }
        }
        return function () {
          q["delete"](a);
        };
      } else if (C && a !== r && a === t()) {
        if (r) {
          b = p.get(r);
          b && b(!1);
        }
        r = a;
        b = p.get(r);
        b && b(!0);
      }
  }, [C, H]);
  const isBackgrounded = detached || C;
  const b = hiddenWhenDetached;
  let J = C && !hiddenWhenDetached;
  useLayoutEffect(() => {
    let a = y.current;
    J && a && (a.scrollTop = E.y);
  }, [E.y, J]);
  return jsx(HiddenSubtreeContextProvider, {
    ignoreParent: !0,
    isBackgrounded,
    isHidden: b,
    children: jsx(BaseView, {
      ...rest,
      hidden: b,
      ...(J && {
        "aria-hidden": !0,
        id: "scrollview",
        style: {
          left: -E.x,
        },
        xstyle: styles.detached,
      }),
      ref: y,
    }),
  });
}
