const Database = use('Database')
const P = require('bluebird')
const { reduce } = require('lodash')

class TicketService {
  /**
   *
   * @param userId
   * @param sessionId
   * @returns {Promise<*>}
   */
  static async getTicketByUserId(userId, sessionId) {
    const allUserTickets = await Database.query()
      .from('tickets')
      .innerJoin('sessions', 'tickets.session_id', 'sessions.id')
      .innerJoin('films', 'sessions.film_id', 'films.id')
      .where({ user_id: userId })

    const obj = allUserTickets.reduce((prev, next) => {
      if (!prev[next.session_id]) {
        prev[next.session_id] = { places: [] }
      }
      const allPlaces = [...prev[next.session_id].places, next.place]
      delete next.place
      next.places = allPlaces
      return { ...prev, [next.session_id]: { ...(prev[next.session_id] || {}), ...next } }
    }, {})
    return reduce(obj, (r, v, k) => [...r, { ...v, key: k }], [])
  }

  /**
   *
   * @param sessionId
   * @returns {Promise<*>}
   */
  static async getTicketBySessionId(sessionId) {
    return Database.query().from('tickets').where({ session_id: sessionId })
  }

  /**
   *
   * @param userId
   * @param sessionId
   * @param places
   * @returns {Promise<*>}
   */
  static async createTicket(userId, sessionId, places) {
    return P.map(
      places,
      (place) => {
        return Database.query()
          .insert({ user_id: userId, session_id: sessionId, place })
          .into('tickets')
          .returning('*')
      },
      { concurrency: 5 }
    )
  }

  static async deleteTicketById(session_id, userId) {
    return Database.query()
      .from('tickets')
      .innerJoin('sessions', 'tickets.session_id', 'sessions.id')
      .where({ user_id: userId, session_id })
      .delete()
  }
}

module.exports = TicketService
