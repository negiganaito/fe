/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

// eslint-disable-next-line no-use-before-define
export = userAgent;
// eslint-disable-next-line @typescript-eslint/no-use-before-define, no-use-before-define
export as namespace userAgent;

// eslint-disable-next-line no-use-before-define
declare const userAgent: UserAgent;

declare interface UserAgent {
  isBrowser: (query: string) => boolean;
  isBrowserArchitecture: (query: string) => boolean;
  isDevice: (query: string) => boolean;
  isEngine: (query: string) => boolean;
  isPlatform: (query: string) => boolean;
  isPlatformArchitecture: (query: string) => boolean;
}
