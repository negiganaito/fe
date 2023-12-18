/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import executionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import { forwardRef, useEffect, useMemo, useRef } from 'react';
import { CometSSRPreloadImageCollection } from '@/faang/base-image/comet-ssr-preload-image-collection';
import { RecoverableViolationWithComponentStack } from '@/faang/error/recoverable-violation-with-component-stack';

// @ts-ignore
import { jsx } from 'react/jsx-runtime';

import stylex from '@stylexjs/stylex';

import { mergeRefs } from '@/faang/hooks';

const styles = stylex({
  contain: {
    objectFit: 'contain',
  },
  cover: {
    objectFit: 'cover',
  },
  fill: {
    objectFit: 'fill',
  },
});

export const BaseImage = forwardRef(
  (
    {
      alt = '',
      'aria-labelledby': al,
      elementtiming,
      objectFit = 'none',
      onLoad,
      referrerPolicy = 'origin-when-cross-origin',
      sizes,
      src,
      srcSet,
      // eslint-disable-next-line no-unused-vars
      testid,
      xstyle,
      ...rest
    },
    ref
  ) => {
    const u = useRef(null);
    const _ref = useMemo(() => {
      return mergeRefs(u, ref);
    }, [u, ref]);

    !executionEnvironment.canUseDOM &&
      src &&
      CometSSRPreloadImageCollection.addImage(src);

    useEffect(() => {
      onLoad && u.current && u.current.complete && onLoad();
    }, [onLoad]);

    return src === ''
      ? jsx(RecoverableViolationWithComponentStack, {
        errorMessage: 'Invalid src provided to image',
        projectName: 'comet_ui',
      })
      : jsx(
        'img',
        Object.assign({}, rest, {
          alt,
          'aria-labelledby': al,
          // className:
          //   objectFit === 'none' && className == null
          //     ? void 0
          //     : mergeClasses(
          //         objectFit !== 'none' && classes[objectFit],
          //         className
          //       ),

          className: stylex(styles[objectFit], xstyle),
          elementtiming,
          onLoad,
          ref: _ref,
          referrerPolicy,
          sizes,
          src,
          srcSet,
        })
      );
  }
);

BaseImage.displayName = 'BaseImage.react';
