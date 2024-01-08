/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { forwardRef, useCallback, useReducer } from "react";
import { jsx } from "react/jsx-runtime";

import { BaseMultiPageViewContainer } from "./base-multi-page-view-container";
import { BaseMultiPageViewReducer } from "./base-multi-page-view-reducer";

// type BaseMultiPageViewProps = {
//   disableAutoFocus: boolean
//   disableFocusContainment: boolean
//   fallback?
//   children?: ReactNode
// }

export const BaseMultiPageView = forwardRef((props, ref) => {
  const [pageHistory, dispatch] = useReducer(
    BaseMultiPageViewReducer.reducer,
    BaseMultiPageViewReducer.initialState
  );

  const onAddPageCb = useCallback(
    (direction, component, options) => {
      dispatch({
        component: component,
        direction: direction,
        pageKey: !options ? undefined : options.pageKey,
        type: "push_page",
      });
    },
    [dispatch]
  );

  const onPopPageCb = useCallback(
    (p) => {
      return dispatch({
        index: !p ? undefined : p.index,
        pageKey: !p ? undefined : p.pageKey,
        type: "pop_page",
      });
    },
    [dispatch]
  );

  const onClearRemovedPagesCb = useCallback(() => {
    dispatch({
      type: "clear_removed_pages",
    });
  }, [dispatch]);

  return jsx(BaseMultiPageViewContainer, {
    ...props,
    onAddPage: onAddPageCb,
    onClearRemovedPages: onClearRemovedPagesCb,
    onPopPage: onPopPageCb,
    pageHistory: pageHistory,
    ref,
  });
});
