'use strict'

const Film = use('App/Models/Film')
const Session = use('App/Models/Session')

const P = require('bluebird')
const { random } = require('lodash')
const moment = require('moment')

const sessionsHours = [10, 12, 16, 20]

class TestController {
  async parseURL({ response }) {
    const toParse = ''
  }

  createDateTime(hours, date = new Date()) {
    date.setHours(hours, 0, 0, 0)
    return date
  }

  async createSessions({ response }) {
    const films = (await Film.all()).toJSON()
    await P.map(films, (film) => {
      console.log(film)
      return P.map(sessionsHours, async (sessionsHour) => {
        const session = this.createSession(
          film.id,
          this.createDateTime(sessionsHour, new Date('12-07-2021'))
        )
        await session.save()
      })
    })

    response.res('Ok')
  }

  createSession(film_id, date_time, price = random(100, 300), type = random(1, 4)) {
    return Session.create({ film_id, date_time, price, type })
  }
}

module.exports = TestController
