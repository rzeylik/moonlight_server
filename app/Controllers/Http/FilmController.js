'use strict'

const { each, trimEnd, trimStart } = require('lodash')

const File = use('App/Classes/File')
const FilmService = use('App/Services/FilmService')
const Env = use('Env')
const fs = require('fs').promises

class FilmController {
  async getAllFilms({ request, response }) {
    const { search } = request.all()
    const films = await FilmService.getFilms(search)
    response.res(films)
  }

  async getFilm({ request, response }) {
    const { id } = request.all()
    const film = await FilmService.getFilmById(id)
    response.res(film)
  }

  async createFilm({ request, response }) {
    const filmData = request.all()
    const { small_image, large_image } = request.files()
    if (small_image || large_image) {
      const savedPath = await File.saveRequestFiles(request, ['small_image', 'large_image'])
      each(savedPath, (saveImage, key) => (filmData[key] = saveImage))
    }
    const film = await FilmService.createFilm(filmData)
    response.res(film)
  }

  async updateFilm({ request, response }) {
    const { id, ...filmData } = request.all()

    const { small_image, large_image } = request.files()
    if (small_image || large_image) {
      const savedPath = await File.saveRequestFiles(request, ['small_image', 'large_image'])
      each(savedPath, (saveImage, key) => (filmData[key] = saveImage))
    }

    const film = await FilmService.updateFilm({ id, filmData })
    response.res(film)
  }

  async getFilmsByDate({ request, response }) {
    const { date } = request.all()
    const films = await FilmService.getFilmsByDate(date)
    response.res(films)
  }

  async deleteFilm({ request, response }) {
    const { id } = request.all()
    const result = await FilmService.deleteFilmById(id)
    response.res(result)
  }

  async getFilmImage({ request, response }) {
    const { small_image } = request.all()
    const staticUrl = Env.get('STATIC_PATH')
    const imagePath = `${trimEnd(staticUrl, '/')}/${trimStart(small_image, '/')}`
    const contents = await fs.readFile(imagePath, { encoding: 'base64' })
    response.send(contents)
  }
}

module.exports = FilmController
