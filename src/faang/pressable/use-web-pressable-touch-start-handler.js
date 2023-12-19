/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import UserAgent from 'fbjs/lib/UserAgent';
import { useEffect } from 'react';

import { useDynamicCallbackDANGEROUS } from '@/faang/hooks/use-dynamic-callback_DANGEROUS';
import { passiveEventListenerUtil } from '@/faang/react-interactions';

const isSafariOrMobileSafari = UserAgent.isBrowser('Safari') || UserAgent.isBrowser('Mobile Safari');

let j = isSafariOrMobileSafari
  ? (a) => {
      let body = !window ? undefined : !window.document ? undefined : window.document.body;
      if (!body) {
        return;
      }
      body.style.WebkitUserSelect = 'none';
      let c = passiveEventListenerUtil.makeEventOptions({
        passive: !0,
      });
      a = function a() {
        body.style.WebkitUserSelect = null;
        document.removeEventListener('touchend', a, c);
      };
      document.addEventListener('touchend', a, c);
      return a;
    }
  : null;

function k(a) {
  return typeof document !== 'undefined' && typeof document.contains === 'function' ? document.contains(a) : !1;
}

export function useWebPressableTouchStartHandler(a, b, e) {
  let f = useDynamicCallbackDANGEROUS(e);
  useEffect(() => {
    let c;
    if (!b && !j) return;
    let e = a.current;
    c = !(c = window) ? void 0 : !(c = c.document) ? void 0 : c.body;
    if (!e || !c || !e.addEventListener || !k(e)) return;
    let g;
    b &&
      (b.register(e, f),
      (g = function (a) {
        a.preventDefault();
        b.onTouchStart();
      }));
    let h;
    let i =
      g || j
        ? function (a) {
            !g ? void 0 : g(a);
            h = !j ? void 0 : j(a);
          }
        : null;
    let l = i
      ? passiveEventListenerUtil.makeEventOptions({
          passive: !b,
        })
      : null;
    i && l && e.addEventListener('touchstart', i, l);
    return function () {
      !h ? void 0 : h();
      !b ? void 0 : b.unRegister(e);
      i && l && e.removeEventListener('touchstart', i, l);
    };
  }, [f, a, b]);
}
