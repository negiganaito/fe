import { useState, useEffect } from 'react';

import { jsx } from 'react/jsx-runtime';

export function BaseNestedPressableHack_DO_NOT_USE(props) {
  const { children } = props;

  const [isMounted, setIsMounted] = useState();

  useEffect(function () {
    return setIsMounted(true);
  }, []);

  const placeholderStyle = isMounted
    ? null
    : {
        height: 0,
        width: 0,
      };

  return jsx(
    'object',
    Object.assign({}, placeholderStyle, {
      type: 'nested/pressable',
      children,
    })
  );
}
