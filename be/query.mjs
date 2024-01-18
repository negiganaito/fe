import { GraphQLObjectType, GraphQLString } from "graphql";

import { JSDependencyField } from "./js-dependency.mjs";

// Define the NavigationRenderer type
const NavigationRendererType = new GraphQLObjectType({
  name: "NavigationRenderer",
  fields: () => ({
    js: JSDependencyField,
    years: { type: GraphQLString },
  }),
});

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: {
    navigation_renderer: {
      type: NavigationRendererType,
      // Resolve function for navigation_renderer field
    },
  },
});

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    company: {
      type: CompanyType,
    },
  },
});

const rootValue = {
  company: () => {
    return {
      navigation_renderer: {
        years: "2024",
      },
    };
  },
};

export { QueryType, rootValue };
