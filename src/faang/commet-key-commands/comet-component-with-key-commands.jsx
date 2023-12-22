/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import stylex from "@stylexjs/stylex";

import { CometKeyCommandWrapper } from "./comet-key-command-wrapper";
import { useKeyCommands } from "./use-key-commands";

const styles = stylex.create({
  displayInherit: {
    display: "inherit",
  },
  inherit: {
    alignContent: "inherit",
    alignItems: "inherit",
    flexDirection: "inherit",
    flexGrow: "inherit",
    flexShrink: "inherit",
    height: "inherit",
    justifyContent: "inherit",
    maxHeight: "inherit",
    maxWidth: "inherit",
    minHeight: "inherit",
    minWidth: "inherit",
    position: "relative",
    width: "inherit",
  },
});

function UseKeyCommandHandler(props) {
  useKeyCommands.CometKeyCommandWidget(props.commandConfigs);
  return null;
}

export const CometComponentWithKeyCommands = (props) => {
  const { children, commandConfigs, elementType, xstyle, ...rest } = props;

  const className =
    elementType === "span"
      ? styles.inherit
      : [styles.inherit, styles.displayInherit];

  return (
    <CometKeyCommandWrapper
      elementType={elementType}
      xstyle={xstyle ?? className}
      {...rest}
    >
      <UseKeyCommandHandler commandConfigs={commandConfigs} />
      {children}
    </CometKeyCommandWrapper>
  );
};
