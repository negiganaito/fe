/**
 * @generated SignedSource<<3793f4d2b65f599019ace23d1e46f404>>
 * @relayHash 56ca1bc9d602091cd66822e44f9e2b5d
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

// @relayRequestID 56ca1bc9d602091cd66822e44f9e2b5d

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
    "id": "56ca1bc9d602091cd66822e44f9e2b5d",
    "metadata": {},
    "name": "WorkGalahadVariantEnableMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

node.hash = "fcc5c0d586a594c5326da789a8ae51ba";

module.exports = node;
