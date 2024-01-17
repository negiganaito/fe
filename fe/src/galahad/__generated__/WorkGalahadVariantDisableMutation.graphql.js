/**
 * @generated SignedSource<<33adb235081a4ce5903ff6ff142d8676>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "DisableWorkGalahadVariantV2ResponsePayload",
    "kind": "LinkedField",
    "name": "disable_work_galahad_variant_v2",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "__typename",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "WorkGalahadVariantDisableMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "WorkGalahadVariantDisableMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a54ed9bfa94c0d22086239d2fe60531f",
    "id": null,
    "metadata": {},
    "name": "WorkGalahadVariantDisableMutation",
    "operationKind": "mutation",
    "text": "mutation WorkGalahadVariantDisableMutation(\n  $input: WorkGalahadVariantInput\n) {\n  disable_work_galahad_variant_v2(input: $input) {\n    __typename\n  }\n}\n"
  }
};
})();

node.hash = "e1565bad5e285f3309ae2408012aa90d";

module.exports = node;
