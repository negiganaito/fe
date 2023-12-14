/* eslint-disable no-unused-vars */

import React, { lazy, useCallback, useContext, useRef, useState } from 'react';

import { jsx, jsxs } from 'react/jsx-runtime';

import * as stylex from '@stylexjs/stylex';

import { cssUserAgentSupports } from '@/faang/utils';
import { CometTextTypography } from '@/faang/tetra-text';
import { CometTextContext } from '@/faang/context';
import { useMergeRefs } from '@/faang/hooks';

import {} from '@/faang/trace';

const CometToolTip = lazy(() => import('./MarkdownPreview.js'));

const e = {
  useTranslationKeyForTextParent: function () {},
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
    right: 0,
    overflowX: 'hidden',
    overflowY: 'hidden',
    position: 'absolute',
  },
});

const cometLineClamp = (props, externalRef) => {
  const {
    id,
    children,
    lines = 1,
    useAutomaticTextDirection = false,
    testid,
    className,
    truncationTooltip,
  } = props;

  const cometTextContextValue = useContext(CometTextContext);

  const [w, x] = useState(false);
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
            className: stylex(styles.supportLineHeight),
            style: calculateSize,
            children: '\u2026',
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
    x(
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
    },
    [truncationTooltip]
  );

  const ref = useMergeRefs(externalRef, y);

  const LineComp = jsx('span', {
    className: stylex(styles.root, lines === 1 && styles.oneLine, className),
    'data-testid': undefined,
    dir: useAutomaticTextDirection ? 'auto' : undefined,
    onMouseEnter: truncationTooltip ? onMouseEneterWithTooltip : undefined,
    id,
    style: internalStyle,
    ref,
    children: childrenClone,
  });
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

  return w
    ? jsx(CometPlaceholder, {
        fallback,
        children: jsx(CometTooltip, {
          tooltip: truncationTooltip,
          children: LineComp,
        }),
      })
    : LineComp;
};
