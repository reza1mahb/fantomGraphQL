import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  ColumnEnum
} from 'graphql'

import {
  forwardConnectionArgs
} from 'graphql-relay'


import joinMonster from 'join-monster'
import knex from '../../db'

import { Transaction, TransactionConnection } from '../types/Transaction'

const transaction = {
  type: Transaction,
  args: {
    hash: {
      type: GraphQLString
    },
    from: {
      type: GraphQLString
    },
    to: {
      type: GraphQLString
    },
    contract: {
      type: GraphQLString
    },
    block: {
      type: GraphQLString
    }
  },
  where: (table, args, context) => {
    var aa = []

    for (var property in args) {
      if(property != 'limit' && property != 'first' && property != 'last' && property != 'before' && property != 'after' && property != 'by') {
        if(typeof args[property] === 'string') {
          aa.push(`${table}.`+property+` like \'`+args[property]+`\'`)
        } else if(typeof args[property] === 'boolean') {
          aa.push(`${table}.`+property+` is `+args[property])
        } else if(typeof args[property] === 'number') {
          aa.push(`${table}.`+property+` = `+args[property])
        }
      }
    }

    return aa.join(' AND ')
  },
  resolve: (parent, args, context, resolveInfo) => {
    return joinMonster(resolveInfo, context, sql => knex.raw(sql), { dialect: 'pg' })
  }
}

const transactions = {
  type: TransactionConnection,
  args: {
    hash: {
      type: GraphQLString
    },
    from: {
      type: GraphQLString
    },
    to: {
      type: GraphQLString
    },
    contract: {
      type: GraphQLString
    },
    block: {
      type: GraphQLString
    },
    by: { type: ColumnEnum },
    ...forwardConnectionArgs
  },
  sqlPaginate: true,
  orderBy: args => {
    const sortBy = args.by || 'hash'
    return {
      [sortBy]: 'asc'
    }
  },
  where: (table, args, context) => {
    var aa = []

    for (var property in args) {
      if(property != 'limit' && property != 'first' && property != 'last' && property != 'before' && property != 'after' && property != 'by' && property != 'situations') {
        if(typeof args[property] === 'string') {
          aa.push(`${table}.`+property+` like \'`+args[property]+`\'`)
        } else if(typeof args[property] === 'boolean') {
          aa.push(`${table}.`+property+` is `+args[property])
        } else if(typeof args[property] === 'number') {
          aa.push(`${table}.`+property+` = `+args[property])
        }
      }
    }

    return aa.join(' OR ')
  },
  resolve: (parent, args, context, resolveInfo) => {
    return joinMonster(resolveInfo, context, sql => knex.raw(sql), { dialect: 'pg' })
  }
}



module.exports = { transaction, transactions }
