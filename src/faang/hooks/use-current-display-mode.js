import { useContext } from 'react';

import { BaseThemeDisplayModeContext } from '@/faang/context';

const defaultTheme = 'light';

export function useCurrentDisplayMode() {
  const mode = useContext(BaseThemeDisplayModeContext);

  return mode ?? defaultTheme;
}
