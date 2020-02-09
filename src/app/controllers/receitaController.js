const ReceitaModel = require('../models/receitaModel')	

module.exports = {
  getReceita(request, response) {   
     
    ReceitaModel.getReceita(request.params.id).then(result => {
      return response.json(result)
    })
  },

  insertReceita(request, response){
     ReceitaModel.insertReceita(resquest.body).then(result => {
      return response.json(result)
     })
  },

  updateReceita(request, response){
    ReceitaModel.updateReceita(resquest.body).then(result => {
     return response.json(result)
    })
  },

 deleteReceita(request, response){
  ReceitaModel.deleteReceita(resquest.body).then(result => {
   return response.json(result)
  })
 }
}