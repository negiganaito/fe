/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import joinClasses from 'fbjs/lib/joinClasses';
import { forwardRef, useEffect, useMemo, useRef } from 'react';
import { jsx } from 'react/jsx-runtime';

import { CometVisualCompletionAttributes } from '@/faang/common/comet-visual-completion-attributes';
import { RecoverableViolationWithComponentStack } from '@/faang/error/ecoverable-violation-with-component-stack';
import { mergeRefs } from '@/faang/hooks/merge-refs';

import { coerceImageishSprited } from './coerce-imageish-sprited';
import { coerceImageishURL } from './coerce-imageish-URL';
import { CometSSRBackgroundImageUtils } from './comet-ssr-background-image-utils';

/**
 * Checks if the provided value is a non-empty string and not equal to '[object Object]'.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - True if the value is a valid string, false otherwise.
 */
function isValidStringValue(value) {
  return (
    value &&
    typeof value === 'string' &&
    value !== '' &&
    value !== '[object Object]'
  );
}

// function m(uri) {
//   return (
//     uri && typeof uri === 'string' && uri !== '' && uri !== '[object Object]'
//   );
// }

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").BaseImage_DEPRECATEDProps>
 */
export const BaseImage_DEPRECATED = forwardRef((props, ref) => {
  // eslint-disable-next-line no-unused-vars
  const { alt, testid, ...rest } = props;

  const onLoad = rest.onLoad;

  const src = rest.src;

  const imageRef = useRef(null);

  const internalRef = useMemo(() => {
    return mergeRefs(imageRef, ref);
  }, [imageRef, ref]);

  CometSSRBackgroundImageUtils.processSpritedImagesForSSRPreload(src);

  const imageType = coerceImageishSprited(src);

  const imageOption = coerceImageishURL(src);

  useEffect(() => {
    if (
      onLoad &&
      imageRef.current instanceof HTMLImageElement &&
      (!imageRef.current ? undefined : imageRef.current.complete)
    ) {
      onLoad();
    }

    //   var a;
    // onLoad &&
    //   p.current instanceof HTMLImageElement &&
    //   ((a = p.current) == null ? undefined : a.complete) &&
    //   onLoad();
  }, [onLoad, src]);

  if (imageOption && imageOption.uri) {
    return !isValidStringValue(imageOption.uri)
      ? jsx(RecoverableViolationWithComponentStack, {
        errorMessage: 'Invalid src provided as imageish uri',
        projectName: 'comet_ui',
      })
      : jsx(
        'img',
        Object.assign({}, rest, {
          alt: alt ? src : '',
          'data-testid': undefined,
          height: rest.height ?? imageOption.height,
          ref: internalRef,
          src: imageOption.uri,
          width: rest.width ?? imageOption.width,
        })
      );
  } else if (imageType) {
    // eslint-disable-next-line no-unused-vars
    const { height, src, style, width, ...restt } = rest;

    return jsx(
      'i',
      Object.assign({}, CometVisualCompletionAttributes.CSS_IMG, restt, {
        'aria-label': alt === '' ? null : alt,
        className: joinClasses(
          rest.className,
          imageType.type === 'css' ? imageType.className : undefined
        ),
        'data-testid': undefined,
        ref: internalRef,
        role: alt === '' ? null : 'img',
        style:
          imageType.type === 'cssless'
            ? Object.assign({}, style, imageType.style)
            : style,
      })
    );
  }

  if (!isValidStringValue(src)) {
    return jsx(RecoverableViolationWithComponentStack, {
      errorMessage: 'Invalid src provided to image',
      projectName: 'comet_ui',
    });
  }

  return jsx(
    'img',
    Object.assign({}, rest, {
      alt: alt ? imageType : '',
      'data-testid': undefined,
      // TODO base on this r = c("gkx")("1690028") ? m : void 0;
      elementtiming: undefined,
      onLoad,
      ref: internalRef,
      src,
    })
  );
});

BaseImage_DEPRECATED.displayName = 'BaseImage_DEPRECATED';
