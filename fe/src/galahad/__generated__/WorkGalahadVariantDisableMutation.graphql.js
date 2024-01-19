/**
 * @generated SignedSource<<c4eaf0f6ca183341cf95f87a6a799afc>>
 * @relayHash a54ed9bfa94c0d22086239d2fe60531f
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

// @relayRequestID a54ed9bfa94c0d22086239d2fe60531f

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
    "id": "a54ed9bfa94c0d22086239d2fe60531f",
    "metadata": {},
    "name": "WorkGalahadVariantDisableMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

node.hash = "e1565bad5e285f3309ae2408012aa90d";

module.exports = node;
