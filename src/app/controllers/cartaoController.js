const CartaoModel = require('../models/cartaoModel')

module.exports = {
  getCartaoAll(request, response) {
    CartaoModel.getCartaoAll(request.params.id).then(result => {
      return response.json(result)
    })
  },


  getCartao(request, response) {
    CartaoModel.getCartao(request.params.iduser, request.params.id).then(result => {
      return response.json(result)
    })
  },

  insertCartao(request, response) {
    request.body.cartao = request.body.cartao
    CartaoModel.insertCartao(request.body).then(result => {
      return response.json(result)
    })
  },

  updateCartao(request, response) {
    request.body.id = request.params.id
    CartaoModel.updateCartao(request.body).then(result => {
      return response.json(result)
    })
  },

  deleteCartao(request, response) {
    request.body.id = request.params.id
    CartaoModel.deleteCartao(request.body).then(result => {
      return response.json(result)
    })
  }
}