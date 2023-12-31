/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import stylex from "@stylexjs/stylex";
import fbt from "fbt";

import { CometMenuItemBaseRoleContext } from "@/faang//context";
import {
  CometFocusGroupFirstLetterNavigation,
  CometMenuFocusGroup,
} from "@/faang/focus";
import { FocusRegion, focusScopeQueries } from "@/faang/focus-region";
import { fbicon } from "@/faang/icon";
import { ix } from "@/faang/utils";

import { DangerouslyAccessReactElementInternals_DO_NOT_USE_IN_NEW_CODE } from "../common";
import { CometErrorBoundary } from "../error/comet-error-boundary";
import { TetraTextPairing } from "../tetra-text";

import { BaseScrollableArea } from "./base-scrollable-area";
import { CometListCellStrict } from "./comet-list-cell-strict";
import { CometSeparatorMenuItem } from "./comet-separator-menu-item";

const styles = stylex.create({
  listItem: {
    borderRadius: "4px",
    display: "flex",
    flexDirection: "row",
    marginTop: 0,
    marginRight: "8px",
    marginBottom: 0,
    marginLeft: "8px",
    paddingTop: "12px",
    paddingRight: "8px",
    paddingBottom: "12px",
    paddingLeft: "8px",
  },
  root: {
    alignItems: "stretch",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: "var(--menu-base-padding-vertical,8px)",
    paddingBottom: "var(--menu-base-padding-vertical,8px)",
  },
  sizeFull: {
    marginRight: "48px",
    width: "100%",
  },
  sizeNormal: {
    width: "344px",
  },
  sizeSmall: {
    width: "328px",
  },
  dummy1: {
    borderRadius: "4px",
    display: "flex",
    flexDirection: "row",
    marginTop: 0,
    marginRight: "8px",
    marginBottom: 0,
    marginLeft: "8px",
    paddingTop: "12px",
    paddingRight: "8px",
    paddingBottom: "12px",
    paddingLeft: "8px",
  },
});

/**
 * @typedef CometMenuBaseProps
 * @property {*} children
 * @property {*} footer
 * @property {*} header
 * @property {*} maxHeight
 * @property {'menu' | 'listbox'} role
 * @property {'full' | 'normal' | 'small'} size
 */

const MAX_HEIGHT = 145;

const roleMap = {
  listbox: "option",
  menu: "menuitem",
};

/**
 *
 * @param {CometMenuBaseProps} props
 */
