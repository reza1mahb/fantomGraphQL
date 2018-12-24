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

const Transaction = new GraphQLObjectType({
  description: 'Transaction',
  name: 'Transaction',
  sqlTable: 'transactions',
  uniqueKey: ['hash','block'],
  interfaces: [ nodeInterface ],
  fields: () => ({
    id: {
      description: 'The global ID for the Relay spec',
      ...globalIdField(),
      sqlDeps: [ 'hash' ]
    },
    hash: {
      type: GraphQLString
    },
    root: {
      type: GraphQLString
    },
    from: {
      type: GraphQLString
    },
    to: {
      type: GraphQLString
    },
    value: {
      type: GraphQLString
    },
    gas: {
      type: GraphQLString
    },
    used: {
      type: GraphQLString
    },
    price: {
      type: GraphQLString
    },
    cumulative: {
      type: GraphQLString
    },
    contract: {
      type: GraphQLString
    },
    logs: {
      type: GraphQLString
    },
    error: {
      type: GraphQLString
    },
    status: {
      type: GraphQLInt
    },
    block: {
      type: GraphQLString
    }
  })
})

const { connectionType: TransactionConnection } = connectionDefinitions({ nodeType: Transaction })

export { Transaction, TransactionConnection }
