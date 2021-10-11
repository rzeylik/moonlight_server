'use strict'

const FilmService = use('App/Services/FilmService')

class FilmController {
  async getAllFilms({ response}){
    const films = await FilmService.getAllFilms()
    response.res(films)
  }

  async createFilm({request, response}){
    const filmData = request.all()
    const film = await FilmService.createFilm(filmData)
    response.res(film)
  }

  async updateFilm({request, response}){
    const {id, ...filmData} = request.all()
    const film = await FilmService.updateFilm({id, filmData})
    response.res(film)
  }
}

module.exports = FilmController
