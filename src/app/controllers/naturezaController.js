const NaturezaModel = require('../models/naturezaModel')	

module.exports = {
  getNatureza(request, response) {   
     
    NaturezaModel.getNatureza(request.params.id).then(result => {
      return response.json(result)
    })
  },

  insertNatureza(request, response){
    try {
      NaturezaModel.insertNatureza(request.body).then(result => {
        return response.json(result)
       })
    } catch (error) {
        return response.status(400).json(error)
    }


    
  },

  updateNatureza(request, response){
    NaturezaModel.updateNatureza(request.body).then(result => {
     return response.json(result)
    })
  },

 deleteNatureza(request, response){
  NaturezaModel.deleteNatureza(request.body).then(result => {
   return response.json(result)
  })
 }
}