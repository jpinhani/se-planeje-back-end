const pagarmeModel = require('../models/pagarmeModel')
const pagarme = require('pagarme');
const qs = require('querystring');
module.exports = {

    assinatura(request, response) {
        // console.log(request.body)
        try {
            if (request.body.PlanId === 'mensal') {
                request.body.PlanId = 484533
            }
            else if (request.body.PlanId === 'trimestral') {
                request.body.PlanId = 484532
            }
            else if (request.body.PlanId === 'semestral') {
                request.body.PlanId = 484531
            }
            else if (request.body.PlanId === 'anual') {
                request.body.PlanId = 484530
            }

            if (request.body.CustomerSex === '1') {
                request.body.CustomerSex = "Masculino"
            } else {
                request.body.CustomerSex = "Feminino"
            }
            console.log(request.body)
            pagarmeModel.assinatura(request.body).then(result => {
                // console.log('teste', result)
                return response.json({ StatusTransac: result ? 400 : 200 })
            })
        } catch (error) {
            return response.status(400).json(error)
        }
    },

    cancelamento(request, response) {
        try {
            pagarmeModel.cancelamento(request.body).then(result => {
                return response.json(result)
            })
        } catch (error) {
            return response.status(400).json(error)
        }
    },
    notificacoes(request) {

        const apiKey = 'ak_test_MH0vQmPWdS1f3jIvmOKDW8mB6WycrA'
        const verifyBody = qs.stringify(request.body)
        const signature = request.headers['x-hub-signature'].replace('sha1=', '')

        if (!pagarme
            .postback
            .verifySignature(apiKey, verifyBody, signature)
        ) {
            console.log("Invalido")
            // return response.json({ error: 'Invalid Postback' })
        }

        console.log("show", request.body)
        // return response.json({ message: 'postback válido' })

    }

}

