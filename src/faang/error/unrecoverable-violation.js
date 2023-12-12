import { FBLogger } from './fb-logger';

export function unrecoverableViolation(msg, projectName, category, errObj) {
  errObj == undefined && (errObj = {});
  errObj = errObj.error;
  let fbLogMsg = FBLogger(projectName);
  fbLogMsg = errObj
    ? fbLogMsg.catching(errObj)
    : fbLogMsg.blameToPreviousFrame();
  const categoryKey = category == undefined ? undefined : category.categoryKey;
  categoryKey != undefined &&
    (fbLogMsg = fbLogMsg.addToCategoryKey(categoryKey));
  return fbLogMsg.mustfixThrow(msg);
}
