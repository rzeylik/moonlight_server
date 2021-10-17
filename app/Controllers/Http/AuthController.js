'use strict'

const User = use('App/Models/User')

class AuthController {
  async register({request, auth, response}) {
    const {username, email, password} = request.all()

    const user = new User()
    user.username = username
    user.email = email
    user.password = password
    await user.save()

    const accessToken = await auth.generate(user)
    return response.json({"user": user, "access_token": accessToken})
  }

  async login({request, auth, response}) {
    const {email, password} = request.all()
    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy('email', email)
        let accessToken = await auth.generate(user)
        return response.json({"user":user, "access_token": accessToken})
      }
    }
    catch (e) {
      return response.json({message: 'You first need to register!'})
    }
  }

  async me({auth, response}){
    return response.res(auth.user)
  }


}

module.exports = AuthController
