const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

module.exports = {
  async signIn(request, response) {

    const { email, password } = request.body

    const user = (await userModel.getUserByEmail(email))[0]

    if (!user)
      return response.status(400).json({ message: 'User not found' })

    if (user.PASSWORD !== password)
      return response.status(400).json({ message: 'Invalid password' })


    const idToken = {
      id: user.ID,
      EMAIL: user.EMAIL
    }
    const bearerToken = await jwt.sign({ idToken }, "BAE39995479EB", { expiresIn: "1h" });

    return response.json({
      user: user,
      token: bearerToken
    })
  }
}