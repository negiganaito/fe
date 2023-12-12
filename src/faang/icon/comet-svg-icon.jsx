import * as stylex from '@stylexjs/stylex';
import { useId } from 'react';

const styles = stylex.create({
  color: (color) => {
    return [
      {
        color: 'x19dipnz',
      },
    ];
  },

  icon: {
    display: 'x1lliihq',
    transitionDuration: 'x1k90msu',
    transitionProperty: 'x2h7rmj',
    transitionTimingFunction: 'x1qfuztq',
  },
  inline: {
    display: 'x1rg5ohu',
  },
  shadow: {
    filter: 'x1ssd25i',
  },
});

const l = {
  color: (a) => {
    return [
      styles.color,
      {
        '--color': a ?? 'initial',
      },
    ];
  },
};
