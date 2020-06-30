const CategoriaModel = require('../models/categoriaModel')

module.exports = {

  getCategoriaComboDepencia(request, response) {
    try {
      CategoriaModel.getCategoriaComboDepencia(request.params.iduser, request.params.tipo, request.params.nivel).then(result => {
        return response.json(result)
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  },

  getCategoriaAll(request, response) {
    try {
      CategoriaModel.getCategoriaAll(request.params.id).then(result => {
        return response.json(result)
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  },


  getCategoria(request, response) {
    CategoriaModel.getCategoria(request.params.iduser, request.params.id).then(result => {
      return response.json(result)
    })
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

  insertCategoriaDefault(request, response) {
    try {
      CategoriaModel.insertCategoriaDefault(request.body).then(result => {
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

  async deleteCategoria(request, response) {
    try {

      request.body.id = request.params.id

      const result = await CategoriaModel.getVerifyDependencia(request.params.id)

      if (result[0].NUM > 0)
        return response.json(401)

      CategoriaModel.deleteCategoria(request.body).then(result => {
        return response.json(result)
      })


    } catch (error) {
      return response.status(400).json(error)
    }
  }
}