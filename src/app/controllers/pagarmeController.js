const pagarmeModel = require('../models/pagarmeModel')
const pagarme = require('pagarme');
const qs = require('querystring');
module.exports = {

    assinatura(request, response) {
        console.log('passou aqui Controler')
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
            // console.log('passou aqui Controler')
            pagarmeModel.cancelamento(request.body).then(result => {
                return response.json(result)
            })
        } catch (error) {
            return response.status(400).json(error)
        }
    },
    notificacoes(request, response) {

        const apiKey = 'ak_test_MH0vQmPWdS1f3jIvmOKDW8mB6WycrA'
        const verifyBody = qs.stringify(request.body)
        const signature = request.headers['x-hub-signature'].replace('sha1=', '')

        if (!pagarme
            .postback
            .verifySignature(apiKey, verifyBody, signature)
        ) {
            return res.json({ error: 'Invalid Postback' })
        }

        return res.json({ message: 'postback válido' })


    }

}