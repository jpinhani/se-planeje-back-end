const pagarme = require('pagarme');
// const mysql = require('../../database/index')

module.exports = {

    async assinatura(body) {
        console.log('passou aqui Model')
        try {
            await
                pagarme.client.connect({ api_key: 'ak_test_MH0vQmPWdS1f3jIvmOKDW8mB6WycrA' })
                    .then(client => client.subscriptions.create({
                        plan_id: 1337,
                        card_number: '4111111111111111',
                        card_holder_name: 'abc',
                        card_expiration_date: '1225',
                        card_cvv: '123',
                        customer: {
                            email: 'someone@somewhere.com',
                            document_number: '30621143049'
                        }
                    }))

        } catch (e) {
            console.log('catch', e.response)
        }
    },

    async cancelamento(body) {
        console.log('passou aqui Model')
        try {
            await
                pagarme.client.connect({ api_key: 'ak_test_MH0vQmPWdS1f3jIvmOKDW8mB6WycrA' })
                    .then(client => client.transactions.refund({
                        id: 8641656
                    })).then(transaction => console.log(transaction))
        } catch (e) {
            console.log(e.response)
        }
    }
}