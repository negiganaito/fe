/**
 * @generated SignedSource<<1dda9082e59ba86b1f3171bdb9542112>>
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
    "concreteType": "EnableWorkGalahadVariantV2ResponsePayload",
    "kind": "LinkedField",
    "name": "enable_work_galahad_variant_v2",
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
    "name": "WorkGalahadVariantEnableMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "WorkGalahadVariantEnableMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "56ca1bc9d602091cd66822e44f9e2b5d",
    "id": null,
    "metadata": {},
    "name": "WorkGalahadVariantEnableMutation",
    "operationKind": "mutation",
    "text": "mutation WorkGalahadVariantEnableMutation(\n  $input: WorkGalahadVariantInput\n) {\n  enable_work_galahad_variant_v2(input: $input) {\n    __typename\n  }\n}\n"
  }
};
})();

node.hash = "fcc5c0d586a594c5326da789a8ae51ba";

module.exports = node;
