const CartaoModel = require('../models/cartaoModel')

module.exports = {
  getCartaoAll(request, response) {

    CartaoModel.getCartaoAll(request.body).then(result => {
      return response.json(result)
    })
  },


  getCartao(request, response) {

    CartaoModel.getCartao(request.params.id).then(result => {
      return response.json(result)
    })
  },

  insertCartao(request, response) {
    CartaoModel.insertCartao(resquest.body).then(result => {
      return response.json(result)
    })
  },

  updateCartao(request, response) {
    CartaoModel.updateCartao(resquest.body).then(result => {
      return response.json(result)
    })
  },

  deleteCartao(request, response) {
    CartaoModel.deleteCartao(resquest.body).then(result => {
      return response.json(result)
    })
  }
}