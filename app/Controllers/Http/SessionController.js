'use strict'

const SessionService = use('App/Services/SessionService')

class SessionController {
  async createSession({ request, response }) {
    const { film_id, price, date_time } = request.all()
    const session = await SessionService.createSession({ film_id, price, date_time })
    response.res(session)
  }
}

module.exports = SessionController
