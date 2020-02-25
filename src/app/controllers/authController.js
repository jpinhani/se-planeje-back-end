const userModel = require('../models/userModel')

module.exports = {
  async signIn(request, response) {

    const bearerToken = 'BAE39995479EB'

    const { email, password } = request.body

    const user = (await userModel.getUserByEmail(email))[0]

    if (!user)
      return response.status(400).json({ message: 'User not found' })

    if (user.PASSWORD !== password)
      return response.status(400).json({ message: 'Invalid password' })

    return response.json({
      user: user,
      token: bearerToken
    })
  }
}