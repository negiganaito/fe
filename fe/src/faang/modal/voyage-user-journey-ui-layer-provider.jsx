/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useLayoutEffect, useMemo, useRef } from "react";

import { VoyageUserJourneyUILayerContext } from "@/faang/context";

// type VoyageUserJourneyUILayerProviderProps = {
//   children?: any
//   metadata?: any
//   name?: string
// }

export function VoyageUserJourneyUILayerProvider({ children, metadata, name }) {
  const metadataRef = useRef(metadata);
  const nameRef = useRef(name);

  useLayoutEffect(() => {
    metadataRef.current = metadata;
    nameRef.current = name;
  }, [metadata, name]);

  const voyageUILayerContextValue =
    VoyageUserJourneyUILayerContext.useVoyageUILayerContext();

  const voyageUILayerValue = useMemo(() => {
    return {
      get: () => {
        return [].concat(voyageUILayerContextValue.get(), [
          {
            name: nameRef.current,
            metadata: metadataRef.current,
          },
        ]);
      },
    };
  }, [voyageUILayerContextValue]);

  return (
    <VoyageUserJourneyUILayerContext.VoyageUILayerContext.Provider
      value={voyageUILayerValue}
    >
      {children}
    </VoyageUserJourneyUILayerContext.VoyageUILayerContext.Provider>
  );
}
