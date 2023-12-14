import { CometSSRClientRender } from './comet-ssr-client-render';
import executionEnvironment from 'fbjs/lib/ExecutionEnvironment';

export function suspendOrThrowIfUsedInSSR(a) {
  if (!executionEnvironment.isInBrowser) {
    throw CometSSRClientRender(a);
  }
}
