'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.get('/ping', ({ response }) => response.res('pong!'))
Route.get('/parse', 'TestController.parseURL')
Route.group(()=>{
  Route.get('/', 'FilmController.getAllFilms')
  Route.post('/', 'FilmController.createFilm')
}).prefix('api/v1/films')
