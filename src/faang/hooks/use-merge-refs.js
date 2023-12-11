import { useMemo } from 'react';
import { mergeRefs } from './merge-refs';

export function useMergeRefs(...refs) {
  return useMemo(() => {
    mergeRefs(...refs);
  }, [...refs]);
}
