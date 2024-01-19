import {GraphQLObjectType, GraphQLString} from 'graphql';

import {JSDependencyField} from './js-dependency.mjs';

// Define the NavigationRenderer type
const XFBWorkNavigationClassicRendererType = new GraphQLObjectType({
  name: 'XFBWorkNavigationClassicRenderer',
  fields: () => ({
    js: JSDependencyField,
    years: {type: GraphQLString},
  }),
});

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    navigation_renderer: {
      type: XFBWorkNavigationClassicRendererType,
      // Resolve function for navigation_renderer field
    },
  },
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    company: {
      type: CompanyType,
    },
  },
});

const rootValue = {
  company: () => {
    return {
      navigation_renderer: {},
    };
  },
};

export {QueryType, rootValue};
