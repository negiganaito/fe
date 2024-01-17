/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { Environment, RecordSource, Store } from "relay-runtime";

import moduleLoader from "@/galahad/utils/module-loader";

import { createNetwork } from "./network";

// const fetchGraphQL = (params, variables) => {
//   const response = fetch("http://localhost:5000/graphql", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       query: params.text,
//       variables,
//     }),
//   });

//   return Observable.from(response.then((data) => data.json()));
// };

const IS_SERVER = typeof window === typeof undefined;
const CLIENT_DEBUG = false;
const SERVER_DEBUG = false;

function createEnvironment(baseUrl = "http://localhost:5000") {
  // Operation loader is reponsible for loading JS modules/components
  // for data-processing and rendering
  const operationLoader = {
    get: (name) => moduleLoader(name).get(),
    load: (name) => moduleLoader(name).load(),
  };

  const network = createNetwork(baseUrl);
  const environment = new Environment({
    network,
    store: new Store(new RecordSource(), { operationLoader }),
    operationLoader,
    isServer: IS_SERVER,
    log(event) {
      if ((IS_SERVER && SERVER_DEBUG) || (!IS_SERVER && CLIENT_DEBUG)) {
        // eslint-disable-next-line no-console
        console.debug("[relay environment event]", event);
      }
    },
  });

  const environmentNetwork = environment.getNetwork();
  environmentNetwork.responseCache = network.responseCache;

  return environment;
}

export function RelayEnvironment({ children }) {
  const environment = React.useMemo(() => {
    return createEnvironment();
  }, []);

  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
}
