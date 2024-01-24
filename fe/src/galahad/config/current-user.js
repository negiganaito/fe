/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
let data = null;

const getID = () => {
  return data ? data.USER_ID : undefined;
};

const getAccountID = () => {
  return data ? data.ACCOUNT_ID : undefined;
};

const getPossiblyNonFacebookUserID = () => {
  if (data) {
    return data.NON_FACEBOOK_USER_ID ?? getID();
  }
  return undefined;
};

const getName = () => {
  return data ? data.NAME : undefined;
};

const getShortName = () => {
  return data ? data.SHORT_NAME : undefined;
};

export const CurrentUser = {
  data,
  getAccountID,
  getPossiblyNonFacebookUserID,
  getName,
  getShortName,
};
