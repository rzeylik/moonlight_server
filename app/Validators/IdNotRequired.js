'use strict'

const yup = require('yup')

const Base = require('./Base')

class IdNotRequired extends Base {
  static schema = () =>
    yup.object().shape({
      id: yup.number().positive().integer(),
    })
}

module.exports = IdNotRequired
