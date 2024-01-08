/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { FBLogger, unrecoverableViolation } from "../error";

import { CLDRDateFormatConfig } from "./CLDRDateFormatConfig";
import { flipObject } from "./flipObject";
import { IntlDateFormatsCLDRWidthEnum } from "./IntlDateFormatsCLDRWidthEnum";
import { RegionDatetimePatterns } from "./RegionDatetimePatterns";

let g = CLDRDateFormatConfig.CLDRConfigeratorFormats;
let h = CLDRDateFormatConfig.CLDRRegionalConfigeratorFormats;
let i = flipObject(RegionDatetimePatterns);

export function getCLDRLocalizedFormat(a) {
  if (!a)
    throw unrecoverableViolation(
      'Format: "' + a + '", not supported by configurator.',
      "internationalization"
    );
  let c;
  let d;
  let e = a.split("_");
  let f = e[0];
  e = e.slice(1);
  let l = f + "Formats";
  a in i ? (d = h) : (d = g);
  switch (l) {
    case "dateFormats":
    case "timeFormats":
      // eslint-disable-next-line no-inner-declarations, no-var
      var m = j(e[0]);
      if (!m)
        throw unrecoverableViolation(
          'Format: "' +
            a +
            '", category: "' +
            l +
            '", with unsupported width: "undefined"',
          "internationalization"
        );
      c = d[l][m];
      if (!c)
        throw unrecoverableViolation(
          'Format: "' +
            a +
            '", category: "' +
            l +
            '", ' +
            ('width: "' + m + '", with unsupported localization'),
          "internationalization"
        );
      break;
    case "dateTimeFormats":
      m = j(e[0]);
      e = j(e[1]);
      if (!m || !e)
        throw unrecoverableViolation(
          'Format: "' +
            a +
            '", category: "' +
            l +
            '", with unsupported width: dateFormatKey="undefined" timeFormatKey="undefined"',
          "internationalization"
        );
      c = d[l][m];
      // eslint-disable-next-line no-inner-declarations, no-var
      var n = d.dateFormats[m];
      // eslint-disable-next-line no-inner-declarations, no-var
      var o = d.timeFormats[e];
      if (!c)
        throw unrecoverableViolation(
          'Format: "' +
            a +
            '", category: "' +
            l +
            '", ' +
            ('date width: "' + m + '", and time width: ') +
            ('"' + e + '", with unsupported localization'),
          "internationalization"
        );
      c = c.replace("{0}", o).replace("{1}", n);
      break;
    default:
      l = "availableFormats";
      m = f;
      m.includes("j") && (m = k(m, d.timeFormats));
      c = d[l][m];
      if (!c)
        throw unrecoverableViolation(
          'Format: "' + a + '", with key: "' + m + '", not supported by CLDR',
          "internationalization"
        );
  }
  return c;
}
function j(a) {
  if (!a)
    throw unrecoverableViolation(
      "Expected CLDR width key to not be null",
      "internationalization"
    );
  return IntlDateFormatsCLDRWidthEnum[a.toUpperCase()];
}
function k(a, c) {
  let d;
  c = c["short"];
  !c
    ? (FBLogger("formatDate")
        .blameToPreviousFile()
        .warn(
          'CLDR `timeFormat`, width `short` required for 24 hour localization not found for availableKey: "%s"',
          a
        ),
      (d = "h"))
    : (d = c.includes("H") ? "H" : "h");
  return a.replace("j", d);
}
