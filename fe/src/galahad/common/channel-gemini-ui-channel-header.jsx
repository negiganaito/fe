/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import stylex from "@stylexjs/stylex";

import { TetraText } from "@/faang/tetra-text";

const styles = stylex.create({
  titleArea: {
    display: "flex",
  },
  title: {
    paddingLeft: "12px",
    paddingTop: "8px",
  },
  body: {
    paddingLeft: "24px",
    paddingRight: "24px",
    paddingBottom: "4px",
  },
  header: {
    borderStyle: "solid",
    borderWidth: "0",
    boxSizing: "border-box",
    display: "flex",
    flexGrow: 1,
    flexShrink: 1,
    justifyContent: "space-between",
    marginTop: "0",
    marginRight: 0,
    marginBottom: "0",
    marginLeft: "0",
    minWidth: "0",
    paddingTop: "0",
    paddingRight: "0",
    paddingBottom: "0",
    paddingLeft: "0",
    position: "relative",
    zIndex: "unset",
    flexDirection: "row",
    alignItems: "center",
    minHeight: "36px",
  },
  secondaryAction: {
    marginRight: "8px",
  },
  primaryActions: {
    display: "flex",
    marginLeft: "6px",
  },
  pivotLinkGroupWrapper: {
    marginTop: "8px",
    marginBottom: "4px",
  },
  pivotActionsExtraWrapper: {
    paddingTop: "4px",
  },
  smartSettingsWrapper: {
    paddingTop: "4px",
  },
  managePriorityDialogWrapper: {
    paddingTop: "8px",
  },
  dividerSection: {
    paddingTop: "8px",
    paddingBottom: "12px",
  },
  divider: {
    backgroundColor: "var(--divider)",
    boxSizing: "border-box",
    height: "1px",
  },
  reset: {
    backgroundColor: "transparent",
    borderWidth: "0",
    marginTop: "0",
    marginRight: "0",
    marginBottom: "0",
    marginLeft: "0",
  },
  description: {
    marginTop: "0",
    marginRight: "0",
    marginBottom: "0",
    marginLeft: "0",
    paddingTop: "4px",
    paddingBottom: "8px",
    paddingStart: "4px",
  },

  dummy1: {
    paddingTop: "8px",
  },

  dummy2: {
    paddingTop: "8px",
    paddingBottom: "12px",
  },

  dummy3: {
    borderWidth: 0,
    margin: 0,
    backgroundColor: "var(--divider)",
    boxSizing: "border-box",
    height: "1px",
  },

  dummy4: {
    paddingTop: "4px",
  },

  dummy5: {
    margin: 0,
    paddingTop: "4px",
    paddingBottom: "8px",
    paddingLeft: "4px",
  },

  dummy0: {
    borderStyle: "solid",
    borderWidth: 0,
    boxSizing: "border-box",
    display: "flex",
    flexGrow: 1,
    flexShrink: 1,
    justifyContent: "space-between",
    margin: 0,
    minWidth: 0,
    padding: 0,
    position: "relative",
    zIndex: "unset",
    flexDirection: "row",
    alignItems: "center",
    minHeight: "36px",
  },

  dummy6: {
    display: "flex",
  },

  dummy7: {
    display: "flex",
    marginLeft: "6px",
  },

  dummy8: {
    marginRight: "8px",
  },

  dummy9: {
    paddingLeft: "24px",
    paddingRight: "24px",
    paddingBottom: "4px",
  },
});

// export type ChannelGeminiUIChannelHeaderProps = {
//   backAction?: any
//   'data-testid'?: string
//   hasMoreNewContentBadge?: any
//   isNotificationHeader?: boolean
//   managePriorityDialog?: any
//   maxActionsNumber?: any
//   pivotActionDescription?: any
//   pivotActions?: any
//   pivotActionsExtra?: any
//   pivotActionsLabel?: any
//   primaryAction?: any
//   secondaryAction?: any
//   showThreeFolders?: boolean
//   smartSettingsPanel?: any
//   tertiaryAction?: any
//   title?: any
// }

export function ChannelGeminiUIChannelHeader({
  backAction,
  "data-testid": dt,
  hasMoreNewContentBadge,
  isNotificationHeader = false,
  managePriorityDialog,
  maxActionsNumber,
  pivotActionDescription,
  pivotActions,
  pivotActionsExtra,
  pivotActionsLabel,
  primaryAction,
  secondaryAction,
  showThreeFolders = false,
  smartSettingsPanel,
  tertiaryAction,
  title,
}) {
  const Header = (
    <div className={stylex(styles.dummy0)}>
      <span className={stylex(styles.dummy6)}>
        {Boolean(backAction) && backAction}
        <div className={stylex(Boolean(backAction) && styles.title)}>
          <TetraText isPrimaryHeading type="headlineEmphasized1">
            {title}
          </TetraText>
        </div>
      </span>
      <span className={stylex(styles.dummy7)}>
        {tertiaryAction && (
          <span className={stylex(styles.dummy8)}>{tertiaryAction}</span>
        )}
        {secondaryAction && (
          <span className={stylex(styles.dummy8)}>{secondaryAction}</span>
        )}
        {primaryAction}
      </span>
    </div>
  );

  return (
    <div className={stylex(styles.dummy9)}>
      {Header}
      {pivotActions && (
        <div className="x1xmf6yo x12nagc">
          {/* {jsx("ChannelGeminiUIPivotLinkGroup", {
            hasMoreNewContentBadge,
            isNotificationHeader,
            maxActionsNumber,
            pivotActions,
            pivotActionsLabel,
            showThreeFolders,
          })} */}
        </div>
      )}
      {managePriorityDialog && (
        <>
          <div className={stylex(styles.dummy1)}>{managePriorityDialog}</div>
          <div className={stylex(styles.dummy2)}>
            <hr className={stylex(styles.dummy3)} />
          </div>
        </>
      )}
      {pivotActionsExtra && (
        <div className={stylex(styles.dummy4)}>{pivotActionsExtra}</div>
      )}
      {pivotActionDescription && (
        <p className={stylex(styles.dummy5)}>
          <TetraText color="secondary" type="meta4">
            {pivotActionDescription}
          </TetraText>
        </p>
      )}
      {smartSettingsPanel && (
        <div className={stylex(styles.dummy4)}>{smartSettingsPanel}</div>
      )}
    </div>
  );
}
