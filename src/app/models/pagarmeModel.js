const pagarme = require('pagarme');
// const mysql = require('../../database/index')

module.exports = {

    async assinatura(body) {
        console.log('passou aqui Model')
        try {

            await
                pagarme.client.connect({ api_key: 'ak_test_MH0vQmPWdS1f3jIvmOKDW8mB6WycrA' })
                    .then(client => client.subscriptions.create({
                        plan_id: body.PlanId,
                        card_number: body.CardNumber,
                        card_holder_name: body.CardName,
                        card_expiration_date: body.ExpireDate,
                        card_cvv: body.Cvv,
                        customer: {
                            email: body.CustomerEmail,
                            name: body.CustomerName,
                            document_number: body.CustomerNumber,
                            address: {
                                street: body.CustomerAddresStreet,
                                street_number: body.CustomerAddresStreetNumber,
                                complementary: body.CustomerAddresComplementary,
                                neighborhood: body.CustomerAddresNeighborhood,
                                zipcode: body.CustomerAddresZipCode,
                            },
                            phone: {
                                ddd: body.CustomerPhoneDDD,
                                number: body.CustomerPhoneNumber,
                            },
                            sex: body.CustomerSex,
                            born_at: body.CustomerBornAt
                        },
                        postback_url: 'http://seplaneje-com.umbler.net/api/postback'

                    }))/* .then(subscription => console.log(subscription)) */

        } catch (e) {
            console.log('catch', e.response)
        }
    },

    async cancelamento(body) {
        try {
            await
                pagarme.client.connect({ api_key: 'ak_test_MH0vQmPWdS1f3jIvmOKDW8mB6WycrA' })
                    .then(client => client.subscriptions.cancel({ id: body.IdTransaction }))
                    .then(subscription => console.log(subscription))
        } catch (e) {
            console.log(e.response)
        }
    }
}