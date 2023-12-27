/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useContext, useEffect } from "react";

import { CometHeroInteractionContext } from "@/faang/trace/comet-hero-interaction-context";

export function useHeroBootloadedComponent(props) {
  const context = useContext(CometHeroInteractionContext.Context);

  useEffect(() => {
    context.consumeBootload(props.getModuleId());
  }, [context, props]);
}
