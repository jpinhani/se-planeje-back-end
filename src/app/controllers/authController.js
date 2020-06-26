const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
require("dotenv").config();


module.exports = {
  async signIn(request, response) {

    const { email, password } = request.body

    const user = await userModel.getUserByEmail(email, password)

    if (user.length === 0)
      return response.json({ status: 400 }) //.json({ message: 'date not found' })

    // if (user[0].PAYSTATUS === 'canceled' || user[0].PAYSTATUS === 'unpaid')
    //   return response.json({ status: 401 })

    // console.log(user[0].ID)
    const idToken = {
      id: user[0].ID,
      EMAIL: user[0].EMAIL
    }
    const bearerToken = jwt.sign(idToken, process.env.SP_JWT, { expiresIn: "1h" });

    return response.json({
      user: user[0].ID,
      token: bearerToken,
    })
  }
}