/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

// import { jsx, jsxs } from "react/jsx-runtime";
import { recoverableViolation } from "@/faang/error/recoverable-violation";
import { useDelayedState, useStable } from "@/faang/hooks";

import { BaseTooltipTargetWrapper } from "./base-tooltip-target-wrapper";

/**
 * @typedef ContainerProps
 * @property {ReactNode?} children
 * @property {any} tooltipImpl
 */

/**
 * @typedef InternalContextProps
 * @property {any} activeContentKey
 * @property {any} isVisible
 * @property { (hideDelayMs: any, onVisibilityChange: any) => void} onHide
 * @property {  (option: any, showDelayMs: any, onVisibilityChange: (param: any) => any) => void} onShow
 * @property { string} tooltipIdentifier
 */

/** @type {import('react').Context<InternalContextProps>} */
const TooltipVisualizeContext = createContext(undefined);

/**
 *
 * @param {ContainerProps} props
 */
function Container(props) {
  const { children, tooltipImpl: TooltipImpl } = props;

  const [isVisible, setVisible] = useDelayedState(false);
  const [tooltipImplProps, setTooltipImplProps] = useState(null);

  const tooltipIdentifier = useId();

  const activeContentKey =
    tooltipImplProps && tooltipImplProps.contentKey
      ? tooltipImplProps.contentKey
      : null;

  const internalContextValue = useMemo(() => {
    return {
      activeContentKey,
      isVisible,
      /**
       *
       * @param {any} hideDelayMs
       * @param {any} onVisibilityChange
       */
      onHide: function (hideDelayMs, onVisibilityChange) {
        setVisible(false, hideDelayMs, onVisibilityChange);
      },
      onShow: (option, showDelayMs, onVisibilityChange) => {
        setTooltipImplProps(option);
        setVisible(true, showDelayMs, onVisibilityChange);
      },
      tooltipIdentifier,
    };
  }, [activeContentKey, isVisible, tooltipIdentifier, setVisible]);

  return (
    <>
      <TooltipVisualizeContext.Provider value={internalContextValue}>
        {children}
      </TooltipVisualizeContext.Provider>
      {tooltipImplProps && (
        <TooltipImpl
          {...tooltipImplProps}
          id={isVisible ? tooltipIdentifier : undefined}
          isVisible={isVisible}
        />
      )}
    </>
  );

  // return jsxs(React.Fragment, {
  //   children: [
  //     jsx(TooltipVisualizeContext.Provider, {
  //       children,
  //       value: internalContextValue,
  //     }),
  //     tooltipImplProps
  //       ? jsx(
  //           tooltipImpl,
  //           Object.assign({}, tooltipImplProps, {
  //             id: isVisible ? tooltipIdentifier : void 0,
  //             isVisible: isVisible,
  //           }),
  //         )
  //       : null,
  //   ],
  // });
}

const Context = TooltipVisualizeContext;

// type ChildProps = {
//   children?: ReactNode
//   disabled?: boolean
//   forceInlineDisplay?: any
//   hideDelayMs?: number
//   showDelayMs?: number
//   onVisibilityChange?: any
//   //
//   tooltip?: any
//   headline?: any
//   align?: any
// }

let count = 0;

function countTooltip() {
  return "tooltip-" + count++;
}

function Child(props) {
  const {
    children,
    disabled = false,
    forceInlineDisplay,
    hideDelayMs,
    showDelayMs,
    onVisibilityChange,
    ...rest
  } = props;

  const contentKey = useStable(countTooltip);
  const contextRef = useRef(null);

  const internalContextValue = useContext(TooltipVisualizeContext);

  const {
    activeContentKey,
    isVisible = false,
    onHide,
    onShow,
    tooltipIdentifier,
  } = internalContextValue ?? {};

  const onShowCb = useCallback(() => {
    !disabled &&
      onShow &&
      onShow(
        {
          contentKey: contentKey,
          contextRef: contextRef,
          ...rest,
        },
        showDelayMs,
        onVisibilityChange
      );
  }, [disabled, onShow, contentKey, rest, showDelayMs, onVisibilityChange]);

  const onHideCb = useCallback(() => {
    if (onHide) {
      onHide(hideDelayMs, onVisibilityChange);
    }
  }, [hideDelayMs, onHide, onVisibilityChange]);

  if (!internalContextValue) {
    recoverableViolation(
      "BaseTooltipGroup: Cannot render a BaseTooltipGroupChild component outside of a BaseTooltipGroup component. ",
      "comet_ui"
    );
  }

  return (
    <BaseTooltipTargetWrapper
      forceInlineDisplay={forceInlineDisplay}
      onHide={onHideCb}
      onShow={onShowCb}
      ref={contextRef}
      tooltipIdentifier={
        isVisible && activeContentKey === contentKey
          ? tooltipIdentifier
          : undefined
      }
    >
      {children}
    </BaseTooltipTargetWrapper>
  );

  // return jsx(BaseTooltipTargetWrapper, {
  //   children,
  //   forceInlineDisplay,
  //   onHide: onHideCb,
  //   onShow: onShowCb,
  //   ref: contextRef,
  //   tooltipIdentifier: isVisible && activeContentKey === contentKey ? tooltipIdentifier : undefined,
  // });
}

export const BaseTooltipGroup = {
  Child,
  Container,
  Context,
};
