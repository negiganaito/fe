/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { err } from "../error";

/**
 * Creates a provider for Comet Relay base entry point environment.
 * @param {Object} relayFactory - The Relay factory object.
 * @param {Object} defaultEnvironment - The default Relay environment.
 * @param {Object} fallbackEnvironment - The fallback Relay environment.
 * @returns {Object} - The environment provider.
 */
export const createCometRelayBaseEntryPointEnvironmentProvider = (
  relayFactory,
  defaultEnvironment,
  fallbackEnvironment
) => {
  /**
   * Gets the Relay environment based on the actor ID or falls back to the default or provided fallback environment.
   * @param {Object} options - The options object, which may include an actor ID.
   * @returns {Object} - The selected Relay environment.
   */
  let getEnvironment = function (options) {
    // Use the actor ID from the options or fallback to the provided fallback environment
    options = options ? options.actorID : fallbackEnvironment;

    // If no actor ID is provided and no default environment is found, throw an error
    if (!options) {
      if (defaultEnvironment) return defaultEnvironment;
      throw err("No default Relay environment found in factory");
    }

    // Get the Relay environment for the provided actor ID
    return relayFactory.getForActorID(String(options));
  };

  return {
    getEnvironment,
  };
};
