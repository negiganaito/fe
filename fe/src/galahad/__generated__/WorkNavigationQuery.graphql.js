/**
 * @generated SignedSource<<1e697ec0e69ad9a7b6838ea3a7842751>>
 * @relayHash e7f67bd4edb53efa0409355d9e554e71
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

// @relayRequestID e7f67bd4edb53efa0409355d9e554e71
// @dataDrivenDependency WorkNavigationQuery.company.navigation_renderer {"branches":{"XFBWorkNavigationClassicRenderer":{"component":"work-navigation-classic-renderer.jsx","fragment":"WorkNavigationClassicRenderer_renderer$normalization.graphql"}},"plural":false}

var node = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Company",
    "kind": "LinkedField",
    "name": "company",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "XFBWorkNavigationClassicRenderer",
        "kind": "LinkedField",
        "name": "navigation_renderer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "documentName": "WorkNavigationQuery",
            "fragmentName": "WorkNavigationClassicRenderer_renderer",
            "fragmentPropName": "renderer",
            "kind": "ModuleImport"
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "WorkNavigationQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "WorkNavigationQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "e7f67bd4edb53efa0409355d9e554e71",
    "metadata": {},
    "name": "WorkNavigationQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

node.hash = "8ecfc3c14b4cc93e66e98675de24a718";

module.exports = node;
