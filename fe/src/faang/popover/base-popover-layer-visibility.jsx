/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useContext, useEffect, useRef } from "react";
import emptyFunction from "fbjs/lib/emptyFunction";

import { HiddenSubtreePassiveContext } from "../context";

// type BasePopoverLayerVisibilityProps = {
//   children?: ReactNode
//   onLayerDetached?: any
// }

export function BasePopoverLayerVisibility({
  children,
  onLayerDetached = emptyFunction,
}) {
  const { getCurrentState, subscribeToChanges } = useContext(
    HiddenSubtreePassiveContext
  );

  const g = useRef(!getCurrentState().hiddenOrBackgrounded);

  useEffect(() => {
    const cb = subscribeToChanges(({ hiddenOrBackgrounded }) => {
      const _hiddenOrBackgrounded = !hiddenOrBackgrounded;

      g.current !== _hiddenOrBackgrounded &&
        !_hiddenOrBackgrounded &&
        onLayerDetached();
      g.current = _hiddenOrBackgrounded;
    });
    return function () {
      cb.remove();
    };
  }, [onLayerDetached, subscribeToChanges]);

  const onLayerDetachedRef = useRef(onLayerDetached);

  useEffect(() => {
    onLayerDetachedRef.current = onLayerDetached;
  }, [onLayerDetached]);

  const l = useRef(null);

  useEffect(() => {
    if (l.current) {
      window.clearTimeout(l.current);
      l.current = null;
    }

    return () => {
      l.current = window.setTimeout(onLayerDetachedRef.current, 1);
    };
  }, []);

  return children;
}
