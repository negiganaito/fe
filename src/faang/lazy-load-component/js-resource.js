/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { JSResourceReferenceImpl } from './js-resource-reference-impl';

const h = {};

function i(a, b) {
  h[a] = b;
}

function j(a) {
  return h[a];
}

export function JSResource(a) {
  // a = a;
  let b = j(a);
  if (b) {
    return b;
  }
  b = new JSResourceReferenceImpl(a);
  i(a, b);
  return b;
}

JSResource.loadAll = JSResourceReferenceImpl.loadAll;
