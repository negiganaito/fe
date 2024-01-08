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
  useRef,
  useState,
} from "react";
import emptyObject from "fbjs/lib/emptyObject";
import ExecutionEnvironment from "fbjs/lib/ExecutionEnvironment";

import { XPlatReactNestedPressableContext } from "../context";

const q = new Set();

ExecutionEnvironment.canUseDOM &&
  document.addEventListener(
    "mousedown",
    () => {
      q.forEach((a) => {
        return a();
      });
    },
    !0
  );

const r = function (a) {
  q.add(a);
  return function () {
    q["delete"](a);
  };
};

const s = new Set();

ExecutionEnvironment.canUseDOM &&
  document.addEventListener(
    "keydown",
    (a) => {
      switch (a.key) {
        case "ArrowUp":
        case "ArrowRight":
        case "ArrowDown":
        case "ArrowLeft":
        case "Tab":
        case "Enter":
        case " ":
        case "Escape":
          s.forEach((a) => {
            return a();
          });
      }
    },
    true
  );

let t = function (a) {
  s.add(a);
  return function () {
    s["delete"](a);
  };
};

let u = ExecutionEnvironment.canUseDOM ? null : !0;
function v() {
  !u && (u = !window.matchMedia("(pointer: coarse)").matches);
  return u;
}

let w = 0;
let x = 1;

/*

var k = b.useCallback
      , l = b.useContext
      , m = b.useEffect
      , n = b.useLayoutEffect
      , o = b.useRef
      , p = b.useState

*/

export const useCometPressableEventHandlers = (props) => {
  const {
    clickOnSpace = false,
    disabled = false,
    onFocusChange,
    onFocusIn,
    onFocusOut,
    onFocusVisibleChange,
    onHoverChange,
    onHoverIn,
    onHoverOut,
    onPress,
    onPressChange,
    onPressIn,
    onPressOut,
    testOnly_pressed = false,
  } = props;

  const a = useContext(XPlatReactNestedPressableContext);

  const C = useRef(w);

  const [E, F] = useState(false);

  let [G, D] = useState(disabled);

  const [I, J] = useState(testOnly_pressed);

  const [K, L] = useState(false);

  const [M, N] = useState(false);

  const [O, P] = useState(false);

  useEffect(() => {
    let a = r(() => {
      C.current = w;
    });
    let b = t(() => {
      C.current = x;
    });
    return function () {
      a();
      b();
    };
  }, []);

  let Q = useCallback(
    (a) => {
      J(a);
      onPressChange && onPressChange(a);
    },
    [onPressChange]
  );

  const R = useCallback(
    (a) => {
      L(a);
      if (onFocusChange) {
        onFocusChange(a);
      }
      // e && e(a)
      (C.current === x || (!a && M)) &&
        (N(a), onFocusVisibleChange && onFocusVisibleChange(a));
    },
    [onFocusChange, onFocusVisibleChange, M]
  );

  const S = useCallback(
    (a) => {
      P(a);
      onHoverChange && onHoverChange(a);
    },
    [onHoverChange]
  );

  const [T, U] = useState(testOnly_pressed);

  useLayoutEffect(() => {
    testOnly_pressed !== T && (Q(testOnly_pressed), U(testOnly_pressed));
  }, [T, Q, testOnly_pressed]);

  const H = useRef(null);

  let V = useCallback(
    (a) => {
      R(!0);
      onFocusIn && onFocusIn(a);
    },
    [onFocusIn, R]
  );

  const W = useCallback(
    (a) => {
      K && (R(!1), onFocusOut && onFocusOut(a));
    },
    [K, onFocusOut, R]
  );

  const X = useCallback(
    (a) => {
      if (!v()) return;
      E && (Q(!0), !I && onPressIn && onPressIn(a));
      S(!0);
      onHoverIn && onHoverIn(a);
    },
    [E, onHoverIn, onPressIn, I, S, Q]
  );

  const Y = useCallback(
    (a) => {
      // eslint-disable-next-line no-sequences
      I && (Q(!1), onPressOut && onPressOut(a)),
        O && (S(!1), onHoverOut && onHoverOut(a));
    },
    [O, onHoverOut, onPressOut, I, S, Q]
  );

  const Z = useCallback(
    (a) => {
      // eslint-disable-next-line no-sequences
      F(!0), Q(!0), onPressIn && onPressIn(a);
    },
    [onPressIn, Q]
  );

  const aa = useCallback(
    (a) => {
      // eslint-disable-next-line no-sequences
      F(!1), I && (Q(!1), onPressOut && onPressOut(a));
    },
    [onPressOut, I, Q]
  );

  const ba = useCallback(
    (a) => {
      // eslint-disable-next-line no-sequences
      F(!1), I && (Q(!1), onPressOut && onPressOut(a));
    },
    [onPressOut, I, Q]
  );

  const $ = useRef(!1);

  const ca = useCallback(
    (a) => {
      // eslint-disable-next-line no-sequences
      ($.current = a.touches.length === 1),
        Q($.current),
        $.current && onPressIn && onPressIn(a);
    },
    [onPressIn, Q]
  );

  const da = useCallback(
    (a) => {
      // eslint-disable-next-line no-sequences
      ($.current = !1), I && (Q(!1), onPressOut && onPressOut(a));
    },
    [onPressOut, I, Q]
  );

  const ea = useCallback(
    (a) => {
      I &&
        (Q(!1),
        $.current && a.touches.length === 1 && onPressOut && onPressOut(a));
    },
    [onPressOut, I, Q]
  );

  useEffect(() => {
    if (E && !O) {
      let a = function () {
        F(!1);
      };
      document.addEventListener("mouseup", a, {
        capture: !0,
        passive: !0,
      });
      return function () {
        document.removeEventListener("mouseup", a, {
          capture: !0,
          passive: !0,
        });
      };
    }
    return function () {};
  }, [a, E, Q, O]);

  const fa = useCallback(
    (a) => {
      let b = a.target;
      onPress &&
        b instanceof HTMLElement &&
        b.tagName === "LABEL" &&
        a.preventDefault();
      F(!1);
      onPress && onPress(a);
    },
    [onPress]
  );

  const ga = useCallback(
    (a) => {
      // eslint-disable-next-line no-sequences
      a.key === "Enter" && onPress && onPress(a),
        a.key === " " && clickOnSpace && onPress && onPress(a);
    },
    [clickOnSpace, onPress]
  );

  disabled !== G && (disabled && (Q(!1), R(!1), S(!1)), D(disabled));

  G = disabled
    ? emptyObject
    : {
        onBlur: W,
        onClick: fa,
        onDragStart: ba,
        onFocus: V,
        onKeyDown: ga,
        onMouseDown: Z,
        onMouseEnter: X,
        onMouseLeave: Y,
        onMouseUp: aa,
        onTouchEnd: ea,
        onTouchMove: da,
        onTouchStart: ca,
      };

  D = useCallback(({ children: _children }) => {
    // a = a.children;

    return (
      <XPlatReactNestedPressableContext.Provider value={true}>
        {_children}
      </XPlatReactNestedPressableContext.Provider>
    );

    // return j.jsx(c("XPlatReactNestedPressableContext").Provider, {
    //   value: !0,
    //   children: a,
    // });
  }, []);

  return [
    H,
    a,
    {
      disabled,
      focused: K,
      focusVisible: M,
      hovered: O,
      pressed: I,
    },
    G,
    D,
  ];
};
