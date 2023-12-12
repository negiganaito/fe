import * as stylex from '@stylexjs/stylex';
import { jsx } from 'react/jsx-runtime';

const styles = stylex.create({
  root: {
    color: 'var(--color,revert)',
  },
});

const colorStyles = {
  /**
   *
   * @param {string?} color
   */
  color: (color) => {
    return [
      styles.root,
      {
        '--color': color ?? 'initial',
      },
    ];
  },
};

/**
 *
 * @param {import("./types").BaseSVGIconProps} param0
 * @returns
 */
export function BaseSVGIcon({ alt, xstyle, color, icon, size = 8 }) {
  return jsx(
    icon,
    Object.assign(
      {
        height: size,
        title: !alt || alt === '' ? undefined : alt,
        width: size,
      },
      {
        ...stylex.props([color != null && colorStyles.color(color), xstyle]),
      }
    )
  );
}
