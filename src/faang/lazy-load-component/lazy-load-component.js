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
    var f = BootloaderResource.read(a);
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
