const { GraphQLScalarType } = require('graphql')


const JSDependencyType = new GraphQLScalarType({
  name: 'JSDependency',
  serialize: (value) => value,
});

const JSDependencyField = {
  args: {
    module: { type: new GraphQLNonNull(GraphQLString) },
    id: { type: GraphQLString },
  },
  type: new GraphQLNonNull(JSDependencyType),
  resolve: async (_, { module }) => {
    seenDataDrivenDependencies.add(module);
    return module;
  },
};



const seenDataDrivenDependencies = new Set();

const dataDrivenDependencies = {
  reset() {
    seenDataDrivenDependencies.clear();
  },
  getModules() {
    return Array.from(seenDataDrivenDependencies);
  },
};




module.exports = {
  dataDrivenDependencies,
  JSDependencyField,
  JSDependencyType
}
