import { getTranslatedInput } from './getTranslatedInput';
import { init } from 'fbt';

init({
  // translations: require("./fbt/translatedFbts.json"),
  hooks: { getTranslatedInput },
});

export default {};
