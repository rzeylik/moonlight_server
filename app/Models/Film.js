'use strict'

const Model = require('./BaseModel')

class Film extends Model {
  static get columns(){
    return [
      'id',
      'name',
      'description',
      'publish_year',
      'rating',
      'age_restriction',
      'duration',
      'producer',
      'large_image',
      'small_image'
    ]
  }

  static get readonly(){
    return [
      'id',
      'name',
      'description',
      'publish_year',
      'rating',
      'age_restriction',
      'duration',
      'producer',
    ]
  }
}

module.exports = Film
