const Film = use('App/Models/Film')

class FilmService{
  /**
   *
   * @returns {Promise<*>}
   */
  static async getAllFilms(){
    return Film.query().fetch()
  }

  /**
   *
   * @param filmData
   * @returns {Promise<*>}
   */
  static async createFilm(filmData){
    return Film.createItem(filmData)
  }

  /**
   *
   * @param id
   * @param filmData
   * @returns {Promise<*|undefined>}
   */
  async updateFilm({id, filmData}){
    const film = await Film.query().where({id}).first()
    return film.updateItem(filmData)
  }
}

module.exports = FilmService
