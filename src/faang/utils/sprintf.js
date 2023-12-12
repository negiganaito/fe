/**
 *
 * @param {string} formatString
 * @returns
 */
export function sprintf(formatString, ...args) {
  let currentIndex = 0;

  return formatString.replace(/%s/g, () => String(args[currentIndex++]));
}
