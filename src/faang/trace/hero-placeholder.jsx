import {
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  Suspense,
  Fragment,
} from 'react';

import { jsxs, jsx } from 'react/jsx-runtime';

import { HeroInteractionContext } from './hero-interaction-context';
import { HeroInteractionIDContext } from './hero-interaction-id-context';
import { useStable } from '@/faang/hooks/use-stable';
import { HeroPlaceholderUtils } from './hero-placeholder-utils';
import { HeroFallbackTracker } from './hero-fallback-tracker';

// function n(a) {
//   var b = a.cb,
//     c = useRef(!1);
//   useLayoutEffect(function () {
//     c.current || (b(), (c.current = !0));
//   });
//   return null;
// }

/**
 * Component lifecycle callback for performing an action once during layout effect.
 *
 * @param {object} props - The component props.
 * @param {Function} props.cb - The callback function to be executed once.
 * @returns {null} - Returns null.
 */
function performLayoutEffectOnce({ cb }) {
  const hasBeenCalled = useRef(false);

  useLayoutEffect(() => {
    if (!hasBeenCalled.current) {
      cb();
      hasBeenCalled.current = true;
    }
  });

  return null;
}

/**
 *
 * @param {import("./types").HeroPlaceholderProps} props
 */
export const HeroPlaceholder = (props) => {
  const {
    children,
    fallback,
    name,
    unstable_avoidThisFallback,
    unstable_onSuspense,
  } = props;

  const heroInteractionContextValue = useContext(HeroInteractionContext);
  const heroInteractionIDContextValue = useContext(HeroInteractionIDContext);

  const simpleUUID1 = useStable(HeroPlaceholderUtils.getSimpleUUID);
  const simpleUUID2 = useStable(HeroPlaceholderUtils.getSimpleUUID);

  const ref = useRef(false);

  const childrenClone = children;

  const suspenseCallback = useCallback(
    (cbProps) => {
      if (heroInteractionIDContextValue != null) {
        heroInteractionContextValue.suspenseCallback(
          heroInteractionIDContextValue,
          simpleUUID1,
          heroInteractionContextValue.pageletStack,
          cbProps,
          name != null ? name : 'Unnamed Suspense'
        );
      }

      if (unstable_onSuspense) {
        const thenableDescription =
          HeroPlaceholderUtils.createThenableDescription(cbProps);

        unstable_onSuspense(
          thenableDescription != null ? thenableDescription : ''
        );
      }
    },
    [
      heroInteractionContextValue,
      heroInteractionIDContextValue,
      name,
      simpleUUID1,
      unstable_onSuspense,
    ]
  );

  useLayoutEffect(() => {
    if (
      ref.current === false &&
      heroInteractionIDContextValue != null &&
      heroInteractionIDContextValue != null
    ) {
      heroInteractionContextValue.hold(
        heroInteractionIDContextValue,
        heroInteractionContextValue.pageletStack,
        'Hydration',
        simpleUUID2,
        name
      );

      return () => {
        return heroInteractionContextValue.unhold(
          heroInteractionIDContextValue,
          simpleUUID2
        );
      };
    }
  }, [
    heroInteractionContextValue,
    heroInteractionIDContextValue,
    name,
    simpleUUID2,
  ]);

  const t = function () {
    ref.current = true;

    if (heroInteractionIDContextValue != null) {
      heroInteractionContextValue.unhold(
        heroInteractionIDContextValue,
        simpleUUID2
      );
    }
  };

  return jsxs(Suspense, {
    fallback: jsxs(Fragment, {
      children: [
        fallback,
        jsx(performLayoutEffectOnce, {
          cb: t,
        }),
        jsx(HeroFallbackTracker, {
          uuid: simpleUUID1,
        }),
      ],
    }),
    suspenseCallback,
    unstable_avoidThisFallback,
    children: [
      jsx(performLayoutEffectOnce, {
        cb: t,
      }),
      childrenClone,
    ],
  });
};

HeroPlaceholder.displayName = 'HeroPlaceholder';
