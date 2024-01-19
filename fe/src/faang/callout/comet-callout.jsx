/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useContext, useRef } from "react";
import stylex from "@stylexjs/stylex";
import fbt from "fbt";

import { BaseContextualLayerOrientationContext } from "@/faang//context";
import { BaseRow, BaseRowItem, BaseView } from "@/faang/base-row";
import { CometColumnItem } from "@/faang/common";
import { CometColumn } from "@/faang/common/comet-column";
import { CometErrorBoundary, unrecoverableViolation } from "@/faang/error";
import { useOnOutsideClick, useVisibilityObserver } from "@/faang/hooks";
import { CometIcon, fbicon } from "@/faang/icon";
import { CometPressable } from "@/faang/pressable";
import { TetraTextPairing } from "@/faang/tetra-text";
import { ix } from "@/faang/utils";

import { CometCalloutEdge } from "./comet-callout-edge";
import { CometCalloutInset } from "./comet-callout-inset";

const styles = stylex.create({
  container: {
    display: "flex",
  },
  content: {
    backgroundColor: "var(--overlay-alpha-80)",
    borderRadius: "8px",
    borderWidth: "1px",
    boxShadow: "0 8px 16px var(--shadow-1)",
    paddingLeft: "12px",
    paddingRight: "12px",
    paddingTop: "16px",
    paddingBottom: "16px",
  },
  crossoutButton: {
    marginRight: "-4px",
    marginTop: "-8px",
  },
  item: {
    paddingLeft: "6px",
    paddingRight: "6px",
    paddingTop: "6px",
    paddingBottom: "6px",
  },
});

const colorsStyles = stylex.create({
  accent: {
    backgroundColor: "var(--accent)",
  },
  default: {
    backgroundColor: "var(--popover-background)",
  },
});

const arrowPositionsStyles = stylex.create({
  above: {
    marginBottom: "4px",
  },
  below: {
    marginTop: "4px",
  },
  end: {
    marginLeft: "4px",
  },
  start: {},
});

export const CometCallout = ({
  arrowStyle = "none",
  hasCloseButton = false,
  headline,
  inlineSurvey,
  label,
  onClose,
  onHelpful,
  onHide,
  onNotHelpful,
  onOutsideClick,
  onPressCallout_experimentalDONOTUSE,
  onShow,
  profilePhoto_experimentalDONOTUSE,
  type = "default",
  xstyle,
}) => {
  const { position } = useContext(BaseContextualLayerOrientationContext);

  let inlineSurveyShouldShow = useRef(null);

  const checkInlineSurveyShouldShow = (function () {
    if (!inlineSurveyShouldShow.current) {
      let result;
      // eslint-disable-next-line no-cond-assign
      inlineSurveyShouldShow.current = (result = !inlineSurvey
        ? undefined
        : !inlineSurvey.getShouldShowInlineSurvey
        ? undefined
        : inlineSurvey.getShouldShowInlineSurvey())
        ? result
        : !1;
    }
    return inlineSurveyShouldShow.current;
  })();

  const onOutsideClickRef = useOnOutsideClick(onOutsideClick);

  const visibilityObserver = useVisibilityObserver({
    onHidden: onHide,
    onVisible: onShow,
  });

  const colorType = type === "default" ? "primary" : "white";

  if (position === "end" && (arrowStyle === "inset" || arrowStyle === "edge")) {
    throw unrecoverableViolation(
      '"end" position with arrow is not supported yet',
      "comet_ui"
    );
  }

  const content = (
    <CometColumn>
      <CometColumnItem>
        <BaseRow>
          {profilePhoto_experimentalDONOTUSE && (
            <BaseRowItem verticalAlign="top">
              {profilePhoto_experimentalDONOTUSE}
            </BaseRowItem>
          )}

          <BaseRowItem
            expanding
            ref={visibilityObserver}
            verticalAlign="center"
            xstyle={styles.item}
          >
            <TetraTextPairing
              body={label}
              bodyColor={colorType}
              headline={headline}
              headlineColor={colorType}
              level={3}
            />
          </BaseRowItem>
          {hasCloseButton && (
            <BaseRowItem xstyle={[styles.crossoutButton, styles.item]}>
              <CometIcon
                aria-label={fbt.c("Close")}
                color={type === "default" ? "secondary" : "white"}
                icon={fbicon._(ix(478232), 16)}
                onPress={onClose}
                size={16}
              />
            </BaseRowItem>
          )}
        </BaseRow>
      </CometColumnItem>
      {!inlineSurvey || checkInlineSurveyShouldShow !== true ? null : (
        <CometColumnItem paddingTop={12}>
          <BaseRow>
            <BaseRowItem expanding verticalAlign="center" xstyle={styles.item}>
              {/* TODO */}
              {/* <CometNUXInlineSurvey
                bodyColor={type === "default" ? undefined : "white"}
                initialHasAnsweredSurvey={inlineSurvey.initialHasAnsweredSurvey}
                linkColor={type === "default" ? undefined : "white"}
                onAnswer={inlineSurvey.onAnswer}
                onHelpful={onHelpful}
                onNotHelpful={onNotHelpful}
              /> */}
            </BaseRowItem>
          </BaseRow>
        </CometColumnItem>
      )}
    </CometColumn>
  );

  const calloutContent = onPressCallout_experimentalDONOTUSE ? (
    <BaseRowItem ref={visibilityObserver}>
      <CometPressable
        onPress={onPressCallout_experimentalDONOTUSE}
        overlayDisabled
      >
        {content}
      </CometPressable>
    </BaseRowItem>
  ) : (
    content
  );

  if (arrowStyle === "inset") {
    return (
      <CometCalloutInset
        onOutsideClick={onOutsideClick}
        type={type}
        xstyle={xstyle}
      >
        {calloutContent}
      </CometCalloutInset>
    );
  }

  return arrowStyle === "edge" ? (
    <CometCalloutEdge
      onOutsideClick={onOutsideClick}
      type={type}
      xstyle={xstyle}
    >
      {calloutContent}
    </CometCalloutEdge>
  ) : (
    <CometErrorBoundary
      // eslint-disable-next-line react/no-unstable-nested-components
      fallback={() => {
        return <div />;
      }}
    >
      <BaseView xstyle={styles.container}>
        <BaseRow
          ref={onOutsideClickRef}
          xstyle={[
            styles.content,
            colorsStyles[type],
            arrowStyle === "none" && arrowPositionsStyles[position],
            xstyle,
          ]}
        />
      </BaseView>
    </CometErrorBoundary>
  );
};
