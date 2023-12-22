/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import {
  createContext,
  unstable_Scope,
  useContext,
  useMemo,
  useRef,
} from "react";
import { jsx } from "react/jsx-runtime";
import Locale from "fbjs/lib/Locale";

import {
  focusKeyboardEventPropagation,
  setElementCanTab,
} from "@/faang/focus-region";
import {
  ReactFocusEvent,
  ReactKeyboardEvent,
} from "@/faang/react-interactions";

import { FocusManager } from "./focus-manager";

let m = 5;
function n(a) {
  return a.length === 1;
}

// eslint-disable-next-line max-params
function o(a, b, c, e) {
  focusKeyboardEventPropagation.stopFocusKeyboardEventPropagation(c);
  b = b.DO_NOT_USE_queryFirstNode(a);
  b !== null &&
    (document.activeElement !== null &&
      setElementCanTab.setElementCanTab(document.activeElement, !1),
    setElementCanTab.setElementCanTab(b, !0),
    FocusManager.focusElement(b, {
      preventScroll: e,
    }),
    c.preventDefault());
}

// eslint-disable-next-line max-params
function p(a, b, c, d, e, f) {
  b = b.onNavigate;
  if (b && d) {
    let g = !1;
    let h = q(d, e);
    e = {
      currentIndex: h,
      event: c,
      focusItem: function (a, b) {
        a = a.scopeRef.current;
        a && o(b || f, a, c);
      },
      getItem: function (a) {
        return u(d, a);
      },
      getItemByTag: function (a) {
        let b = d.length;
        let c = h + 1;
        while (!0) {
          if (c === h) return null;
          if (c > b - 1) {
            c = 0;
            continue;
          }
          let e = d[c];
          if (e) {
            let f = e.disabled;
            let g = e.scopeRef;
            let i = e.tag;
            g = g.current;
            if (g && f !== !0 && i === a) return e;
          }
          c++;
        }
        return null;
      },
      preventDefault: function () {
        g = !0;
      },
      type: a,
    };
    b(e);
    if (g) return !0;
  }
  return !1;
}
function q(a, b) {
  for (let c = 0; c < a.length; c++) {
    let d = a[c];
    if (d && d.scopeRef.current === b) return c;
  }
  return -1;
}
function r(a, b, c) {
  let d = a.scopeRef.current;
  if (d === null) return null;
  if (c !== null) {
    d = q(c, b);
    b = a.wrap;
    a = v(c, d - 1);
    return !a && b === !0 ? v(c, c.length - 1) : a;
  }
  return null;
}
function s(a, b, c) {
  let d = a.scopeRef.current;
  if (d === null) return null;
  if (c.length > 0) {
    d = q(c, b);
    b = a.wrap;
    a = t(c, d + 1);
    return !a && b === !0 ? t(c, 0) : a;
  }
  return null;
}

const _5403 = false;

function t(a, b) {
  let d = a.length;
  if (b > d) return null;
  // eslint-disable-next-line no-self-assign
  b = b;
  while (b < d) {
    let e = a[b];
    if (_5403) {
      if (e !== null) return e.scopeRef.current;
    } else if (e !== null && e.disabled !== !0) return e.scopeRef.current;
    b++;
  }
  return null;
}
function u(a, b) {
  // eslint-disable-next-line no-self-assign
  b = b;
  while (b >= 0) {
    let d = a[b];
    if (_5403) {
      if (d !== null) return d;
    } else if (d !== null && d.disabled !== !0) return d;
    b--;
  }
  return null;
}
function v(a, b) {
  a = u(a, b);
  return a ? a.scopeRef.current : null;
}
function w(a) {
  let b = a.altKey;
  let c = a.ctrlKey;
  let d = a.metaKey;
  a = a.shiftKey;
  return b === !0 || c === !0 || d === !0 || a === !0;
}

