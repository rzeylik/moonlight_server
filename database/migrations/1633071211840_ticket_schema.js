'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TicketSchema extends Schema {
  up() {
    this.create('tickets', (table) => {
      table.increments()
      table.integer('user_id').references('id').inTable('users').onDelete('cascade')
      table.integer('session_id').references('id').inTable('sessions').onDelete('cascade')
      table.integer('place').notNullable()
    })
  }

  down() {
    this.drop('tickets')
  }
}

module.exports = TicketSchema
