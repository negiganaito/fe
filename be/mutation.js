const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql')

const WorkGalahadVariantInputType = new GraphQLObjectType({
  name: 'WorkGalahadVariantInput',
  fields: {
    variant: {
      type: new GraphQLNonNull(GraphQLString),
    },
    source: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
})

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    WorkGalahadVariantEnableMutation: {
      args: {
        input: {
          type: WorkGalahadVariantInputType,
        },
      },
      resolve: () => {
        return {
          __typeName: 'EnableWorkGalahadVariantV2ResponsePayload',
        }
      },
    },

    WorkGalahadVariantDisableMutation: {
      args: {
        input: {
          type: WorkGalahadVariantInputType,
        },
      },
      resolve: () => {
        return {
          __typeName: 'DisableWorkGalahadVariantV2ResponsePayload',
        }
      },
    },
  },
})
