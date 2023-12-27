/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { forwardRef, useMemo, useRef } from "react";

import { mergeRefs } from "@/faang/hooks";
import { xplatToDOMRef } from "@/faang/utils";

import { BaseImage } from "./base-image";
import { CometImageFromIXValue } from "./comet-image-from-ix-value";

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").CometImageProps>
 */
export const CometImage = forwardRef((props, ref) => {
  const {
    alt,
    objectFit,
    onError,
    onLoad,
    sizes,
    src,
    srcSet,
    // eslint-disable-next-line no-unused-vars
    testid,
    xstyle,
    ...rest
  } = props;

  const f = useRef(null);
  const g = useMemo(() => {
    return mergeRefs(f, ref);
  }, [f, ref]);

  // n = c('useFeedImageErrorEventLoggerCbs')({
  //   onError: n,
  //   onLoad: o,
  //   src: q,
  // })

  const t = undefined;

  // function u(a, c, d, e, g, h) {
  //   b('cr:2010754') &&
  //     c === 'mount' &&
  //     f.current != null &&
  //     typeof q === 'string' &&
  //     b('cr:2010754').trackImagePerf(f.current, h, q, {
  //       mutationType: 'reactCommit',
  //     })
  // }

  if (typeof src === "string") {
    return (
      <BaseImage
        {...rest}
        alt={alt}
        elementtiming={t}
        objectFit={objectFit}
        onError={onError}
        onLoad={onLoad}
        ref={xplatToDOMRef.xplatToDOMRef(g)}
        sizes={sizes}
        src={src}
        srcSet={srcSet}
        testid={undefined}
        xstyle={xstyle}
      />
    );

    // return jsx(BaseImage, {
    //   ...rest,
    //   alt,
    //   elementtiming: t,
    //   objectFit,
    //   onError,
    //   onLoad,
    //   ref: xplatToDOMRef.xplatToDOMRef(g),
    //   sizes,
    //   src,
    //   srcSet,
    //   testid: void 0,
    //   xstyle,
    // });
  }

  return (
    <CometImageFromIXValue
      alt={alt}
      objectFit={objectFit}
      ref={g}
      source={src}
      testid={undefined}
      xstyle={xstyle}
    />
  );

  // return jsx(CometImageFromIXValue, {
  //   alt,
  //   objectFit,
  //   ref: g,
  //   source: src,
  //   testid: void 0,
  //   xstyle,
  // });
});
