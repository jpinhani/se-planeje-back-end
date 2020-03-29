const VisionModel = require('../models/visaoModel')

module.exports = {
  getVision(request, response) {
    VisionModel.getVision(request.params.id).then(result => {
      return response.json(result)
    })
  },

  getVisionBySimilarName(request, response) {
    VisionModel.getVisionBySimilarName(
      request.params.id,
      request.params.name
    ).then(result => {
      return response.json(result)
    })
  },

  insertVision(request, response) {
    console.log('ENTROU')
    VisionModel.insertVision(request.body).then(result => {
      return response.json(result)
    })
  },

  updateVision(request, response) {
    VisionModel.updateVision(request.body).then(result => {
      return response.json(result)
    })
  },

  deleteVision(request, response) {
    VisionModel.deleteVision(request.params.id).then(result => {
      return response.json(result)
    })
  }
}