const pagarmeModel = require('../models/pagarmeModel')
const pagarme = require('pagarme');
const UserModel = require('./../models/userModel')
const qs = require('querystring');
require("dotenv").config();


module.exports = {

    async UpdateAssinatura(request, response) {
        try {
            if (request.body.PlanId === 'mensal') {
                request.body.PlanId = process.env.SP_PLAN_MENSAL_SEM
            }
            else if (request.body.PlanId === 'trimestral') {
                request.body.PlanId = process.env.SP_PLAN_TRIMESTRAL_SEM
            }
            else if (request.body.PlanId === 'semestral') {
                request.body.PlanId = process.env.SP_PLAN_SEMESTRAL_SEM
            }
            else if (request.body.PlanId === 'anual') {
                request.body.PlanId = process.env.SP_PLAN_ANUAL_SEM
            }

            await pagarmeModel.UpdateAssinatura(request.body)
            const result2 = await pagarmeModel.AtualizaAssinatura(request.body)

            if (result2 === undefined)
                return response.status(200).end()
            return response.status(400).end()

        } catch (error) {
            return response.status(400).json(error)
        }
    },

    async assinatura(request, response) {

        try {

            if (request.body.CustomerSex === '1') {
                request.body.CustomerSex = "Masculino"
            } else {
                request.body.CustomerSex = "Feminino"
            }

            const vrfyEmail = await UserModel.getUserMail(request.body.CustomerEmail)
            request.body.REATIVAR = 0
            if (vrfyEmail.length > 0) {

                if (vrfyEmail[0].STATUS === 'Ativo')
                    return response.json({ message: 'Já Existe Uma Conta', StatusTransac: 401 })

                if (vrfyEmail[0].STATUS === 'Inativo')
                    request.body.REATIVAR = 1;
            }

            if (request.body.PlanId === 'mensal') {
                request.body.REATIVAR === 0 ? request.body.PlanId = process.env.SP_PLAN_MENSAL : request.body.PlanId = process.env.SP_PLAN_MENSAL_SEM
            }
            else if (request.body.PlanId === 'trimestral') {
                request.body.REATIVAR === 0 ? request.body.PlanId = process.env.SP_PLAN_TRIMESTRAL : request.body.PlanId = process.env.SP_PLAN_TRIMESTRAL_SEM
            }
            else if (request.body.PlanId === 'semestral') {
                request.body.REATIVAR === 0 ? request.body.PlanId = process.env.SP_PLAN_SEMESTRAL : request.body.PlanId = process.env.SP_PLAN_SEMESTRAL_SEM
            }
            else if (request.body.PlanId === 'anual') {
                request.body.REATIVAR === 0 ? request.body.PlanId = process.env.SP_PLAN_ANUAL : request.body.PlanId = process.env.SP_PLAN_ANUAL_SEM
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

        const apiKey = process.env.SP_API_KEY;
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
            if (result !== "ok")
                return response.status(400).end()


            const result2 = await pagarmeModel.AtualizaAssinatura(request.body)
            if (result2 === undefined)
                return response.status(200).end()
            return response.status(400).end()

        } catch (error) {

            return response.status(400).json(error)
        }

    }

}

