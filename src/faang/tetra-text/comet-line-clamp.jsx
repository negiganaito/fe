/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import * as stylex from '@stylexjs/stylex';
import React, { forwardRef, useCallback, useContext, useRef, useState } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import Loadable from 'react-loadable';

import { CometPlaceholder } from '@/faang/comet-placeholder/comet-placeholder';
import { CometTextContext } from '@/faang/context';
import { useMergeRefs } from '@/faang/hooks';
import { CometTextTypography } from '@/faang/tetra-text';
import { cssUserAgentSupports } from '@/faang/utils';


// const CometToolTip = lazy(() => import('@/faang/base-tooltip').then(r => r.CometTooltip));

const CometToolTip = Loadable({
  loader: () => import('@/faang/base-tooltip').then(r => r.CometTooltip),
  loading: () => null
})


const e = {
  useTranslationKeyForTextParent: function () { },
};

const { useTranslationKeyForTextParent } = e;

const notSupportWebkitLineClamp = cssUserAgentSupports.webkitLineClamp();

function calculateLineHeight(type) {
  return type != null && type in CometTextTypography
    ? CometTextTypography[type].lineHeight
    : 16;
}

const styles = stylex.create({
  ellisis: {
    overflowX: 'hidden',
    overflowY: 'hidden',
    position: 'absolute',
  },

  oneLine: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  root: {
    display: 'block',
    overflowX: 'hidden',
    overflowY: 'hidden',
    position: 'relative',
  },

  supportLineHeight: {
    overflowX: 'hidden',
    overflowY: 'hidden',
    position: 'absolute',
    right: 0,
  },
});

const _CometLineClamp = (props, externalRef) => {
  const {
    id,
    children,
    lines = 1,
    useAutomaticTextDirection = false,
    // eslint-disable-next-line no-unused-vars
    testid,
    className,
    truncationTooltip,
  } = props;

  const cometTextContextValue = useContext(CometTextContext);

  const [isOverflowing, setOverflowing] = useState(false);

  const translationKeyComp = useTranslationKeyForTextParent()

  const y = useRef(null);

  let internalStyle;
  let childrenClone = children;

  if (lines > 1) {
    if (notSupportWebkitLineClamp) {
      internalStyle = {
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: lines,
        display: '-webkit-box',
      };
    } else {
      const lineHeight = calculateLineHeight(
        cometTextContextValue == null ? undefined : cometTextContextValue.type
      );
      internalStyle = { maxHeight: lineHeight * lines + 0.1 };

      const calculateSize = {
        maxHeight: 'calc((100% - ' + lineHeight * lines + 'px) * 999)',
        top: lineHeight * (lines - 1),
      };

      childrenClone = jsxs(React.Fragment, {
        children: [
          childrenClone,
          jsx('span', {
            'aria-hidden': true,
            children: '\u2026',
            className: stylex(styles.supportLineHeight),
            style: calculateSize,
          }),
        ],
      });

      // (
      //   <React.Fragment>
      //     {childrenClone}
      //     <span
      //       aria-hidden={true}
      //       className={classes.supportLineHeight}
      //       style={calculateSize}
      //     >
      //       &#8230;
      //     </span>
      //   </React.Fragment>,
      // )
    }
  }

  const onMouseEneterWithTooltip = () => {
    const curr = y.current;
    if (curr == null || lines < 1) {
      return;
    }
    setOverflowing(
      curr.offsetWidth < curr.scrollWidth ||
      curr.offsetHeight < curr.scrollHeight
    );
  };

  const fallback = useCallback(
    (a) => {
      if (!a || !truncationTooltip) {
        return;
      }
      // n.preload()
      CometToolTip.preload()
    },
    [truncationTooltip]
  );

  const ref = useMergeRefs(externalRef, y);

  const LineComp = jsx('span', {
    children: childrenClone,
    className: stylex(styles.root, lines === 1 && styles.oneLine, className),
    'data-testid': undefined,
    dir: useAutomaticTextDirection ? 'auto' : undefined,
    id,
    onMouseEnter: truncationTooltip ? onMouseEneterWithTooltip : undefined,
    ref,
    style: internalStyle,
  }, translationKeyComp);
  // (
  //   <span
  //     className={mergeClasses(
  //       classes.root,
  //       lines === 1 && classes.oneLine,
  //       className,
  //     )}
  //     data-testid={undefined}
  //     dir={useAutomaticTextDirection ? 'auto' : undefined}
  //     onMouseEnter={truncationTooltip ? onMouseEneterWithTooltip : undefined}
  //     id={id}
  //     style={internalStyle}
  //     ref={externalRef}
  //   >
  //     {childrenClone}
  //   </span>,
  // )

  return isOverflowing
    ? jsx(CometPlaceholder, {
      children: jsx(CometToolTip, {
        children: LineComp,
        tooltip: truncationTooltip,
      }),
      fallback,
    })
    : LineComp;
};


export const CometLineClamp = forwardRef(_CometLineClamp)
