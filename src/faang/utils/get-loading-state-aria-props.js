import { fbt } from 'fbt';

/**
 * Generates ARIA properties for a loading state or progress bar.
 * @param {number} currentValue - The current value of the progress bar.
 * @param {object} additionalProps - An optional object containing additional properties (e.g., min, max).
 * @returns {object} - An object containing ARIA properties.
 */
export function getLoadingStateAriaProps(currentValue, additionalProps) {
  let defaultValue;

  additionalProps =
    currentValue == null
      ? {
          'aria-label': fbt.c('Loading...'),
        }
      : {
          'aria-valuemax':
            (defaultValue =
              additionalProps == null ? undefined : additionalProps.max) != null
              ? defaultValue
              : 100,
          'aria-valuemin':
            (defaultValue =
              additionalProps == null ? undefined : additionalProps.min) != null
              ? defaultValue
              : 0,
          'aria-valuenow': currentValue,
        };
  return Object.assign(
    {
      role: 'progressbar',
    },
    additionalProps
  );
}
