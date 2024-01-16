/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { commitMutation, graphql } from "react-relay";

// WorkGalahadVariantInput
const workGalahadVariantDisableMutation = graphql`
  mutation WorkGalahadVariantDisableMutation($input: WorkGalahadVariantInput) {
    disable_work_galahad_variant_v2(input: $input) {
      __typename
    }
  }
`;

export const WorkGalahadVariantDisableMutation = (
  environment,
  { onCompleted, onError, optimisticUpdater, input }
) => {
  return commitMutation(environment, {
    mutation: workGalahadVariantDisableMutation,
    optimisticUpdater,
    onError,
    onCompleted,
    variables: {
      input,
    },
  });
};
