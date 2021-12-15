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
Route.group(() => {
  Route.get('/', 'FilmController.getAllFilms')
  Route.post('/', 'FilmController.createFilm').middleware(['auth', 'valid:FilmCreate'])
  Route.get('/image', 'FilmController.getFilmImage')
  Route.put('/:id', 'FilmController.updateFilm').middleware(['auth', 'valid:Id,FilmUpdate'])
  Route.get('/date', 'FilmController.getFilmsByDate').middleware(['valid:FilmByDate'])
  Route.delete('/:id', 'FilmController.deleteFilm').middleware(['auth', 'valid:Id'])
  Route.get('/:id', 'FilmController.getFilm').middleware(['valid:Id'])
}).prefix('api/v1/films')

Route.group(() => {
  Route.get('/:film_id', 'CommentsController.getComment')
  Route.post('/:film_id', 'CommentsController.createCommentFilm').middleware(['auth'])
}).prefix('api/v1/comments')

Route.group(() => {
  Route.post('/auth/register', 'AuthController.register')
  Route.post('/auth/login', 'AuthController.login')
  Route.get('/me', 'AuthController.me').middleware(['auth'])
  Route.put('/', 'UserController.updateUser').middleware(['auth', 'valid:UpdateUser'])
}).prefix('api/v1/account')

Route.group(() => {
  Route.get('/', 'SessionController.getSessions')
  Route.post('/', 'SessionController.createSession').middleware(['auth', 'valid:CreateSession'])
  Route.delete('/:id', 'SessionController.deleteSession').middleware(['auth', 'valid:Id'])
}).prefix('api/v1/sessions')

Route.group(() => {
  Route.get('/:id', 'TicketController.getTicketBySessionId').middleware(['valid:Id'])
  Route.get('/:id/user', 'TicketController.getTicketByUserId').middleware([
    'auth',
    'valid:IdNotRequired',
  ])
  Route.post('/:id', 'TicketController.createTicket').middleware(['auth', 'valid:Id,SessionCreate'])
  Route.delete('/:id/delete', 'TicketController.deleteTicketUser').middleware(['auth', 'valid:Id'])
}).prefix('api/v1/tickets')

Route.get('/test1', 'TestController.createSessions')
