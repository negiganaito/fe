/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useState } from "react";
import stylex from "@stylexjs/stylex";

import { CometScrollableArea } from "@/faang/popover";

const styles = stylex.create({
  shadow: {
    backgroundColor: "var(--divider)",
    height: "1px",
    opacity: 0,
    transitionProperty: "opacity",
    transitionDuration: ".3s",
    marginLeft: "24px",
    marginRight: "16px",
  },
  shadowShown: {
    opacity: 1,
  },
});

export const GeminiLayoutResponsiveLHCScrollableAreaForLargeScreens = ({
  children,
  expanding,
  forceBrowserDefault,
  scrollRef,
  scrollTracePolicy,
  withTopShadow,
}) => {
  const [m, n] = useState(false);

  return (
    <>
      {withTopShadow && (
        <div className={stylex(styles.shadow, m && styles.shadowShown)} />
      )}
      <CometScrollableArea
        expanding={expanding}
        forceBrowserDefault={forceBrowserDefault}
        horizontal={false}
        onScroll={() => {
          withTopShadow === true && m === false && n(true);
        }}
        onScrollTop={() => {
          withTopShadow === true && m === true && n(false);
        }}
        ref={scrollRef}
        scrollTracePolicy={scrollTracePolicy}
      >
        {children}
      </CometScrollableArea>
    </>
  );
};

const GeminiLayoutResponsiveLHCScrollableAreaForSmallScreens = ({
  children,
  ...rest
}) => {
  return children;
};

export const GeminiLayoutNonResponsiveLHCScrollableArea = {
  GeminiLayoutResponsiveLHCScrollableAreaForLargeScreens,
  GeminiLayoutResponsiveLHCScrollableAreaForSmallScreens,
};
