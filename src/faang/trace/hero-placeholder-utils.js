// import { PromiseAnnotate } from '@/faang/utils/promise-annotate';

// var h = 0;

// export const getSimpleUUID = () => {
//   return String(h++);
// };

// export const createThenableDescription = (a) => {
//   if (a != null && a.size > 0)
//     return Array.from(a)
//       .map(function (a) {
//         a = PromiseAnnotate.getDisplayName(a);
//         if (a != null) return a;
//         else return 'Promise';
//       })
//       .join(',');
//   else return null;
// };

import { PromiseAnnotate } from '@/faang/utils/promise-annotate';

let simpleUUIDCounter = 0;

/**
 * Generates a simple UUID.
 *
 * @returns {string} - The generated simple UUID.
 */
const getSimpleUUID = () => {
  return String(simpleUUIDCounter++);
};

/**
 * Creates a thenable description based on a set of promises.
 *
 * @param {Set<Promise>} promises - The set of promises.
 * @returns {string | null} - The thenable description or null if the set is empty.
 */
const createThenableDescription = (promises) => {
  if (promises != null && promises.size > 0) {
    return Array.from(promises)
      .map((promise) => {
        const displayName = PromiseAnnotate.getDisplayName(promise);
        return displayName != null ? displayName : 'Promise';
      })
      .join(',');
  } else {
    return null;
  }
};

export const HeroPlaceholderUtils = {
  getSimpleUUID,
  createThenableDescription,
};
