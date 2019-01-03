import {
  GraphQLObjectType
} from 'graphql'

import joinMonster from 'join-monster'
import knex from '../../db'

import { Vitals } from '../types/Vitals'

const vitals = {
  type: Vitals,
  args: {

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

module.exports = { vitals }
