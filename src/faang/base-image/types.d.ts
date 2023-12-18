/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */


/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

export type SpritedImage = {
  h?: number;
  loggingID?: string;
  p?: string;
  spi?: string;
  sprited?: number;
  sz?: string;
  w?: number;
  _spi?: string;
};

export type BaseImage_DEPRECATEDProps = {
  alt: string;
  testid?: string;
  onLoad?: () => any;
  src?: SpritedImage;
  className?: string;
  draggable?: boolean;
  height?: string;
  width?: string;
  style?: CSSProperties;
};

export type BaseImageProps = React.JSX.IntrinsicElements['img'] & {
  alt?: boolean;
  elementtiming?: any;
  objectFit?: 'none' | 'contain' | 'cover' | 'fill';
  onLoad?: any;
  referrerPolicy?: any;
  sizes?: any;
  testid?: string;
  xstyle?: any;
};




export type CometImageProps = React.JSX.IntrinsicElements['img'] & {
  alt?: string
  objectFit?: 'none' | 'contain' | 'cover' | 'fill'
  onError?: any
  onLoad?: any
  sizes?: any
  src?: any
  srcSet?: any
  testid?: string
  xstyle?: any
}
