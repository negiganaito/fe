import { forwardRef } from 'react';

// @ts-ignore
import { jsx } from 'react/jsx-runtime';

import {
  BaseImage,
  coerceImageishURL,
  coerceImageishSprited,
  CometSSRBackgroundImageUtils,
} from '@/faang/base-image';
import { xplatToDOMRef } from '@/faang/utils/xplat-to-dom-ref';
import { RecoverableViolationWithComponentStack } from '@negiganaito/error';
import { stylex } from '@stylexjs/stylex';

// type CometImageFromIXValueProps = {
//   alt?: string
//   objectFit?: string
//   source?: any
//   xstyle?: string
//   testid?: string
// }

export const CometImageFromIXValue = forwardRef((props, ref) => {
  // eslint-disable-next-line no-unused-vars
  const { alt = '', objectFit, source, testid, xstyle } = props;

  CometSSRBackgroundImageUtils.processSpritedImagesForSSRPreload(source);

  const spriteImageish = coerceImageishSprited(source);

  if (spriteImageish) {
    const classes = stylex(xstyle);

    return jsx(
      'i',
      Object.assign(
        {},
        // c('CometVisualCompletionAttributes').CSS_IMG,
        // c('testID')(i),
        {
          'aria-label': alt === '' ? null : alt,
          className:
            spriteImageish.type === 'css'
              ? classes !== ''
                ? spriteImageish.className + '' + classes
                : spriteImageish.className
              : classes,
          ref,
          role: alt === '' ? null : 'img',
          style:
            spriteImageish.type === 'cssless'
              ? spriteImageish.style
              : undefined,
        }
      )
    );
  }

  const imageOption = coerceImageishURL(source);

  if (imageOption) {
    const { height, width, uri } = imageOption;

    return jsx(BaseImage, {
      alt,
      draggable: false,
      height: objectFit === 'cover' ? '100%' : height,
      objectFit,
      ref: xplatToDOMRef(ref),
      src: uri,
      testid: undefined,
      width: objectFit === 'cover' ? '100%' : width,
      xstyle,
    });
  }

  return jsx(RecoverableViolationWithComponentStack, {
    errorMessage:
      'asset provided to CometImageFromIXValue cannot be transformed by Haste',
    projectName: 'comet_ui',
  });
});

CometImageFromIXValue.displayName = 'CometImageFromIXValue.react';
