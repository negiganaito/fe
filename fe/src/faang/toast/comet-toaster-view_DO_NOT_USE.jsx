/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useEffect, useState } from "react";
import stylex from "@stylexjs/stylex";

import { BasePortal } from "@/faang/dialog";
import { useToasterStateManager } from "@/faang/hooks";
import { BaseContextualLayerAnchorRoot } from "@/faang/modal";

import { BaseToastAnimationInternal } from "./base-toast-animation-internal";
import { XPlatReactToasterView } from "./x-plat-react-toaster-view";

const _708253 = true; // c("gkx")("708253")
const _1341692 = true;
const _1196 = true;

const styles = stylex.create({
  list: {
    display: "flex",
    flexDirection: "column",
    listStyleType: "none",
    maxWidth: "100%",
  },
  root: {
    bottom: 0,
    display: "flex",
    right: 0,
    pointerEvents: "none",
    position: "fixed",
    left: "var(--global-panel-width)",
    zIndex: 4,
  },
  rootBlue: {
    zIndex: 402,
  },
  rootWorkplaceLegacy: {
    zIndex: 502,
  },
  toast: {
    paddingTop: "16px",
    paddingRight: "16px",
    paddingBottom: "16px",
    paddingLeft: "16px",
    pointerEvents: "all",
    // eslint-disable-next-line @stylexjs/valid-styles
    "@media (max-width: 899px)": {
      maxWidth: "100%",
    },
  },

  dummy: {
    display: "flex",
    flexDirection: "column",
    listStyleType: "none",
    maxWidth: "100%",
  },
});

const alignStyles = stylex.create({
  center: {
    justifyContent: "center",
  },
  end: {
    justifyContent: "flex-end",
  },
  start: {
    justifyContent: "flex-start",
  },
});

const widthStyles = stylex.create({
  full: {
    maxWidth: "100%",
  },
  regular: {
    maxWidth: "328px",
  },
});

export const CometToasterView_DO_NOT_USE = ({
  align = "start",
  filterToasts,
  maxVisible = 1,
  maxWidth = "full",
}) => {
  const stateManager = useToasterStateManager();
  const [toastState, setToastState] = useState(() => {
    return stateManager.getEmptyState();
  });

  useEffect(() => {
    const view = stateManager.registerView(setToastState, 0);
    return view.remove;
  }, [stateManager]);

  return (
    <BasePortal
      target={document.body}
      xstyle={[
        styles.root,
        _708253
          ? undefined
          : _1341692
          ? styles.rootWorkplaceLegacy
          : styles.rootBlue,
        alignStyles[align],
      ]}
    >
      <ul className={stylex(styles.dummy)}>
        <XPlatReactToasterView
          filterToasts={filterToasts}
          maxVisible={maxVisible}
          onExpireToast={(time) => {
            stateManager.expire(time);
          }}
          toasterState={toastState}
          // eslint-disable-next-line max-params
          children={(children, id, expired, position) => {
            console.log({ children, id });

            return (
              <BaseToastAnimationInternal
                key={position}
                expired={expired}
                id={id}
                position={position}
                xstyle={[
                  styles.toast,
                  widthStyles[_1196 ? "regular" : maxWidth],
                ]}
              >
                <BaseContextualLayerAnchorRoot>
                  {children}
                </BaseContextualLayerAnchorRoot>
              </BaseToastAnimationInternal>
            );
          }}
        />
      </ul>
    </BasePortal>
  );
};
