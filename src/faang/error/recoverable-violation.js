import { FBLogger } from './fb-logger';

export function recoverableViolation(
  errorMessage,
  loggerIdentifier,
  options = {},
  e
) {
  let error = options.error;

  let logger = FBLogger(loggerIdentifier);

  if (error) {
    logger = logger.catching(error);
  } else {
    logger = logger.blameToPreviousFrame();
  }

  if (e.categoryKey) {
    logger = logger.addToCategoryKey(error);
  }

  let temp;

  e = (temp = e == null ? undefined : e.trackOnly) != null ? temp : false;

  if (e) {
    logger.debug(errorMessage);
  } else {
    logger.mustfix(errorMessage);
  }

  return null;
}
