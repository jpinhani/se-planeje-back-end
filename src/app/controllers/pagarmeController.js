const pagarmeModel = require('../models/pagarmeModel')
const pagarme = require('pagarme');
const qs = require('querystring');



module.exports = {

    UpdateAssinatura(request, response) {
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

            const atualizacao = await pagarmeModel.UpdateAssinatura(request.body)
            console.log('atualizacao', atualizacao)
            const result2 = await pagarmeModel.AtualizaAssinatura(request.body)
            // console.log('result2', result2)
            if (result2 === undefined)
                return response.status(200).end()
            return response.status(400).end()

        } catch (error) {
            return response.status(400).json(error)
        }
    },

    assinatura(request, response) {

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

            pagarmeModel.assinatura(request.body).then(result => {

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

    async notificacoes(request, response) {

        const apiKey = 'ak_test_MH0vQmPWdS1f3jIvmOKDW8mB6WycrA'
        const verifyBody = qs.stringify(request.body)

        const signature = request.headers['x-hub-signature'].replace('sha1=', '')


        if (!pagarme
            .postback
            .verifySignature(apiKey, verifyBody, signature)
        ) {

            return response.status(400).end()
        }

        try {

            const result = await pagarmeModel.notificacao(request.body)
            // console.log('result', result)
            if (result !== "ok")
                return response.status(400).end()


            // console.log('foi para o result 2')
            const result2 = await pagarmeModel.AtualizaAssinatura(request.body)
            // console.log('result2', result2)
            if (result2 === undefined)
                return response.status(200).end()
            return response.status(400).end()

        } catch (error) {

            return response.status(400).json(error)
        }

    }

}

