import { jsx } from 'react/jsx-runtime';
import { CometIcon, fbicon } from '@/faang/icon';
import { ICONS } from '@/faang/_/icon';
import { CometProgressRingIndeterminate } from '@/faang/progress-ring';

export const CometFormInputValidationStateIcon = {
  CORRECT: jsx(CometIcon, {
    color: 'positive',
    icon: fbicon._(ICONS[498146], 20),
    testid: undefined,
  }),
  ERROR: jsx(CometIcon, {
    color: 'negative',
    icon: fbicon._(ICONS[502062], 20),
    testid: undefined,
  }),
  LOADING: jsx(CometProgressRingIndeterminate, {
    color: 'disabled',
    size: 20,
  }),
  WARN: jsx(CometIcon, {
    color: 'warning',
    icon: fbicon._(ICONS[502062], 20),
    testid: undefined,
  }),
};
