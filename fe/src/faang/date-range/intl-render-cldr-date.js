/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { unrecoverableViolation } from "../error";

import { CLDRDateFormatConfig } from "./CLDRDateFormatConfig";
import { intlRenderJSDateSymbol } from "./intl-render-js-date-symbol";

let g = /\w+/;

export function intlRenderCLDRDate(a, c, d) {
  let e = CLDRDateFormatConfig.intlDateSpecialChars;
  let f = "";
  let g = "";
  let i = !1;
  let j = [];
  let k;
  a = a.split(e.cldrDelimiter + e.singleQuote).join(e.singleQuoteHolder);
  for (let l = 0, m = a.length; l < m; l++) {
    let n = a.charAt(l);
    !i
      ? n === e.cldrDelimiter
        ? (i = !0)
        : f.length === 0 || f[0] === n
        ? (f += n)
        : n === e.singleQuoteHolder
        ? (f += e.singleQuote)
        : ((k = h(f, d, c)), j.push(k.rendered), (f = n))
      : (f.length !== 0 && ((k = h(f, d, c)), j.push(k.rendered), (f = "")),
        n === e.cldrDelimiter
          ? ((i = !1), j.push(g), (g = ""))
          : n === e.singleQuoteHolder
          ? (g += e.singleQuote)
          : (g += n));
  }
  if (g.length !== 0)
    throw unrecoverableViolation(
      'Format: "' + a + '" must contain closing str literal delimiter',
      "internationalization"
    );
  f.length !== 0 && ((k = h(f, d, c)), j.push(k.rendered));
  return j.join("");
}
function h(a, c, d) {
  a = i(a);
  return intlRenderJSDateSymbol(c, a, d);
}
function i(a) {
  if (a in CLDRDateFormatConfig.CLDRToPHPSymbolConversion)
    return CLDRDateFormatConfig.CLDRToPHPSymbolConversion[a];
  if (g.test(a))
    throw unrecoverableViolation(
      'Unsupported CLDR symbol: "' +
        a +
        '". If string literal, wrap in delimiters',
      "internationalization"
    );
  return a;
}
