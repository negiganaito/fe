/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import stylex from '@stylexjs/stylex';
import React, { useLayoutEffect, useRef } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'

import { BaseContextualLayer } from '@/faang/base-contextual-layer';
import { CometPlaceholder } from '@/faang/comet-placeholder';
import { useFadeEffect, useTooltipDelayedContent } from '@/faang/hooks'
import { CometHeroInteractionContextPassthrough } from '@/faang/trace';

import { BaseTooltipContainer } from './base-tooltip-container';


const styles = stylex.create({
  contextualLayer: {
    pointerEvents: 'none',
  },
  loadingState: {
    display: 'flex',
    justifyContent: 'center',
  },
})

const dummyStyles = stylex.create({
  dummy1: {
    display: 'flex',
    justifyContent: 'center',
  },
})

// type BaseTooltipImplProps = {
//   contentKey?: string
//   contextRef?: any
//   id?: string
//   isVisible: boolean
//   loadingState?: any
//   position: 'above' | 'below' | 'start' | 'end'
//   align?: 'above' | 'middle' | 'start' | 'end'

//   tooltip?: any
//   className?: string
//   delayContentMs: number
//   headline?: any
//   tooltipTheme?: string
// }

function repositionContextualLayer({ contextualLayerRef }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    contextualLayerRef.current &&
      contextualLayerRef.current.reposition({
        autoflip: true,
      })
  }, [contextualLayerRef])
  return null
}

export function BaseTooltipImpl({
  contentKey,
  delayContentMs,
  headline,
  id,
  isVisible,
  loadingState,
  tooltip,
  tooltipTheme,
  xstyle,
  themeWrapper = React.Fragment,
  ...rest
}) {
  const ref = useRef(null)
  const [isTransitioning, shouldBeVisible, fadeRef] = useFadeEffect(isVisible)

  // var r = c('useCometDisplayTimingTrackerForInteraction')('ToolTip')

  const { isPending } = useTooltipDelayedContent({
    delayContentMs,
    isVisible,
  })


  return !tooltip || !isTransitioning ? null : jsx(CometHeroInteractionContextPassthrough, {
    children: jsx(BaseContextualLayer, Object.assign({}, {
      align: 'middle'
    }, rest, {
      children: jsx(themeWrapper, {
        children: jsx(BaseTooltipContainer, {
          children: isPending ? jsx('div', {
            children: loadingState,
            className: dummyStyles.dummy1,
          }) : jsxs(CometPlaceholder, {
            children: [jsx(repositionContextualLayer, {
              contextualLayerRef: ref
            }), tooltip],
            fallback: loadingState
          }),
          id,
          ref: fadeRef,
          shouldFadeIn: shouldBeVisible,
          xstyle
        })
      }),

      imperativeRef: ref,
      // ref: fadeRef,
      xstyle: styles.contextualLayer
    })),
    clear: true
  })

  // return !tooltip || !isTransitioning
  //   ? null
  //   : jsx(HeroInteractionContextPassthrough, {
  //     children: jsx(
  //       BaseContextualLayer,
  //       Object.assign(
  //         {
  //           align: 'middle',
  //         },
  //         rest,
  //         {
  //           children: jsx(themeWrapper, {
  //             children: isPending
  //               ? jsx('div', {
  //                 children: loadingState,
  //                 className: dummyStyles.dummy1,
  //               })
  //               : jsxs(
  //                 CometPlaceholder,
  //                 {
  //                   children: [
  //                     jsx(l, {
  //                       contextualLayerRef: ref,
  //                     }),
  //                     tooltip,
  //                   ],
  //                   fallback: loadingState,
  //                 },
  //                 contentKey,
  //               ),
  //             className: stylex(
  //               styles.container,
  //               className,
  //               shouldBeVisible && styles.containerVisible,
  //             ),
  //             'data-testid': undefined,
  //             id,
  //             ref: fadeRef,
  //             role: 'tooltip',
  //           }),


  //           imperativeRef: ref,


  //           // ref: r,
  //           xstyle: styles.contextualLayer,
  //         },
  //       ),
  //     ),
  //     clear: true,
  //   })
}
