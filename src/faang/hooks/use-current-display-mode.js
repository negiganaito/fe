/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useContext } from 'react';

import { BaseThemeDisplayModeContext } from '@/faang/context';

const defaultTheme = 'light';

export function useCurrentDisplayMode() {
  const mode = useContext(BaseThemeDisplayModeContext);

  return mode ?? defaultTheme;
}
