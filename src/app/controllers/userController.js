const UserModel = require('../models/userModel')	

module.exports = {
  getUser(request, response) {   
     
    UserModel.getUser(request.params.id).then(result => {
      return response.json(result)
    })
  }
}