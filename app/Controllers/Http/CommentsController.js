'use strict'

const CommentService = use('App/Services/CommentService')

class CommentController {
  async getComment({ request, response }) {
    const { film_id } = request.params
    const comment = await CommentService.getAllCommentsFilm(film_id)
    response.res(comment)
  }

  async createCommentFilm({ request, auth, response }) {
    const commentData = { ...request.all(), ...request.params }
    const comment = await CommentService.createComment({ ...commentData, user_id: auth.user.id })
    response.res(comment)
  }
}

module.exports = CommentController
