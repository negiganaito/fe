/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { commitMutation, graphql } from "react-relay";

// fragment WorkGalahadVariantEnableMutation on Mutation {
//   enable_work_galahad_variant_v2(input: $input) {
//     __typename
//   }
// }

const workGalahadVariantEnableMutation = graphql`
  mutation WorkGalahadVariantEnableMutation($input: WorkGalahadVariantInput) {
    enable_work_galahad_variant_v2(input: $input) {
      __typename
    }
  }
`;

export const WorkGalahadVariantEnableMutation = (
  environment,
  { onCompleted, onError, optimisticUpdater, input }
) => {
  return commitMutation(environment, {
    mutation: workGalahadVariantEnableMutation,
    optimisticUpdater,
    onError,
    onCompleted,
    variables: {
      input,
    },
  });
};
