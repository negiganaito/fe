/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
export function intersectionObserverEntryIsIntersecting(props) {
  return props.isIntersecting
    ? props.isIntersecting
    : props.intersectionRatio > 0 ||
        (props.intersectionRect &&
          (props.intersectionRect.height > 0 ||
            props.intersectionRect.width > 0));
}
