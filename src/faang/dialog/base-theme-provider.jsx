/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useContext, useMemo } from 'react'
// @ts-ignore
import { jsx } from 'react/jsx-runtime'

import {
  BaseThemeConfigContext,
  BaseThemeDisplayModeContext,
} from '@/faang/context'
import { useCurrentDisplayMode } from '@/faang/hooks'

// type BaseThemeProviderProps = {
//   children?: any
//   config: any
//   displayMode?: 'dark' | 'light'
// }

export function BaseThemeProvider({
  children,
  config,
  displayMode,
}) {
  const baseThemeConfigValue = useContext(BaseThemeConfigContext)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const currentDisplayMode = displayMode ?? useCurrentDisplayMode()

  const themeClass = useMemo(() => {
    let temp
    config != null && config.type === 'CLASSNAMES'
      ? (temp = currentDisplayMode === 'dark' ? config.dark : config.light)
      : (temp =
        currentDisplayMode === 'dark'
          ? baseThemeConfigValue.darkClassName
          : baseThemeConfigValue.lightClassName)
    return temp != null
      ? {
        $$css: true,
        theme: temp,
      }
      : null
  }, [
    config,
    baseThemeConfigValue.darkClassName,
    baseThemeConfigValue.lightClassName,
    currentDisplayMode,
  ])

  const baseThemeConfigContextValue = useMemo(
    () => {
      if (config != null)
        if (config.type === 'VARIABLES')
          return Object.assign({}, baseThemeConfigValue, {
            darkVariables: Object.assign(
              {},
              baseThemeConfigValue.darkVariables,
              config.dark,
            ),
            lightVariables: Object.assign(
              {},
              baseThemeConfigValue.lightVariables,
              config.light,
            ),
          })
        else if (config.type === 'CLASSNAMES')
          return Object.assign({}, baseThemeConfigValue, {
            darkClassName: config.dark,
            lightClassName: config.light,
          })
      return baseThemeConfigValue
    },
    [config, baseThemeConfigValue],
  )

  const themeVariable = convert2CssVariable(
    currentDisplayMode === 'dark'
      ? baseThemeConfigContextValue.darkVariables
      : baseThemeConfigContextValue.lightVariables,
  )

  return jsx(BaseThemeConfigContext.Provider, {
    children: jsx(BaseThemeDisplayModeContext.Provider, {
      children: children(themeClass, themeVariable),
      value: currentDisplayMode,
    }),
    value: baseThemeConfigContextValue,
  })
}

function convert2CssVariable(a) {
  let b = {}
  Object.keys(a).forEach(function (c) {
    // @ts-ignore
    b['--' + c] = a[c]
  })
  return b
}
