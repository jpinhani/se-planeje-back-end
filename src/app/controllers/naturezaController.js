const NaturezaModel = require('../models/naturezaModel')	

module.exports = {
  getNatureza(request, response) {   
     
    NaturezaModel.getNatureza(request.params.id).then(result => {
      return response.json(result)
    })
  },

  insertNatureza(request, response){
     NaturezaModel.insertNatureza(resquest.body).then(result => {
      return response.json(result)
     })
  },

  updateNatureza(request, response){
    NaturezaModel.updateNatureza(resquest.body).then(result => {
     return response.json(result)
    })
  },

 deleteNatureza(request, response){
  NaturezaModel.deleteNatureza(resquest.body).then(result => {
   return response.json(result)
  })
 }
}