/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import Locale from "fbjs/lib/Locale";

const h = Locale.isRTL();

// type BaseContextualLayerOption = {
//   align: any
//   contextRect: any
//   contextualLayerSize: any
//   fixed: any
//   offsetRect: any
//   position: any
//   screenRect: any
// }
/* eslint-disable no-var */
/* eslint-disable no-inner-declarations */
// eslint-disable-next-line complexity
export function calculateBaseContextualLayerPosition(a) {
  let b = a.align;
  let c = a.contextRect;
  let d = a.contextualLayerSize;
  let e = a.fixed;
  let f = a.offsetRect;
  let g = a.position;
  a = a.screenRect;
  e = {
    height: void 0,
    position: e ? "fixed" : void 0,
    transform: "",
    width: void 0,
  };
  let i = 0;
  let j = 0;
  let k = 0;
  let l = 0;
  let m = (c.bottom + c.top) / 2;
  let n = (c.left + c.right) / 2;
  let o = h ? "start" : "end";
  let p = h ? "end" : "start";
  switch (g) {
    case "above":
      j = c.top - f.top;
      l = "-100%";
      break;
    case "below":
      j = c.bottom - f.top;
      break;
    case p:
      i = c.left - f.left;
      k = "-100%";
      break;
    case o:
      i = c.right - f.left;
      break;
  }
  if (g === "start" || g === "end")
    switch (b) {
      case "start":
        j = c.top - f.top;
        break;
      case "middle":
        j = m - f.top;
        l = "-50%";
        break;
      case "end":
        j = c.bottom - f.top;
        l = "-100%";
        break;
      case "stretch":
        j = c.top - f.top;
        e.height = c.bottom - c.top + "px";
        break;
    }
  else if (g === "above" || g === "below")
    switch (b) {
      case p:
        i = c.left - f.left;
        break;
      case "middle":
        i = n - f.left;
        k = "-50%";
        break;
      case o:
        i = c.right - f.left;
        k = "-100%";
        break;
      case "stretch":
        i = c.left - f.left;
        e.width = c.right - c.left + "px";
        break;
    }
  f = 0;
  if (d !== null)
    if (g === "start" || g === "end") {
      var q = null;
      switch (b) {
        case "start":
          q = c.top;
          break;
        case "middle":
          q = m - d.height / 2;
          break;
        case "end":
          q = c.bottom - d.height;
          break;
      }
      q !== null &&
        (q < a.top
          ? (f = a.top - q)
          : q + d.height > a.bottom && (f = a.bottom - q - d.height));
      j += f;
    } else if (g === "above" || g === "below") {
      m = null;
      switch (b) {
        case p:
          m = c.left;
          break;
        case "middle":
          m = n - d.width / 2;
          break;
        case o:
          m = c.right - d.width;
          break;
      }
      m !== null &&
        (m < a.left
          ? (f = a.left - m)
          : m + d.width > a.right && (f = a.right - m - d.width));
      i += f;
    }
  q = "";
  (i !== 0 || j !== 0) &&
    (q += "translate(" + Math.round(i) + "px, " + Math.round(j) + "px) ");
  (k !== 0 || l !== 0) && (q += "translate(" + k + ", " + l + ") ");
  e.transform = q;
  return {
    adjustment: f,
    style: e,
  };
}

// // eslint-disable-next-line complexity
// export function calculateBaseContextualLayerPosition({
//   align,
//   contextRect,
//   contextualLayerSize,
//   fixed,
//   offsetRect,
//   position,
//   screenRect,
// }) {
//   const style = {
//     height: void 0,
//     position: fixed ? "fixed" : void 0,
//     transform: "",
//     width: void 0,
//   };

//   let i = 0;
//   let j = 0;
//   let k = 0;
//   let l = 0;
//   let m = (contextRect.bottom + contextRect.top) / 2;
//   let n = (contextRect.left + contextRect.right) / 2;
//   let o = h ? "start" : "end";
//   let p = h ? "end" : "start";
//   switch (position) {
//     case "above":
//       j = contextRect.top - offsetRect.top;
//       l = "-100%";
//       break;
//     case "below":
//       j = contextRect.bottom - offsetRect.top;
//       break;
//     case p:
//       i = contextRect.left - offsetRect.left;
//       k = "-100%";
//       break;
//     case o:
//       i = contextRect.right - offsetRect.left;
//       break;
//   }
//   if (position === "start" || position === "end")
//     switch (align) {
//       case "start":
//         j = contextRect.top - offsetRect.top;
//         break;
//       case "middle":
//         j = m - offsetRect.top;
//         l = "-50%";
//         break;
//       case "end":
//         j = contextRect.bottom - offsetRect.top;
//         l = "-100%";
//         break;
//       case "stretch":
//         j = contextRect.top - offsetRect.top;
//         style.height = contextRect.bottom - contextRect.top + "px";
//         break;
//     }
//   else if (position === "above" || position === "below")
//     switch (align) {
//       case p:
//         i = contextRect.left - offsetRect.left;
//         break;
//       case "middle":
//         i = n - offsetRect.left;
//         k = "-50%";
//         break;
//       case o:
//         i = contextRect.right - offsetRect.left;
//         k = "-100%";
//         break;
//       case "stretch":
//         i = contextRect.left - offsetRect.left;
//         style.width = contextRect.right - contextRect.left + "px";
//         break;
//     }
//   let adjustment = 0;
//   if (contextualLayerSize)
//     if (position === "start" || position === "end") {
//       let q = null;
//       switch (align) {
//         case "start":
//           q = contextRect.top;
//           break;
//         case "middle":
//           q = m - contextualLayerSize.height / 2;
//           break;
//         case "end":
//           q = contextRect.bottom - contextualLayerSize.height;
//           break;
//       }
//       q &&
//         (q < screenRect.top
//           ? (adjustment = screenRect.top - q)
//           : q + contextualLayerSize.height > screenRect.bottom &&
//             (adjustment = screenRect.bottom - q - contextualLayerSize.height));
//       j += adjustment;
//     } else if (position === "above" || position === "below") {
//       m = null;
//       switch (align) {
//         case p:
//           m = contextRect.left;
//           break;
//         case "middle":
//           m = n - contextualLayerSize.width / 2;
//           break;
//         case o:
//           m = contextRect.right - contextualLayerSize.width;
//           break;
//       }
//       m &&
//         (m < screenRect.left
//           ? (adjustment = screenRect.left - m)
//           : m + contextualLayerSize.width > screenRect.right &&
//             (adjustment = screenRect.right - m - contextualLayerSize.width));
//       i += adjustment;
//     }
//   // eslint-disable-next-line no-undef
//   q = "";
//   (i !== 0 || j !== 0) &&
//     // eslint-disable-next-line no-undef
//     (q += "translate(" + Math.round(i) + "px, " + Math.round(j) + "px) ");
//   // eslint-disable-next-line no-undef
//   (k !== 0 || l !== 0) && (q += "translate(" + k + ", " + l + ") ");
//   // eslint-disable-next-line no-undef
//   style.transform = q;
//   return {
//     adjustment: adjustment,
//     style: style,
//   };
// }
