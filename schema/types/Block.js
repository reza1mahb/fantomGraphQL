import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql'

import GraphQLJSON from 'graphql-type-json';

import {
  globalIdField,
  connectionDefinitions
} from 'graphql-relay'

import { nodeInterface } from './Node'

const Block = new GraphQLObjectType({
  description: 'Block',
  name: 'Block',
  sqlTable: 'blocks',
  uniqueKey: 'hash',
  interfaces: [ nodeInterface ],
  fields: () => ({
    id: {
      description: 'The global ID for the Relay spec',
      ...globalIdField(),
      sqlDeps: [ 'hash' ]
    },
    index: {
      type: GraphQLInt
    },
    round: {
      type: GraphQLInt
    },
    payload: {
      type: GraphQLJSON
    },
    created: {
      type: GraphQLInt
    }
  })
})

const { connectionType: BlockConnection } = connectionDefinitions({ nodeType: Block })

export { Block, BlockConnection }
