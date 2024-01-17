/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { Network, QueryResponseCache } from "relay-runtime";

import { registerLoader } from "@/galahad/utils/module-loader";

const ONE_MINUTE_IN_MS = 60 * 1000;

export const createNetwork = (baseUrl) => {
  const responseCache = new QueryResponseCache({
    size: 100,
    ttl: ONE_MINUTE_IN_MS,
  });

  const fetchResponse = async (operation, variables, cacheConfig) => {
    const { id } = operation;

    const isQuery = operation.operationKind === "query";
    const forceFetch = cacheConfig && cacheConfig.force;
    if (isQuery && !forceFetch && id) {
      const fromCache = responseCache.get(id, variables);
      if (fromCache) {
        return Promise.resolve(fromCache);
      }
    }

    return networkFetch(id, variables, baseUrl);
  };

  const fetchFn = async (...args) => {
    const response = await fetchResponse(...args);

    if (Array.isArray(response)) {
      const responses = response;
      responses.forEach((singleResponse) => {
        if (Array.isArray(singleResponse.extensions?.modules)) {
          registerModuleLoaders(singleResponse.extensions?.modules);
        }
      });
    } else {
      const singleResponse = response;
      if (Array.isArray(singleResponse.extensions?.modules)) {
        registerModuleLoaders(singleResponse.extensions?.modules);
      }
    }

    return response;
  };

  const network = Network.create(fetchFn);
  network.responseCache = responseCache;

  return network;
};

export async function networkFetch(id, variables, baseUrl) {
  const response = await fetch(`${baseUrl}/graphql`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      variables,
    }),
  });
  return response.json();
}

function registerModuleLoaders(modules) {
  modules.forEach((module) => {
    if (module.endsWith("$normalization.graphql")) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      registerLoader(module, () =>
        import(`../../galahad/__generated__/${module}`)
      );
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      registerLoader(module, () => import(`../../galahad/3d/${module}`));
    }
  });
}
