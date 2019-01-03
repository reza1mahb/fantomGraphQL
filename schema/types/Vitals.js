import {
  GraphQLObjectType,
  GraphQLInt
} from 'graphql'

import { globalIdField } from 'graphql-relay'

import { nodeInterface } from './Node'

const Vitals = new GraphQLObjectType({
  description: 'Vitals',
  name: 'Vitals',
  sqlTable: '(SELECT count(*) as transaction_count from transactions)',
  uniqueKey: 'transaction_count',
  interfaces: [ nodeInterface ],
  fields: () => ({
    id: {
      description: 'The global ID for the Relay spec',
      ...globalIdField(),
      sqlDeps: [ 'transaction_count' ]
    },
    transaction_count: {
      type: GraphQLInt
    }
  })
})

export { Vitals }
