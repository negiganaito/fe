/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";

export class XPlatReactToasterView extends React.PureComponent {
  static defaultProps = {
    maxVisible: 1,
  };

  constructor(props) {
    super(props);
    this.state = {
      visibleToasts: [],
    };
  }

  static getDerivedStateFromProps = function (nextProps, prevState) {
    const { maxVisibleToasts } = nextProps;
    let updatedVisibleToasts = prevState
      ? prevState.visibleToasts.slice(0, maxVisibleToasts)
      : [];

    let currentIndex = 0;
    let filterToasts = nextProps.filterToasts;
    let toasterState = nextProps.toasterState;
    let filteredToasterState = {};

    let toastIdsToRender = filterToasts
      ? Object.keys(toasterState).filter((toastId) => {
          let toast = toasterState[toastId];
          filteredToasterState[toastId] = toast;

          let shouldRender =
            !toast ||
            !toast.shown ||
            !toast.value ||
            !toast.value.type ||
            !toast.value.type.name;

          if (
            !toast ||
            !toast.value ||
            !toast.value.type ||
            !toast.value.type.name
          ) {
            return true;
          }

          if (filterToasts.has(toast.value.type.name) && !toast.shown) {
            nextProps.onExpireToast(toastId);
            return false;
          }

          return shouldRender;
        })
      : Object.keys(toasterState);

    let renderedToastIds = updatedVisibleToasts.reduce((set, toast) => {
      if (toast) {
        set.add(toast.id);
      }
      return set;
    }, new Set());

    while (currentIndex < maxVisibleToasts) {
      let currentToastId = updatedVisibleToasts[currentIndex];

      let currentToastExists = Object.prototype.hasOwnProperty.call(
        filteredToasterState,
        currentToastId
      );

      if (currentToastExists) {
        let currentToastState = toasterState[currentToastId];
        updatedVisibleToasts[currentIndex] = {
          expired: currentToastState.expired,
          id: currentToastState.id,
          toast: currentToastState.value,
        };
        currentIndex++;
        continue;
      } else {
        updatedVisibleToasts[currentIndex] = null;
      }

      currentToastId = null;

      while (!currentToastId && currentIndex < toastIdsToRender.length) {
        let currentIdToRender = toastIdsToRender[currentIndex];
        let isRendered = renderedToastIds.has(currentIdToRender);

        if (!isRendered) {
          currentToastId = toasterState[currentIdToRender];
        }

        currentIndex++;
      }

      if (currentToastId) {
        updatedVisibleToasts[currentIndex - 1] = {
          expired: currentToastId.expired,
          id: currentToastId.id,
          toast: currentToastId.value,
        };
      }

      currentIndex++;
    }

    return {
      visibleToasts: updatedVisibleToasts,
    };
  };

  render() {
    return (
      <>
        {this.state.visibleToasts.map((visibleToast, index) =>
          visibleToast
            ? this.props.children(
                visibleToast.toast,
                visibleToast.id,
                visibleToast.expired,
                index
              )
            : null
        )}
      </>
    );
  }
}
