/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useMemo } from "react";

import { CometFocusGroupContext } from "../context";
import { focusScopeQueries } from "../focus-region";

import { CometCompositeFocusIndicator } from "./comet-composite-focus-indicator";
import { FocusGroup } from "./focus-group";

const [FocusContainer, FocusItem] = FocusGroup.createFocusGroup(
  focusScopeQueries.tabbableScopeQuery
);

export const CometFocusGroup = (props) => {
  const { children, hideArrowSignifiers, role, ...rest } = props;

  const cometFocusGroupValue = useMemo(() => {
    return {
      FocusContainer,
      FocusItem,
    };
  }, []);

  const compositeInfo = useMemo(() => {
    return {
      hideArrowSignifiers: hideArrowSignifiers === true,
      horizontal: props.orientation !== "vertical",
      role,
      vertical: props.orientation !== "horizontal",
    };
  }, [hideArrowSignifiers, props.orientation, role]);

  return (
    <CometCompositeFocusIndicator
      compositeInfo={compositeInfo}
      children={(val) => {
        return (
          <CometFocusGroupContext.Provider value={cometFocusGroupValue}>
            <FocusContainer {...rest}>{children(val)}</FocusContainer>
          </CometFocusGroupContext.Provider>
        );
      }}
    />
  );
};
