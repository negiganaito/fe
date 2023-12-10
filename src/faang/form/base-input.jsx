import * as stylex from '@stylexjs/stylex';
import { useContext, useMemo, forwardRef } from 'react';

import Locale from 'fbjs/lib/Locale';
import { CometContainerPressableContext } from '@/faang/pressable/comet-container-pressable-context';

import { jsx } from 'react/jsx-runtime';
import { testID } from '@/faang/utils/test-id';

const styles = stylex.create({
  root: {
    WebkitTapHighlightColor: 'transparent',
    boxSizing: 'border-box',
    touchAction: 'manipulation',
    ':disabled': {
      cursor: 'not-allowed',
    },
  },
  zIndex: {
    zIndex: 1,
  },
});

const isRTL = Locale.isRTL();

export const BaseInput = forwardRef((props, ref) => {
  const {
    onChange,
    onClick,
    onValueChange,
    type = 'text',
    xstyle,
    testid,
    ...rest
  } = props;

  const compBaseOnType = useMemo(() => {
    switch (type) {
      case 'switch':
        return 'checkbox';
      default:
        return type;
    }
  }, [type]);

  const isCheckboxOrRadio =
    compBaseOnType === 'checkbox' || compBaseOnType === 'radio';
  const isTextarea = compBaseOnType === 'textarea';
  const cometContainerPressableContextValue = useContext(
    CometContainerPressableContext
  );

  const commonProps = Object.assign(
    {
      dir: isRTL ? 'rtl' : 'ltr',
    },
    { ...rest },
    testID(testid),
    {
      // WARN
      ...stylex.props(
        styles.root,
        xstyle,
        cometContainerPressableContextValue && styles.zIndex
      ),
    },
    {
      onChange: (event) => {
        if (!isCheckboxOrRadio) {
          if (onValueChange) {
            onValueChange(event.target.value, event);
          }
          if (onChange) {
            onChange(event);
          }
        }
      },
      onClick: (event) => {
        if (isCheckboxOrRadio && onValueChange) {
          onValueChange(event.target.checked, event);
        }
        if (onClick) {
          onClick(event);
        }
      },
    }
  );

  // NOTE Use React with JSX-html tag in the future
  return isTextarea
    ? jsx(
        'textarea',
        Object.assign(
          {
            suppressHydrationWarning: true,
          },
          commonProps,
          { ref }
        )
      )
    : jsx(
        'input',
        Object.assign(
          {
            suppressHydrationWarning: true,
          },
          commonProps,
          { ref, type: compBaseOnType }
        )
      );
});

BaseInput.displayName = 'BaseInput.react';
