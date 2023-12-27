/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { memoizeWithArgs } from "@/faang/utils";

export const getTetraTextHierarchyStyle = memoizeWithArgs(
  /**
   *
   * @param {number | string} level
   * @param {boolean} emphasized
   * @returns
   */
  (level, emphasized) => {
    switch (level) {
      case 1:
        return {
          bodyType: "body1",
          headlineType: "headlineEmphasized1",
          metaType: "meta1",
        };
      case 2:
        return {
          bodyType: "body2",
          headlineType: "headlineEmphasized2",
          metaType: "meta2",
        };
      case 3:
        return {
          bodyType: "body3",
          headlineType: emphasized ? "headline3" : "headlineEmphasized3",
          metaType: "meta3",
        };
      // eslint-disable-next-line default-case-last
      default:
      case 4:
        return {
          bodyType: "body4",
          headlineType: emphasized ? "headline4" : "headlineEmphasized4",
          metaType: "meta4",
        };
      case "entityHeader1":
        return {
          bodyType: "body2",
          headlineType: "entityHeaderHeadline1",
          metaType: "entityHeaderMeta1",
        };
      case "entityHeader2":
        return {
          bodyType: "body2",
          headlineType: "entityHeaderHeadline2",
          metaType: "entityHeaderMeta2",
        };
    }
  },
  /**
   *
   * @param {number | string} level
   * @param {boolean} emphasized
   * @returns
   */
  (level, emphasized) => {
    return String(level) + (emphasized ? "" : "e");
  }
);
