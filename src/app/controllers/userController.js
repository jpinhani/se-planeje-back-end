const UserModel = require('../models/userModel')
const Moment = require('moment')
const userModel = require('../models/userModel')

module.exports = {
  getUser(request, response) {

    UserModel.getUser(request.params.id).then(result => {
      return response.json(result)
    })
  },
  alterpsw(request, response) {
    userModel.alterpsw(request.body).then(result => {
      return response.json(result)
    })
  },
  getUserDetails(request, response) {
    userModel.getUserDetails(request.params.id).then(result => {
      return response.json(result)
    })
  },
  async envpsw(request, response) {
    const rs = await userModel.envpsw(request.body)
    if (rs.length === 0)
      return response.json('error')

    userModel.envpswmail(rs)
    return response.json('ok')

  }
}