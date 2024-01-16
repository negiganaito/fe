const { GraphQLObjectType,GraphQLInputObjectType, GraphQLNonNull, GraphQLString } = require('graphql')

const WorkGalahadVariantInput = new GraphQLInputObjectType({
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

const DisableWorkGalahadVariantV2ResponsePayload = new GraphQLObjectType({
  name:"DisableWorkGalahadVariantV2ResponsePayload",
  fields: {
    __typename: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
})

const EnableWorkGalahadVariantV2ResponsePayload = new GraphQLObjectType({
  name:"EnableWorkGalahadVariantV2ResponsePayload",
  fields: {
    __typename: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
})


const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    enable_work_galahad_variant_v2: {
      args: {
        input: {
          type: WorkGalahadVariantInput,
        },
      },
      type: EnableWorkGalahadVariantV2ResponsePayload,
      resolve: () => {
        return {
          __typeName: 'EnableWorkGalahadVariantV2ResponsePayload',
        }
      },
    },

    disable_work_galahad_variant_v2: {
      args: {
        input: {
          type: WorkGalahadVariantInput,
        },
      },
      type: DisableWorkGalahadVariantV2ResponsePayload,
      resolve: () => {
        return {
          __typeName: 'DisableWorkGalahadVariantV2ResponsePayload',
        }
      },
    },
  },
})


module.exports = {
  MutationType
}
