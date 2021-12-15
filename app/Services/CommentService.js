const { reduce } = require('lodash')
const Comment = use('App/Models/Comment')
const Database = use('Database')
const Film = use('App/Models/Film')
const User = use('App/Models/User')

class CommentServise {
  /**
   *@param id
   * @returns {Promise<*>}
   */
  static async getAllCommentsFilm(id) {
    const allComments = await User.query()
      .select({ avatar: 'users.avatar', username: 'users.username', comment: 'comments.message' })
      .innerJoin('comments', 'users.id', 'comments.user_id')
      .innerJoin('films', 'films.id', 'comments.film_id')
      .where('films.id', id)
      .fetch()
    return allComments.rows
  }

  /**
   *
   * @param filmComment
   * @returns {Promise<*>}
   */
  static async createComment(filmComment) {
    return Comment.createItem(filmComment)
  }
}

module.exports = CommentServise
