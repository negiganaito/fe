import * as stylex from '@stylexjs/stylex';
import { memo, forwardRef } from 'react';

import { jsx } from 'react/jsx-runtime';
import { BaseFocusRing } from '@/faang/focus/base-focus-ring';
import { BaseInput } from './base-input';

const styles = stylex.create({
  root: {
    ':disabled': {
      color: 'var(--disabled-text)',
    },
  },
});

export const BaseTextInput = memo(
  forwardRef((props, ref) => {
    const { suppressFocusRing, xstyle, ...rest } = props;

    return jsx(BaseFocusRing, {
      suppressFocusRing,

      /**
       *
       * @param {string} _className
       */
      children: (_className) => {
        return jsx(BaseInput, {
          ...rest,
          ref,
          xstyle: [styles.root, _className, xstyle],
        });
      },
    });
  })
);
