/**
 * @generated SignedSource<<3370fb396e35cd90f7bed6e517dae448>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

// @dataDrivenDependency WorkNavigationQuery.company.navigation_renderer {"branches":{"NavigationRenderer":{"component":"work-navigation-classic-renderer.jsx","fragment":"WorkNavigationClassicRenderer_renderer$normalization.graphql"}},"plural":false}

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
        "concreteType": "NavigationRenderer",
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
    "cacheID": "92552cd4eb43e4573bfa9a42ae860c2d",
    "id": null,
    "metadata": {},
    "name": "WorkNavigationQuery",
    "operationKind": "query",
    "text": "query WorkNavigationQuery {\n  company {\n    navigation_renderer {\n      ...WorkNavigationClassicRenderer_renderer\n      __module_operation_WorkNavigationQuery: js(module: \"WorkNavigationClassicRenderer_renderer$normalization.graphql\", id: \"WorkNavigationQuery.company.navigation_renderer\")\n      __module_component_WorkNavigationQuery: js(module: \"work-navigation-classic-renderer.jsx\", id: \"WorkNavigationQuery.company.navigation_renderer\")\n    }\n  }\n}\n\nfragment WorkNavigationClassicRenderer_renderer on NavigationRenderer {\n  years\n}\n"
  }
};
})();

node.hash = "8ecfc3c14b4cc93e66e98675de24a718";

module.exports = node;