// eslint-disable-next-line complexity
export function CometMenuBase({
  children,
  footer,
  header,
  maxHeight,
  role = "menu",
  size = "normal",
}) {
  let p = 0;

  const _children = React.Children.toArray(children).map((child) => {
    if (!child) {
      return null;
    }

    let b = p++;

    return DangerouslyAccessReactElementInternals_DO_NOT_USE_IN_NEW_CODE(child)
      .type === CometSeparatorMenuItem ? (
      child
    ) : (
      <CometErrorBoundary key={b}>{child}</CometErrorBoundary>
    );
  });

  const cometMenuItemBaseRoleValue = roleMap[role];

  if (React.Children.count(children) > 0) {
    return (
      <BaseScrollableArea
        horizontal={false}
        style={
          maxHeight
            ? {
                maxHeight: Math.max(maxHeight, MAX_HEIGHT),
              }
            : undefined
        }
        vertical
        xstyle={[
          styles.root,
          size === "full" && styles.sizeFull,
          size === "normal" && styles.sizeNormal,
          size === "small" && styles.sizeSmall,
        ]}
      >
        <CometMenuItemBaseRoleContext.Provider
          value={cometMenuItemBaseRoleValue}
        >
          {header && (
            <>
              {header.onPressBack ? (
                <CometListCellStrict
                  addOnStart={{
                    "aria-label": fbt.c("Back"), // `h._('__JHASH__v6nfNn2Wv-y__JHASH__',)`,
                    icon: fbicon._(ix(512665), 24),
                    // `d('fbicon')._(i('512665'), 24)`,
                    onPress: header.onPressBack,
                    type: "icon",
                  }}
                  addOnStartVerticalAlign="center"
                  emphasized={false}
                  headline={header.title}
                  level={3}
                  meta={header.meta}
                  paddingHorizontal={8}
                />
              ) : (
                <div className={stylex([styles.listItem])}>
                  <TetraTextPairing
                    body={header.body}
                    headline={header.title}
                    level={3}
                    meta={header.meta}
                    reduceEmphasis
                  />
                </div>
              )}

              <CometSeparatorMenuItem />
            </>
          )}
          <FocusRegion.FocusRegion
            autoFocusQuery={
              (!header ? undefined : header.onPressBack)
                ? focusScopeQueries.tabbableScopeQuery
                : null
            }
          >
            <CometMenuFocusGroup.FocusGroup
              onNavigate={
                CometFocusGroupFirstLetterNavigation.handleFirstLetterNavigation
              }
              orientation="vertical"
              preventScrollOnFocus={false}
              tabScopeQuery={focusScopeQueries.tabbableScopeQuery}
              wrap
            >
              {_children}
            </CometMenuFocusGroup.FocusGroup>
          </FocusRegion.FocusRegion>
          {footer && (
            <>
              <CometSeparatorMenuItem />
              <div className={stylex(styles.dummy1)}>
                <TetraTextPairing level={3} meta={footer.text} />
              </div>
            </>
          )}
        </CometMenuItemBaseRoleContext.Provider>
      </BaseScrollableArea>
    );
  }

  // return React.Children.count(children) > 0
  //   ? jsx(BaseScrollableArea, {
  //       horizontal: false,
  //       style: maxHeight
  //         ? {
  //             maxHeight: Math.max(maxHeight, MAX_HEIGHT),
  //           }
  //         : undefined,
  //       vertical: true,
  //       xstyle: [
  //         styles.root,
  //         size === "full" && styles.sizeFull,
  //         size === "normal" && styles.sizeNormal,
  //         size === "small" && styles.sizeSmall,
  //       ],
  //       children: jsxs(CometMenuItemBaseRoleContext.Provider, {
  //         value: cometMenuItemBaseRoleValue,
  //         children: [
  //           header
  //             ? jsxs(React.Fragment, {
  //                 children: [
  //                   header.onPressBack
  //                     ? jsx(CometListCellStrict, {
  //                         addOnStart: {
  //                           "aria-label": fbt.c("Back"), // `h._('__JHASH__v6nfNn2Wv-y__JHASH__',)`,
  //                           icon: fbicon._(ix(512665), 24),
  //                           // `d('fbicon')._(i('512665'), 24)`,
  //                           onPress: header.onPressBack,
  //                           type: "icon",
  //                         },
  //                         addOnStartVerticalAlign: "center",
  //                         emphasized: false,
  //                         headline: header.title,
  //                         level: 3,
  //                         meta: header.meta,
  //                         paddingHorizontal: 8,
  //                       })
  //                     : jsx("div", {
  //                         className: stylex([styles.listItem]),
  //                         children: jsx(TetraTextPairing, {
  //                           body: header.body,
  //                           headline: header.title,
  //                           level: 3,
  //                           meta: header.meta,
  //                           reduceEmphasis: true,
  //                         }),
  //                       }),
  //                   jsx(CometSeparatorMenuItem, {}),
  //                 ],
  //               })
  //             : null,
  //           jsx(FocusRegion.FocusRegion, {
  //             autoFocusQuery: (!header ? undefined : header.onPressBack)
  //               ? focusScopeQueries.tabbableScopeQuery
  //               : null,
  //             children: jsx(CometMenuFocusGroup.FocusGroup, {
  //               onNavigate:
  //                 CometFocusGroupFirstLetterNavigation.handleFirstLetterNavigation,
  //               orientation: "vertical",
  //               preventScrollOnFocus: false,
  //               tabScopeQuery: focusScopeQueries.tabbableScopeQuery,
  //               wrap: true,
  //               children: _children,
  //             }),
  //           }),
  //           footer
  //             ? jsxs(React.Fragment, {
  //                 children: [
  //                   jsx(CometSeparatorMenuItem, {}),
  //                   jsx("div", {
  //                     className: stylex(styles.dummy1),
  //                     // 'x1lcm9me x1yr5g0i xrt01vj x10y3i5r x78zum5 x1q0g3np xdj266r x1emribx xat24cr x1i64zmx xz9dl7a x1sxyh0 xsag5q8 xurb0ha',
  //                     children: jsx(TetraTextPairing, {
  //                       level: 3,
  //                       meta: footer.text,
  //                     }),
  //                   }),
  //                 ],
  //               })
  //             : null,
  //         ],
  //       }),
  //     })
  //   : null;
}
