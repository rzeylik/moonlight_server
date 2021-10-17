const User = use('App/Models/User')

class UserService{
  static async createUser(userData){
    return User.createItem(userData)
  }

  static async updateUser({id, userData}){
    const user = User
  }
}

module.exports = UserService
