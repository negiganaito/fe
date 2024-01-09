/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import fbt from "fbt";

import { CometDialogContext } from "@/faang/context";
import { CometErrorBoundary, FBLogger } from "@/faang/error";
import { useIsCalledDuringRender } from "@/faang/hooks";
import { useIsMountedRef } from "@/faang/utils";

import { BaseModal } from "../modal";

const O = ({
  dialogConfig,
  dialogConfigsRef,
  displayBaseModal_DO_NOT_USE,
  removeDialogConfig,
}) => {
  const i = useRef(null);

  useEffect(() => {
    return function () {
      i.current && window.cancelAnimationFrame(i.current);
    };
  }, []);

  const { dialog: Dialog, dialogProps } = dialogConfig;

  const [onHide, q] = useState(false);

  let onClose = useCallback(() => {
    // eslint-disable-next-line no-inner-declarations, no-var, no-undef
    for (var a = arguments.length, d = new Array(a), f = 0; f < a; f++)
      // eslint-disable-next-line no-undef
      d[f] = arguments[f];
    i.current && window.cancelAnimationFrame(i.current);
    let h = dialogConfigsRef.current.indexOf(dialogConfig);
    h < 0 &&
      FBLogger("comet_ui")
        .blameToPreviousFrame()
        .mustfix("Attempting to close a dialog that does not exist anymore.");
    i.current = window.requestAnimationFrame(() => {
      removeDialogConfig(dialogConfig, d);
      i.current = null;
    });
  }, [dialogConfig, dialogConfigsRef, removeDialogConfig]);

  const onError = useCallback(() => {
    onClose();

    cometPushToast.cometPushErrorToast({
      message: fbt(
        "Something isn't working. This may be because of a technical error we're working to fix.",
        "Something isn't working. This may be because of a technical error we're working to fix."
      ),
      truncateText: false,
    });
  }, [onClose]);

  const DialogComp = (
    <Dialog {...dialogProps} onClose={onClose} onHide={onHide} />
  );

  return (
    <CometErrorBoundary onError={onError}>
      {displayBaseModal_DO_NOT_USE === true ? (
        <BaseModal
          hidden={q}
          interactionDesc={dialogConfig.interactionDesc}
          interactionUUID={dialogConfig.interactionUUID}
          isOverlayTransparent={
            !dialogConfig.baseModalProps
              ? undefined
              : dialogConfig.isOverlayTransparent
          }
          stackingBehavior="above-nav"
        >
          {DialogComp}
        </BaseModal>
      ) : (
        DialogComp
      )}
    </CometErrorBoundary>
  );
};

export const CometTransientDialogProvider = ({
  displayBaseModal_DO_NOT_USE = true,
  ...rest
}) => {
  const [g, h] = useState([]);

  const isCalledDuringRender = useIsCalledDuringRender();

  const cometDialogContextValue = useCallback(
    // eslint-disable-next-line max-params
    (dialogComp, dialogProps, e, onClose, option) => {
      const { loadType, preloadTrigger, tracePolicy } = e;

      e.addMetadata("interaction_type", "dialog");
      e.addMetadata("load_type", loadType);
      preloadTrigger && e.addMetadata("preload_trigger", preloadTrigger);

      let m = "Dialog";

      h((b) => {
        let c;
        // eslint-disable-next-line no-cond-assign
        c = (c = !option ? undefined : option.replaceCurrentDialog) ? c : false;
        let e = {
          baseModalProps: !option ? undefined : option.baseModalProps,
          dialog: dialogComp,
          dialogProps: dialogProps,
          interactionDesc: m,
          // interactionUUID: i,
          onClose: onClose,
          tracePolicy,
        };
        return c ? b.slice(0, b.length - 1).concat(e) : b.concat(e);
      });
    },
    [isCalledDuringRender]
  );

  let dialogConfigsRef = useRef(g);

  useEffect(() => {
    dialogConfigsRef.current = g;
  }, [g]);

  let q = useIsMountedRef();

  const removeDialogConfig = useCallback(
    (a, c) => {
      if (!q.current) return;
      h((b) => {
        let c = b.indexOf(a);
        return c < 0 ? b : b.slice(0, c);
      });
      a.onClose && a.onClose.apply(a, c);
      // b("cr:945") && b("cr:945").logClose(a.tracePolicy, a.interactionUUID);
    },
    [q]
  );

  return (
    <CometDialogContext.Provider value={cometDialogContextValue}>
      {rest.children}
      {g.map((dialogConfig, index) => {
        return (
          <O
            key={index}
            dialogConfig={dialogConfig}
            dialogConfigsRef={dialogConfigsRef}
            displayBaseModal_DO_NOT_USE={displayBaseModal_DO_NOT_USE}
            removeDialogConfig={removeDialogConfig}
          />
        );
      })}
    </CometDialogContext.Provider>
  );
};
