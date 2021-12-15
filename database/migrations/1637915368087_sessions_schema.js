'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SessionsSchema extends Schema {
  up() {
    this.table('sessions', (table) => {
      table.integer('type').defaultTo(1)
    })
  }

  down() {
    this.table('sessions', (table) => {
      table.dropColumn('type')
    })
  }
}

module.exports = SessionsSchema
