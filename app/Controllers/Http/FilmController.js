'use strict'

const Film = use('App/Models/Film')

class FilmController {
  async getAllFilms({ response}){
    const films = await Film.query().fetch()
    response.res(films)
  }

  async createFilm({request, response}){
    const filmData = request.all()
    const film = await Film.createItem(filmData)
    response.res(film)
  }

}

module.exports = FilmController