function createFocusGroup(a) {
  let b = unstable_Scope;
  let c = createContext(null);
  let e = createContext(null);
  function g(e) {
    let f = e.children;
    let g = e.orientation;
    let j = e.wrap;
    let n = e.tabScopeQuery;
    let o = e.allowModifiers;
    let p = e.preventScrollOnFocus;
    let q = p === void 0 ? !1 : p;
    p = e.pageJumpSize;
    let r = p === void 0 ? m : p;
    let s = e.onNavigate;
    let t = useRef(null);
    p = useMemo(() => {
      return {
        scopeRef: t,
        orientation: g,
        wrap: j,
        tabScopeQuery: n,
        allowModifiers: o,
        pageJumpSize: r,
        preventScrollOnFocus: q,
        onNavigate: s,
      };
    }, [g, j, n, o, r, q, s]);
    let u = useRef(!1);
    e = ReactFocusEvent.useFocusWithin(
      t,
      useMemo(() => {
        return {
          onFocusWithin: function (b) {
            u.current ||
              ((u.current = !0),
              t.current &&
                a &&
                (h(t.current, a),
                setElementCanTab.setElementCanTab(b.target, !0)));
          },
        };
      }, [u])
    );
    return jsx(c.Provider, {
      value: p,
      children: jsx(unstable_Scope, {
        ref: e,
        children: f,
      }),
    });
  }

  function h(a, b) {
    let c = document.activeElement;
    a = a.DO_NOT_USE_queryAllNodes(b);
    if (a !== null)
      for (b = 0; b < a.length; b++) {
        let e = a[b];
        e !== c
          ? setElementCanTab.setElementCanTab(e, false)
          : setElementCanTab.setElementCanTab(e, true);
      }
  }

  function u(f) {
    let g = f.children;
    let m = f.disabled;
    f = f.tag;
    let u = useRef(null);
    let x = useContext(c);
    ReactKeyboardEvent.useKeyboard(
      u,
      useMemo(() => {
        return {
          // eslint-disable-next-line complexity
          onKeyDown: (b) => {
            if (
              focusKeyboardEventPropagation.hasFocusKeyboardEventPropagationStopped(
                b
              )
            )
              return;
            let c = u.current;
            if (c !== null && x !== null) {
              let f = x.orientation === "vertical" || x.orientation === "both";
              let g =
                x.orientation === "horizontal" || x.orientation === "both";
              let i = x.scopeRef.current;
              let j = b.key;
              let k = x.preventScrollOnFocus;
              if (j === "Tab" && i !== null) {
                // eslint-disable-next-line no-var, no-inner-declarations
                var l = x.tabScopeQuery;
                if (l) {
                  if (x.onNavigate) {
                    // eslint-disable-next-line no-inner-declarations, no-var
                    var m = i.getChildContextValues(e);
                    if (p("TAB", x, b, m, c, l)) return;
                  }
                  h(i, l);
                }
                return;
              }
              if (w(b)) {
                m = x.allowModifiers;
                if (m !== !0) return;
              }
              if (i === null) return;
              l = j;
              Locale.isRTL() &&
                (j === "ArrowRight"
                  ? (l = "ArrowLeft")
                  : j === "ArrowLeft" && (l = "ArrowRight"));
              switch (l) {
                case "Home":
                  m = i.getChildContextValues(e);
                  if (p("HOME", x, b, m, c, a)) return;
                  l = t(m, 0);
                  if (l) {
                    o(a, l, b, k);
                    return;
                  }
                  break;
                case "End":
                  m = i.getChildContextValues(e);
                  if (p("END", x, b, m, c, a)) return;
                  l = v(m, m.length - 1);
                  if (l) {
                    o(a, l, b, k);
                    return;
                  }
                  break;
                case "PageUp":
                  m = i.getChildContextValues(e);
                  if (p("PAGE_UP", x, b, m, c, a)) return;
                  l = x.pageJumpSize;
                  // eslint-disable-next-line no-inner-declarations, no-var
                  var y = q(m, c);
                  m = t(m, Math.max(0, y - l));
                  if (m) {
                    o(a, m, b, k);
                    return;
                  }
                  break;
                case "PageDown":
                  y = i.getChildContextValues(e);
                  if (p("PAGE_DOWN", x, b, y, c, a)) return;
                  l = x.pageJumpSize;
                  m = q(y, c);
                  y = v(y, Math.min(y.length - 1, m + l));
                  if (y) {
                    o(a, y, b, k);
                    return;
                  }
                  break;
                case "ArrowUp":
                  if (f) {
                    m = i.getChildContextValues(e);
                    if (p("PREV_ITEM", x, b, m, c, a)) return;
                    l = b.metaKey || b.ctrlKey ? t(m, 0) : r(x, c, m);
                    if (l) {
                      o(a, l, b, k);
                      return;
                    }
                  }
                  break;
                case "ArrowDown":
                  if (f) {
                    y = i.getChildContextValues(e);
                    if (p("NEXT_ITEM", x, b, y, c, a)) return;
                    m =
                      b.metaKey || b.ctrlKey ? v(y, y.length - 1) : s(x, c, y);
                    if (m) {
                      o(a, m, b, k);
                      return;
                    }
                  }
                  break;
                case "ArrowLeft":
                  if (g) {
                    l = i.getChildContextValues(e);
                    if (p("PREV_ITEM", x, b, l, c, a)) return;
                    f = b.metaKey || b.ctrlKey ? t(l, 0) : r(x, c, l);
                    if (f) {
                      o(a, f, b, k);
                      return;
                    }
                  }
                  break;
                case "ArrowRight":
                  if (g) {
                    y = i.getChildContextValues(e);
                    if (p("NEXT_ITEM", x, b, y, c, a)) return;
                    m =
                      b.metaKey || b.ctrlKey ? v(y, y.length - 1) : s(x, c, y);
                    m && o(a, m, b, k);
                  }
                  break;
                default:
                  if (n(j) && x.onNavigate) {
                    l = i.getChildContextValues(e);
                    p("PRINT_CHAR", x, b, l, c, a);
                  }
              }
            }
          },
        };
      }, [x])
    );
    let y = ReactFocusEvent.useFocusWithin(
      u,
      useMemo(() => {
        return {
          onFocusWithin: function (b) {
            if (a !== null) {
              let c;
              c =
                (c = u.current) === null
                  ? void 0
                  : c.DO_NOT_USE_queryFirstNode(a);
              b = b.target === c;
              if (b && c && !setElementCanTab.canElementTab(c)) {
                b = x === null ? void 0 : x.scopeRef.current;
                b && h(b, a);
              }
            }
          },
        };
      }, [x === null ? void 0 : x.scopeRef])
    );
    m = {
      scopeRef: u,
      disabled: m,
      tag: f,
    };
    return jsx(e.Provider, {
      value: m,
      children: jsx(b, {
        ref: y,
        children: g,
      }),
    });
  }
  return [g, u];
}

export const FocusGroup = {
  createFocusGroup,
};
