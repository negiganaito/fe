import { recoverableViolation } from '@/faang/error/recoverable-violation';

/**
 * Merges multiple refs into a single callback ref.
 *
 * @param {...(React.RefCallback | React.MutableRefObject)} refs - Refs to be merged.
 * @returns {React.RefCallback} - Callback ref to be used in a React component.
 */
export function mergeRefs(...refs) {
  return function (node) {
    refs.forEach((ref) => {
      if (!ref) {
        return;
      }

      if (typeof ref === 'function') {
        ref(node);
      } else if (typeof ref === 'object') {
        ref.current = node;
      }

      recoverableViolation(
        'mergeRefs cannot handle Refs of type boolean, number or string, received ref ' +
          String(ref),
        'comet_ui'
      );
    });
  };
}
