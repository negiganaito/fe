import stylex from '@stylexjs/stylex';
import { jsx } from 'react/jsx-runtime';

const styles = stylex.create({
  color: (color) => ({
    color: color ?? 'initial',
  }),
});

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
        ...stylex.props([color != null && styles.color(color), xstyle]),
      }
    )
  );
}
