const pagarmeModel = require('../models/pagarmeModel')
const pagarme = require('pagarme');
const qs = require('querystring');



module.exports = {

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

            const bodyTransaction = {
                idtrans: response.id,
                object: response.object,
                idPlan: response.plan.id,
                amount: response.plan.amount,
                days: response.plan.days,
                namePlan: response.plan.name,
                trialdays: response.plan.trial_days,
                plancreated: response.plan.date_created,
                current_transaction: response.current_transaction,
                payment_method: response.payment_method,
                card_brand: response.card_brand,
                card_last_digits: response.card_last_digits,
                period_start: response.current_period_start,
                periodo_end: response.current_period_end,
                charges: response.charges,
                soft_descriptor: response.soft_descriptor,
                status: response.status,
                date_Created: response.date_created,
                phoneddd: response.phone.ddd,
                phoneNumber: response.phone.number,
                street: response.address.street,
                complementary: response.address.complementary,
                street_number: response.address.street_number,
                neighborhood: response.address.neighborhood,
                city: response.address.city,
                zipcode: response.address.zipcode,
                country: response.address.country,
                document_number: response.customer.document_number,
                document_type: response.customer.document_type,
                name: response.customer.name,
                email: response.customer.email,
                gender: response.customer.gender,
                cardid: response.card.id,
                brand: response.card.brand,
                holder_name: response.card.holder_name,
                first_digits: response.card.first_digits,
                last_digits: response.card.last_digits,
                fingerprint: response.card.fingerprint,
                valid: response.card.valid,
                expiration_date: response.card.expiration_date,
                manage_token: response.manage_token,
                manage_url: response.manage_url
            }

            const teste = await pagarmeModel.notificacao(bodyTransaction)

            return response.status(teste === "ok" ? 200 : 400).end()
        } catch (error) {
            return response.status(400).json(error)
        }

    }

}

