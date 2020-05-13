const UserModel = require('../models/userModel')
const Moment = require('moment')

module.exports = {
  getUser(request, response) {

    UserModel.getUser(request.params.id).then(result => {
      return response.json(result)
    })
  }
}