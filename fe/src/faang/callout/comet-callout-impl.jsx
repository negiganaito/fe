/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useContext } from "react";

import { BaseCalloutImpl } from "./base-callout-impl";
import { CometCallout } from "./comet-callout";
import { CometCalloutContext } from "./comet-callout-context";

export const CometCalloutImpl = ({ calloutID, calloutProps }) => {
  const cometCalloutContextValue = useContext(CometCalloutContext);

  return !cometCalloutContextValue || !calloutProps ? null : (
    <BaseCalloutImpl>
      <CometCallout
        arrowStyle={calloutProps.arrowStyle}
        hasCloseButton={calloutProps.hasCloseButton}
        headline={calloutProps.headline}
        inlineSurvey={calloutProps.inlineSurvey}
        label={calloutProps.label}
        onClose={
          calloutProps.hasCloseButton === true
            ? () => {
                cometCalloutContextValue.removeCallout(calloutID);
                !calloutProps.onClose ? undefined : calloutProps.onClose();
              }
            : undefined
        }
        onHelpful={calloutProps.onHelpful}
        onHide={calloutProps.onHide}
        onNotHelpful={calloutProps.onNotHelpful}
        onOutsideClick={() => {
          calloutProps.disableOutsideClick !== !0 &&
            cometCalloutContextValue.removeCallout(calloutID);
        }}
        onPressCallout_experimentalDONOTUSE={
          calloutProps.onPressCallout_experimentalDONOTUSE
        }
        onShow={calloutProps.onShow}
        profilePhoto_experimentalDONOTUSE={
          calloutProps.profilePhoto_experimentalDONOTUSE
        }
        type={calloutProps.type}
        xstyle={calloutProps.xstyle}
      />
    </BaseCalloutImpl>
  );
};
