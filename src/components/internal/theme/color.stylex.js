import * as stylex from '@stylexjs/stylex';

const [DARK] = '@media (prefers-color-scheme: dark)';

export const color = stylex.defineVars({
  accent: {
    default: '#1763CF',
    [DARK]: '#1763CF',
  },
  'secondary-icon': { default: '#65676B', [DARK]: '#65676B' },
  'disabled-icon': { default: '#BCC0C4', [DARK]: '#BCC0C4' },
  positive: { default: '#31A24C', [DARK]: '#31A24C' },
  'highlight-bg': { default: '#E7F3FF', [DARK]: '#E7F3FF' },
  'notification-badge': { default: '#e41e3f', [DARK]: '#e41e3f' },
  'base-lemon': { default: '#F7B928', [DARK]: '#F7B928' },
  'placeholder-text': { default: '#65676B', [DARK]: '#65676B' },
});
