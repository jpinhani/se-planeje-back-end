const pagarmeModel = require('../models/pagarmeModel')

module.exports = {

    assinatura(request, response) {
        try {
            console.log('passou aqui Controler')
            pagarmeModel.assinatura(request.body).then(result => {
                return response.json(result)
            })
        } catch (error) {
            return response.status(400).json(error)
        }
    },

    cancelamento(request, response) {
        try {
            console.log('passou aqui Controler')
            pagarmeModel.cancelamento(request.body).then(result => {
                return response.json(result)
            })
        } catch (error) {
            return response.status(400).json(error)
        }
    }

}