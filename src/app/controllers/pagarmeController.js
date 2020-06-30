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

            // var texto = ;

            var objeto = JSON.parse(request.body);

            const bodyTransaction = {
                idtrans: objeto.id,
                object: objeto.object,
                idPlan: objeto.plan.id,
                amount: objeto.plan.amount,
                days: objeto.plan.days,
                namePlan: objeto.plan.name,
                trialdays: objeto.plan.trial_days,
                plancreated: objeto.plan.date_created,
                current_transaction: objeto.current_transaction,
                payment_method: objeto.payment_method,
                card_brand: objeto.card_brand,
                card_last_digits: objeto.card_last_digits,
                period_start: objeto.current_period_start,
                periodo_end: objeto.current_period_end,
                charges: objeto.charges,
                soft_descriptor: objeto.soft_descriptor,
                status: objeto.status,
                date_Created: objeto.date_created,
                phoneddd: objeto.phone.ddd,
                phoneNumber: objeto.phone.number,
                street: objeto.address.street,
                complementary: objeto.address.complementary,
                street_number: objeto.address.street_number,
                neighborhood: objeto.address.neighborhood,
                city: objeto.address.city,
                zipcode: objeto.address.zipcode,
                country: objeto.address.country,
                document_number: objeto.customer.document_number,
                document_type: objeto.customer.document_type,
                name: objeto.customer.name,
                email: objeto.customer.email,
                gender: objeto.customer.gender,
                cardid: objeto.card.id,
                brand: objeto.card.brand,
                holder_name: objeto.card.holder_name,
                first_digits: objeto.card.first_digits,
                last_digits: objeto.card.last_digits,
                fingerprint: objeto.card.fingerprint,
                valid: objeto.card.valid,
                expiration_date: objeto.card.expiration_date,
                manage_token: objeto.manage_token,
                manage_url: objeto.manage_url
            }

            console.log('bodyTransactionbodyTransactionbodyTransactionbodyTransactionbodyTransactionbodyTransactionbodyTransaction', bodyTransaction)
            const teste = await pagarmeModel.notificacao(bodyTransaction)

            return response.status(teste === "ok" ? 200 : 400).end()
        } catch (error) {
            return response.status(400).json(error)
        }

    }

}

