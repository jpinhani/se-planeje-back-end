const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')


module.exports = {
  async signIn(request, response) {

    const { email, password } = request.body

    const user = (await userModel.getUserByEmail(email, password))

    if (user.length === 0)
      return response.json({ status: 400 }) //.json({ message: 'date not found' })

    // console.log(user[0].ID)
    const idToken = {
      id: user[0].ID,
      EMAIL: user[0].EMAIL
    }
    const bearerToken = jwt.sign(idToken, "BAE39995479EB", { expiresIn: "1h" });

    return response.json({
      user: user[0].ID,
      token: bearerToken,
    })
  }
}