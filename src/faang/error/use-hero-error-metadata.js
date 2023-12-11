import { useContext, useCallback } from 'react';
import { HeroTracingPlaceholder } from '@/faang/trace/hero-tracing-placeholder';
import { FbError } from './fb-error';
import { InteractionTracingMetrics } from '@/faang/trace/interaction-tracing-metrics';
import { QPLEvent } from '@/faang/trace/qpl-event';

/**
 * Custom React hook for obtaining hero error metadata.
 *
 * @returns {function} - A callback function to update error metadata.
 */
export function useHeroErrorMetadata() {
  const currentInteractionContext = useContext(
    HeroTracingPlaceholder.HeroCurrentInteractionForLoggingContext
  );
  const heroInteractionContext = useContext(
    HeroTracingPlaceholder.HeroInteractionContext.Context
  );
  const pageletStack = heroInteractionContext.pageletStack;

  return useCallback(
    (errorInfo) => {
      let errorMetadata = errorInfo.metadata || new FbError.ErrorMetadata();
      errorInfo.metadata = errorMetadata;

      const interactionUUID =
        currentInteractionContext.current?.interactionUUID;

      if (interactionUUID) {
        const interactionMetrics =
          InteractionTracingMetrics.get(interactionUUID);

        if (pageletStack) {
          errorMetadata.addEntry(
            'COMET_INFRA',
            'INTERACTION_PAGELET_STACK',
            pageletStack.join(',')
          );
        }

        if (interactionMetrics && !interactionMetrics.qplAction) {
          if (interactionMetrics.qplEvent) {
            errorMetadata.addEntry(
              'COMET_INFRA',
              'INTERACTION_QPL_EVENT',
              String(QPLEvent.getMarkerId(interactionMetrics.qplEvent))
            );
          }

          if (interactionMetrics.tracePolicy) {
            errorMetadata.addEntry(
              'COMET_INFRA',
              'INTERACTION_TRACE_POLICY',
              interactionMetrics.tracePolicy
            );
          }
        }
      }
    },
    [currentInteractionContext, pageletStack]
  );
}
