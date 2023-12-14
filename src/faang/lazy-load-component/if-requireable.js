import { ifRequired } from './if-required';

export function ifRequireable(a, b, d) {
  return ifRequired.call(null, a, b, d);
}
