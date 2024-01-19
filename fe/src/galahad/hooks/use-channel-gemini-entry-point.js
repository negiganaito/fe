/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useCallback, useContext, useMemo, useRef } from "react";
import { loadEntryPoint, useRelayEnvironment } from "react-relay/hooks";

import { recoverableViolation } from "@/faang/error";
import { useCometPrerenderer } from "@/faang/hooks";

import { ChannelGeminiContentContext } from "../context/channel-gemini-content-context";

export const useChannelGeminiEntryPoint = (
  channelEntryPoint,
  entryPointKey
) => {
  const entryPointsRef = useRef(null);

  const resetEntryPoints = useCallback(() => {
    entryPointsRef.current = null;
  }, []);

  const environment = useRelayEnvironment();
  const { preloadedEntryPoints, setPreloadedEntryPoint } = useContext(
    ChannelGeminiContentContext
  );

  const relayOptions = useMemo(() => {
    return {
      getEnvironment: function (a) {
        return environment;
      },
    };
  }, [environment]);

  const getPreloadedEntryPoint = useCallback(() => {
    // let entryPointInfo;
    // (!entryPointsRef.current ||
    //   !entryPointsRef.current[entryPointKey] ||
    //   entryPointsRef.current[entryPointKey].channelEntryPoint !==
    //     channelEntryPoint) &&
    //   (!entryPointsRef.current && (entryPointsRef.current = {}),
    //   (entryPointsRef.current[entryPointKey] = {
    //     channelEntryPoint: channelEntryPoint,
    //     preloadedEntryPoint: loadEntryPoint(
    //       relayOptions,
    //       channelEntryPoint,
    //       {}
    //     ),
    //   }));
    // // eslint-disable-next-line no-return-assign
    // return !(entryPointInfo = entryPointsRef.current[entryPointKey])
    //   ? undefined
    //   : entryPointInfo.preloadedEntryPoint;

    let entryPointInfo;
    if (
      !entryPointsRef.current ||
      !entryPointsRef.current[entryPointKey] ||
      entryPointsRef.current[entryPointKey].channelEntryPoint !==
        channelEntryPoint
    ) {
      !entryPointsRef.current && (entryPointsRef.current = {});
      entryPointsRef.current[entryPointKey] = {
        channelEntryPoint,
        preloadedEntryPoint: loadEntryPoint(
          relayOptions,
          channelEntryPoint,
          {}
        ),
      };
    }
    entryPointInfo = entryPointsRef.current[entryPointKey];
    return entryPointInfo ? entryPointInfo.preloadedEntryPoint : undefined;
  }, [entryPointKey, channelEntryPoint, relayOptions]);

  // [options, handleShow, handleHide, handleUpdate, handleFinish]
  // eslint-disable-next-line no-unused-vars
  const [_, handleShow, handleHide, handleUpdate] = useCometPrerenderer(
    "button",
    false,
    !channelEntryPoint ? undefined : channelEntryPoint.root,
    getPreloadedEntryPoint,
    resetEntryPoints
  );

  const handleEntryPointPresent = useCallback(() => {
    let preloadedEntryPoint = getPreloadedEntryPoint();
    if (!preloadedEntryPoint) {
      recoverableViolation(
        "Unable to present Galahad Channel EntryPoint",
        "work_comet_core"
      );
      return;
    }
    setPreloadedEntryPoint(entryPointKey, preloadedEntryPoint);
  }, [entryPointKey, getPreloadedEntryPoint, setPreloadedEntryPoint]);

  const isEntryPointPreloaded = Object.prototype.hasOwnProperty.call(
    preloadedEntryPoints,
    entryPointKey
  );

  return [
    handleEntryPointPresent,
    handleShow,
    handleHide,
    handleUpdate,
    isEntryPointPreloaded,
  ];
};
