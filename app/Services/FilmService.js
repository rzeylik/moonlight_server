const moment = require('moment')

const Film = use('App/Models/Film')
const Database = use('Database')

class FilmService {
  /**
   *
   * @returns {Promise<*>}
   */
  static async getAllFilms() {
    return Film.query().fetch()
  }

  /**
   *
   * @param filmData
   * @returns {Promise<*>}
   */
  static async createFilm(filmData) {
    return Film.createItem(filmData)
  }

  /**
   *
   * @param id
   * @param filmData
   * @returns {Promise<*|undefined>}
   */
  static async updateFilm({ id, filmData }) {
    const film = await Film.query().where({ id }).first()
    return film.updateItem(filmData)
  }

  static async getFilmsByDate(date) {
    const nextDate = new Date(moment(date).add(1, 'day'))
    return Film.query()
      .with('sessions')
      .whereHas('sessions', async (builder) => {
        builder.whereBetween('date_time', [
          moment(date).format('MM-DD-yyyy'),
          moment(nextDate).format('MM-DD-yyyy'),
        ])
      })
      .fetch()
    // return Database.raw(
    //   Database.query()
    //     .select('films.*', Database.raw('_s.date_item::date as d'))
    //     .from('films')
    //     .innerJoin({ _s: 'sessions' }, '_s.film_id', 'films.id')
    //     .whereBetween('_s.date_time', [date, nextDate])
    //     .toString()
    // )
  }
}

module.exports = FilmService
