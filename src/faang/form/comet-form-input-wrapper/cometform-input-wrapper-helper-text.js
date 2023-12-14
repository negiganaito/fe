import { jsx } from 'react/jsx-runtime';

export function CometFormInputWrapperHelperText(props) {
  const { validationState, value } = props;

  return jsx('TetraTextPairing', {
    level: 4,
    meta: value,
    metaColor: validationState === 'ERROR' ? 'negative' : 'secondary',
  });
}
