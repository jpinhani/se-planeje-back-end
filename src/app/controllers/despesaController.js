const DespesaModel = require('../models/despesaModel')	

module.exports = {
  getDespesa(request, response) {   
     
    DespesaModel.getDespesa(request.params.id).then(result => {
      return response.json(result)
    })
  },

  insertDespesa(request, response){
     DespesaModel.insertDespesa(resquest.body).then(result => {
      return response.json(result)
     })
  },

  updateDespesa(request, response){
    DespesaModel.updateDespesa(resquest.body).then(result => {
     return response.json(result)
    })
  },

 deleteDespesa(request, response){
  DespesaModel.deleteDespesa(resquest.body).then(result => {
   return response.json(result)
  })
 }
}