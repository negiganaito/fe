import {GraphQLScalarType, GraphQLNonNull, GraphQLString} from 'graphql';

const JSDependencyType = new GraphQLScalarType({
  name: 'JSDependency',
  serialize: (value) => value,
});

const seenDataDrivenDependencies = new Set();

const JSDependencyField = {
  args: {
    module: {type: new GraphQLNonNull(GraphQLString)},
    id: {type: GraphQLString},
  },
  type: new GraphQLNonNull(JSDependencyType),
  // eslint-disable-next-line require-await
  resolve: async (_, {module}) => {
    seenDataDrivenDependencies.add(module);
    return module;
  },
};

const dataDrivenDependencies = {
  reset() {
    seenDataDrivenDependencies.clear();
  },
  getModules() {
    return Array.from(seenDataDrivenDependencies);
  },
};

export {dataDrivenDependencies, JSDependencyField, JSDependencyType};
