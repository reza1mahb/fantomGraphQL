import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat
} from 'graphql'

import { globalIdField } from 'graphql-relay'

import { nodeInterface } from './Node'

const Vitals = new GraphQLObjectType({
  description: 'Vitals',
  name: 'Vitals',
  sqlTable: '(select  count(*) as txn_count,  round(coalesce(sum(txn_minute)/60.0, 0), 2) as tps_minute,  round(coalesce(sum(txn_hour)/3600.0, 0), 2) as tps_hour,  round(coalesce(sum(txn_day)/86400.0, 0), 2) as tps_day,  round(coalesce(sum(txn_week)/604800.0, 0), 2) as tps_week, sum(txn_minute) as txn_minute, sum(txn_hour) as txn_hour, sum(txn_day) as txn_day, sum(txn_week) as txn_week from (select case when bl.created >= (extract(epoch from now())-60) then 1 else 0 end as txn_minute, case when bl.created >= (extract(epoch from now())-3600) then 1 else 0 end as txn_hour, case when bl.created >= (extract(epoch from now())-86400) then 1 else 0 end as txn_day, case when bl.created >= (extract(epoch from now())-604800) then 1 else 0 end as txn_week from transactions tx left join blocks bl on tx.block = bl.hash) a)',
  uniqueKey: 'txn_count',
  interfaces: [ nodeInterface ],
  fields: () => ({
    id: {
      description: 'The global ID for the Relay spec',
      ...globalIdField(),
      sqlDeps: [ 'txn_count' ]
    },
    txn_count: {
      type: GraphQLInt
    },
    txn_minute: {
      type: GraphQLInt
    },
    txn_hour: {
      type: GraphQLInt
    },
    txn_day: {
      type: GraphQLInt
    },
    txn_week: {
      type: GraphQLInt
    },
    tps_minute: {
      type: GraphQLFloat
    },
    tps_hour: {
      type: GraphQLFloat
    },
    tps_day: {
      type: GraphQLFloat
    },
    tps_week: {
      type: GraphQLFloat
    }
  })
})

export { Vitals }
