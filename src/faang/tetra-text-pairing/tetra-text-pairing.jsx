/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import stylex from "@stylexjs/stylex";
import React from "react";

import { TetraText } from "@/faang/tetra-text";

import { CometHeadlineWithAddOn } from "./comet-headline-with-add-on";
import { getTetraTextHierarchyStyle } from "./get-tetra-text-hierarchy-style";

const styles = stylex.create({
  item: {
    marginBottom: "5px",
    marginTop: "5px",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "-5px",
    marginTop: "-5px",
  },
});

const levelStyles01 = stylex.create({
  1: {
    marginBottom: "-7px",
    marginTop: "-7px",
  },
  2: {
    marginBottom: "-6px",
    marginTop: "-6px",
  },
  entityHeader1: {
    marginBottom: "-8px",
    marginTop: "-8px",
  },
  entityHeader2: {
    marginBottom: "-8px",
    marginTop: "-8px",
  },
});

const levelStyles02 = stylex.create({
  1: {
    marginBottom: "7px",
    marginTop: "7px",
  },
  2: {
    marginBottom: "6px",
    marginTop: "6px",
  },
  entityHeader1: {
    marginBottom: "8px",
    marginTop: "8px",
  },
  entityHeader2: {
    marginBottom: "8px",
    marginTop: "8px",
  },
});

/**
 *
 * @param {import("./types").TetraTextPairingProps} props
 * @returns
 */
export function TetraTextPairing(props) {
  const {
    body,
    bodyColor = "primary",
    bodyLineLimit,
    bodyRef,
    bodyTruncationTooltip,

    dir = "auto",

    headline,
    headlineAddOn,
    headlineColor = "primary",
    headlineLineLimit,
    headlineRef,
    headlineTruncationTooltip,

    isPrimaryHeading,
    isSemanticHeading,
    level,

    meta,
    metaColor = "secondary",
    metaLineLimit,
    metaLocation = "below",
    metaRef,
    // eslint-disable-next-line no-unused-vars
    metaTestID,
    metaTruncationTooltip,

    reduceEmphasis = false,
    // eslint-disable-next-line no-unused-vars
    testid,
    textAlign = "start",
  } = props;

  const { bodyType, headlineType, metaType } = getTetraTextHierarchyStyle(
    level,
    reduceEmphasis
  );

  const className = stylex(styles.item, levelStyles02[level]);

  const Headline = headline && (
    <div className={className}>
      {headlineAddOn ? (
        <CometHeadlineWithAddOn
          addOn={headlineAddOn}
          color={headlineColor}
          headlineRef={headlineRef}
          isPrimaryHeading={isPrimaryHeading}
          isSemanticHeading={isSemanticHeading}
          numberOfLines={headlineLineLimit}
          type={headlineType}
        >
          {headline}
        </CometHeadlineWithAddOn>
      ) : (
        <TetraText
          align={textAlign}
          color={headlineColor}
          dir={dir}
          isPrimaryHeading={isPrimaryHeading}
          isSemanticHeading={isSemanticHeading}
          numberOfLines={headlineLineLimit}
          ref={headlineRef}
          truncationTooltip={headlineTruncationTooltip}
          type={headlineType}
        >
          {headline}
        </TetraText>
      )}
    </div>
  );

  const Meta = meta && (
    <div className={className}>
      <TetraText
        align={textAlign}
        color={metaColor}
        dir={dir}
        isSemanticHeading={false}
        numberOfLines={metaLineLimit}
        ref={metaRef}
        truncationTooltip={metaTruncationTooltip}
        type={metaType}
      >
        {meta}
      </TetraText>
    </div>
  );

  return (
    <div
      className={stylex(styles.root, levelStyles01[level])}
      data-testid={undefined}
    >
      {metaLocation === "above" && Meta}
      {Headline}
      {body && (
        <div className={className}>
          <TetraText
            align={textAlign}
            color={bodyColor}
            dir={dir}
            isSemanticHeading={false}
            numberOfLines={bodyLineLimit}
            ref={bodyRef}
            truncationTooltip={bodyTruncationTooltip}
            type={bodyType}
          >
            {body}
          </TetraText>
        </div>
      )}
      {metaLocation === "below" && Meta}
    </div>
  );
}
