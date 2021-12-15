'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentsSchema extends Schema {
  up() {
    this.create('comments', (table) => {
      table.increments()
      table.integer('user_id').references('id').inTable('users').onDelete('cascade')
      table.integer('film_id').references('id').inTable('films').onDelete('cascade')
      table.string('message', 2000).notNullable()
    })
  }

  down() {
    this.drop('comments')
  }
}

module.exports = CommentsSchema
