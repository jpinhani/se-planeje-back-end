const CategoriaModel = require('../models/categoriaModel')

module.exports = {

  getCategoriaComboDepencia(request, response) {
    try {
      // console.log('controler')
      CategoriaModel.getCategoriaComboDepencia(request.params.iduser, request.params.tipo, request.params.nivel).then(result => {
        return response.json(result)
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  },

  getCategoriaAll(request, response) {
    try {
      // console.log('controler')
      CategoriaModel.getCategoriaAll(request.params.id).then(result => {
        return response.json(result)
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  },


  getCategoria(request, response) {
    switch (request.params.id.length) {
      // console.log(length(request.params.id))
      case 1:
        CategoriaModel.getCategoriaAll(request.params.iduser).then(result => {
          return response.json(result)
        })
        break;

      default:
        CategoriaModel.getCategoria(request.params.iduser, request.params.id).then(result => {
          return response.json(result)
        })
        break;
    }


  },

  insertCategoria(request, response) {
    try {
      CategoriaModel.insertCategoria(request.body).then(result => {
        return response.json(result)
      })
    } catch (error) {
      return response.status(400).json(error)
    }



  },

  updateCategoria(request, response) {
    CategoriaModel.updateCategoria(request.body).then(result => {
      return response.json(result)
    })
  },

  deleteCategoria(request, response) {
    request.body.id = request.params.id
    CategoriaModel.deleteCategoria(request.body).then(result => {
      return response.json(result)
    })
  }
}