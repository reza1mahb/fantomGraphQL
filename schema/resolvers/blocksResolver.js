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

import { Block, BlockConnection } from '../types/Block'

const block = {
  type: Block,
  args: {
    index: {
      type: GraphQLInt
    },
    hash: {
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

const blocks = {
  type: BlockConnection,
  args: {
    by: { type: GraphQLString },
    ...forwardConnectionArgs
  },
  sqlPaginate: true,
  orderBy: args => {
    const sortBy = args.by || 'index'
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



module.exports = { block, blocks }
