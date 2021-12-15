'use strict'

const Model = require('./BaseModel')

class Comments extends Model {
  static get columns() {
    return ['id', 'user_id', 'film_id', 'message']
  }

  static get readonly() {
    return ['id', 'user_id', 'film_id']
  }

  static get traits() {
    return ['NoTimestamp']
  }
  user() {
    return this.belongsTo('App/Models/User')
  }
  film() {
    return this.belongsTo('App/Models/Film')
  }
}

module.exports = Comments
