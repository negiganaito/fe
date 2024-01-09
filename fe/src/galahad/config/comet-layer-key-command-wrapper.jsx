/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import {
  CometLayerKeyCommandWidget,
  SetActiveLayerIfAttached,
} from "@/faang/commet-key-commands";

export const CometLayerKeyCommandWrapper = ({ children, debugName }) => {
  return (
    <CometLayerKeyCommandWidget.Wrapper debugName={debugName}>
      <SetActiveLayerIfAttached debugName={debugName} />
      {children}
    </CometLayerKeyCommandWidget.Wrapper>
  );
};
