/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
export const CometSSRClientRenderError = 'CometSSRClientRenderError';

export const CometSSRClientRender = (message) => {
  throw new ClientRenderSentinel(message);
};

export class ClientRenderSentinel {
  constructor(message) {
    this.message = CometSSRClientRenderError + ': ' + message;
    this.name = 'CometSSRClientRenderError';
  }
}
