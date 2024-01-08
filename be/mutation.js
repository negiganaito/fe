const { GraphQLObjectType } = require('graphql')

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    WorkGalahadVariantEnableMutation: {},
  },
})
