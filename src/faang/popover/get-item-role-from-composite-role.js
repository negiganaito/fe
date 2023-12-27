/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
export function getItemRoleFromCompositeRole(type) {
  switch (type) {
    case "grid":
      return "row";
    case "listbox":
      return "option";
    case "list":
      return "listitem";
    case "radiogroup":
      return "radio";
    case "row":
      return "gridcell";
    case "tablist":
      return "tab";
  }
  return null;
}
