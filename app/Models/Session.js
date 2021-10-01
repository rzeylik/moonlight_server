'use strict'

const Model = require('./BaseModel')

class Session extends Model {
  static get columns(){
    return [
      'id',
      'film',
      'date_time',
      'price'
    ]
  }
  static get readonly(){
    return [
      'id',
      'film',
      'date_time',
    ]
  }
}

module.exports = Session
