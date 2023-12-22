/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { CometKeyCommandWidget } from "./comet-key-command-widget";

export const CometKeyCommandWrapper = (props) => {
  const { children, ...rest } = props;

  return <CometKeyCommandWidget.Wrapper {...rest} children={children} />;
};
