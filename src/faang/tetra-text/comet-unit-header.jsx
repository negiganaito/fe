/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useState } from "react";
import stylex from "@stylexjs/stylex";

import { CometColumn } from "../common/comet-column";
import { CometColumnItem } from "../common/comet-column-item";
import { isBlueprintStylesEnabled } from "../hooks";
import { CometIcon, IconSource, SVGICON } from "../icon";
import { CometPressable } from "../pressable";

import { TetraText } from "./tetra-text";
import { TetraTextPairing } from ".";

const k = 8;
const l = stylex.create({
  action: {
    backgroundColor: "none",
    borderTopStyle: "none",
    borderRightStyle: "none",
    borderBottomStyle: "none",
    borderLeftStyle: "none",
    display: "inline-block",
    marginTop: "0",
    marginRight: "0",
    marginBottom: "0",
    marginLeft: "0",
    paddingTop: "0",
    paddingRight: "0",
    paddingBottom: "0",
    paddingLeft: "0",
    position: "relative",
    verticalAlign: "bottom",
  },
  actionButton: {
    color: "var(--blue-link)",
    cursor: "pointer",
  },
  actionHidden: {
    opacity: "0",
  },
  hairline: {
    backgroundColor: "var(--divider)",
    height: "1px",
    marginBottom: "-1px",
  },
  root: {
    paddingBottom: "4px",
  },
  showActionOnHover: {
    visibility: "hidden",
    // eslint-disable-next-line @stylexjs/valid-styles
    "@media (pointer: coarse)": {
      visibility: "visible",
    },
  },
});

const m = stylex.create({
  0: {
    paddingTop: "0",
  },
  8: {
    paddingTop: "8px",
  },
  12: {
    paddingTop: "12px",
  },
  16: {
    paddingTop: "16px",
  },
  20: {
    paddingTop: "20px",
  },
});

export const CometUnitHeader = (props) => {
  const {
    action,
    actionAccessibilityLabel,
    actionDisabled = false,
    actionHidden = false,
    actionLinkProps,
    actionRef,
    actiontestid,
    actionWrapper,
    addOn_DEPRECATED,
    body,
    bodyColor = "secondary",
    bodyLineLimit = 3,
    disabled,
    hasTopDivider = false,
    headline,
    headlineColor = "primary",
    iconColor = "primary",
    iconSize = 16,
    iconType,
    isSemanticHeading = true,
    level,
    linkProps,
    meta,
    metaColor = "secondary",
    metaLocation,
    metaTestID,
    onActionHoverIn,
    onActionHoverOut,
    onActionPress,
    onActionPressIn,
    onActionPressOut,
    onPress,
    onPressIn,
    onPressOut,
    paddingHorizontal = 16,
    paddingTop = 20,
    showActionOnHover = false,
    testOnly_actionPressed,
    testOnly_pressed,
    ...rest
  } = props;

  const [V, U] = useState(false);
  let W;
  if (action) {
    const h = {
      "aria-label": actionAccessibilityLabel,
      disabled: actionDisabled,
      linkProps: actionLinkProps,
      onHoverIn: onActionHoverIn,
      onHoverOut: onActionHoverOut,
      onPress: onActionPress,
      onPressIn: onActionPressIn,
      onPressOut: onActionPressOut,
      testid: actiontestid,
      testOnly_pressed: testOnly_actionPressed ?? false,
    };

    if (action instanceof IconSource) {
      W = <CometIcon {...h} color={iconColor} icon={action} ref={actionRef} />;
    } else if (action instanceof SVGICON.SVGIcon) {
      W = (
        <CometIcon
          {...h}
          color={iconColor}
          icon={action}
          ref={actionRef}
          size={iconSize}
        />
      );
    } else {
      W = (
        <CometPressable
          {...h}
          className_DEPRECATED="actionChildElement"
          onFocusVisibleChange={U}
          overlayOffset={k}
          overlayRadius={isBlueprintStylesEnabled() ? 8 : 4}
          ref={actionRef}
          xstyle={[
            l.actionButton,
            l.action,
            actionHidden && !V && l.actionHidden,
            showActionOnHover && l.showActionOnHover,
          ]}
        >
          <TetraText
            color={disabled ? "disabled" : "blueLink"}
            numberOfLines={1}
            type={level === 2 ? "body2" : "body3"}
          >
            {action}
          </TetraText>
        </CometPressable>
      );
    }
  } else {
    if (addOn_DEPRECATED) {
      W = (
        <div className="x1k74hu9 x1ejq31n xd10rxx x1sy0etr x17r0tee x1rg5ohu xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x3ajldb">
          {addOn_DEPRECATED}
        </div>
      );
    }
  }

  if (actionWrapper) {
    const { component: Component } = actionWrapper;

    W = <Component {...actionWrapper.props}>{W}</Component>;
  }

  const J = (
    <TetraTextPairing
      body={body}
      bodyColor={bodyColor}
      bodyLineLimit={bodyLineLimit}
      headline={headline}
      headlineAddOn={W}
      headlineColor={headlineColor}
      headlineLineLimit={2}
      isSemanticHeading={isSemanticHeading}
      level={level}
      meta={meta}
      metaColor={metaColor}
      metaLineLimit={1}
      metaLocation={metaLocation ?? "below"}
      metaTestID={metaTestID}
    />
  );

  const L = (
    <CometColumn
      {...rest}
      paddingHorizontal={hasTopDivider ? 0 : paddingHorizontal}
      xstyle={[l.root, m[paddingTop]]}
    >
      <CometColumnItem>
        {onPress ? (
          <CometPressable
            disabled={disabled}
            linkProps={linkProps}
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            overlayDisabled
            ref={actionRef}
            testOnly_pressed={testOnly_pressed ?? false}
          >
            {J}
          </CometPressable>
        ) : (
          J
        )}
      </CometColumnItem>
    </CometColumn>
  );

  return hasTopDivider ? (
    <CometColumn paddingHorizontal={paddingHorizontal}>
      <CometColumnItem>
        <CometBase xstyle={l.hairline} />
      </CometColumnItem>
      {L}
    </CometColumn>
  ) : (
    L
  );
};
