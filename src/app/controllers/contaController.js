const ContaModel = require('../models/contaModel')

module.exports = {

  getContaAll(request, response) {
    try {
      console.log('controler')
      ContaModel.getContaAll(request.params.id).then(result => {
        return response.json(result)
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  },


  getConta(request, response) {
    ContaModel.getConta(request.params.iduser, request.params.id).then(result => {
      return response.json(result)
    })
  },

  insertConta(request, response) {
    try {
      ContaModel.insertConta(request.body).then(result => {
        return response.json(result)
      })
    } catch (error) {
      return response.status(400).json(error)
    }



  },

  updateConta(request, response) {
    ContaModel.updateConta(request.body).then(result => {
      return response.json(result)
    })
  },

  deleteConta(request, response) {
    request.body.id = request.params.id
    ContaModel.deleteConta(request.body).then(result => {
      return response.json(result)
    })
  }
}