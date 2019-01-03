import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql'

import joinMonster from 'join-monster'

import { nodeField } from './types/Node'

import { round, rounds } from './resolvers/roundsResolver'
import { block, blocks } from './resolvers/blocksResolver'
import { transaction, transactions } from './resolvers/transactionsResolver'
import { consensusEvent, consensusEvents } from './resolvers/consensusEventsResolver'
import { vitals } from  './resolvers/vitalsResolver'

export default new GraphQLObjectType({
  description: 'global query object',
  name: 'Query',
  fields: () => ({
    version: {
      type: GraphQLString,
      resolve: () => joinMonster.version
    },

    node: nodeField,

    vitals: vitals,

    round: round,
    rounds: rounds,

    block: block,
    blocks: blocks,

    transaction: transaction,
    transactions: transactions,

    consensusEvent: consensusEvent,
    consensusEvents: consensusEvents,

  })
})
