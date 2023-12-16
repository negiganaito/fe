/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { forwardRef } from 'react';
import { jsx } from 'react/jsx-runtime';

import { BootloaderResource } from './bootloader-resource';
import { useHeroBootloadedComponent } from './use-hero-bootloaded-component';

const j = new Map();

function k(a, b) {
  j.set(a, b);
}
function l(a) {
  return j.get(a);
}

export function lazyLoadComponent(a) {
  let c = l(a);
  if (c) {
    return c;
  }
  function e(c, e) {
    e === void 0 && (e = void 0);
    let f = BootloaderResource.read(a);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useHeroBootloadedComponent(a);
    return jsx(
      f,
      Object.assign({}, c, {
        ref: e,
      })
    );
  }
  // e.displayName = e.name + ' [from ' + f.id + ']';
  e.displayName = 'lazyLoadComponent(' + a.getModuleId() + ')';
  c = forwardRef(e);
  k(a, c);

  return c;
}
