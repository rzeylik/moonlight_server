const { hooks } = require('@adonisjs/ignitor')
const debug = require('debug')('query')

const { truncate, reduce, get, toString, isString } = require('lodash')

const {
  extendsValidator,
  extendsRequest,
  extendsResponse,
  extendsView,
} = require('../app/Libs/Extends.js')

// After app started
hooks.after.providersBooted(async () => {
  // const Socket = use('Socket')
  const Event = use('Event')
  const Logger = use('Logger')
  const Database = use('Database')

  // Log all internal events
  Event.onAny((name, data) => {
    // Do not log Cache event
    if (name.search('Cache') === 0) {
      return false
    }
    Logger.info(truncate(JSON.stringify({ name, data }), { length: 500 }))
  })

  // Log all queries
  Database.on('query', ({ sql, bindings }) => {
    debug(
      reduce(
        sql.split('?'),
        (n, v, k) => {
          const rawVal = get(bindings, k)
          const value = isString(rawVal) ? `'${rawVal}'` : toString(rawVal)
          return `${n}${v}${value}`
        },
        ''
      )
    )
  })

  extendsResponse()
})
