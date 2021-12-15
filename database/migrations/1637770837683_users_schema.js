'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up() {
    this.table('users', (table) => {
      table.integer('type').defaultTo(0)
    })
  }

  down() {
    this.table('users', (table) => {
      table.dropColumn('type')
    })
  }
}

module.exports = UsersSchema
