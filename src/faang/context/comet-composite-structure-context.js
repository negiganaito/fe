/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { createContext } from 'react';

// type CometCompositeStructureContextProps = {
//   horizontal: boolean
//   vertical: boolean
//   role?: string
// }

export const CometCompositeStructureContext = createContext({
  horizontal: false,
  vertical: false,
});
