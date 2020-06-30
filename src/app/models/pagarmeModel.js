const pagarme = require('pagarme');
const mysql = require('../../database/index')
const modelUser = require('./userModel')
const nodemailer = require('nodemailer');
const { json } = require('body-parser');


const user = 'contato@seplaneje.com';
const pass = 'Brasil123';

module.exports = {

    async assinatura(body) {

        try {

            await
                pagarme.client.connect({ api_key: 'ak_test_MH0vQmPWdS1f3jIvmOKDW8mB6WycrA' })
                    .then(client => client.subscriptions.create({
                        plan_id: body.PlanId,
                        card_number: body.CardNumber,
                        card_holder_name: body.CardName,
                        card_expiration_date: body.ExpireDate,
                        card_cvv: body.Cvv,
                        postback_url: 'http://seplaneje-com.umbler.net/api/postback',
                        customer: {
                            email: body.CustomerEmail,
                            name: body.CustomerName,
                            document_number: body.CustomerNumber,
                            sex: body.CustomerSex,
                            born_at: body.CustomerBornAt,
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
                            }
                        }

                    })).then(subscription => {
                        console.log(subscription)
                        const bodyTransaction = {
                            idtrans: subscription.id,
                            object: subscription.object,
                            idPlan: subscription.plan.id,
                            amount: subscription.plan.amount,
                            days: subscription.plan.days,
                            namePlan: subscription.plan.name,
                            trialdays: subscription.plan.trial_days,
                            plancreated: subscription.plan.date_created,
                            current_transaction: subscription.current_transaction,
                            payment_method: subscription.payment_method,
                            card_brand: subscription.card_brand,
                            card_last_digits: subscription.card_last_digits,
                            period_start: subscription.current_period_start,
                            periodo_end: subscription.current_period_end,
                            charges: subscription.charges,
                            soft_descriptor: subscription.soft_descriptor,
                            status: subscription.status,
                            date_Created: subscription.date_created,
                            phoneddd: subscription.phone.ddd,
                            phoneNumber: subscription.phone.number,
                            street: subscription.address.street,
                            complementary: subscription.address.complementary,
                            street_number: subscription.address.street_number,
                            neighborhood: subscription.address.neighborhood,
                            city: subscription.address.city,
                            zipcode: subscription.address.zipcode,
                            country: subscription.address.country,
                            document_number: subscription.customer.document_number,
                            document_type: subscription.customer.document_type,
                            name: subscription.customer.name,
                            email: subscription.customer.email,
                            gender: subscription.customer.gender,
                            cardid: subscription.card.id,
                            brand: subscription.card.brand,
                            holder_name: subscription.card.holder_name,
                            first_digits: subscription.card.first_digits,
                            last_digits: subscription.card.last_digits,
                            fingerprint: subscription.card.fingerprint,
                            valid: subscription.card.valid,
                            expiration_date: subscription.card.expiration_date,
                            manage_token: subscription.manage_token,
                            manage_url: subscription.manage_url
                        }

                        return new Promise((resolve, reject) => {
                            const sql = `INSERT
                                                INTO TRANSACAO
                                                        VALUES(  
                                                               null,
                                                              '${bodyTransaction.idtrans}',
                                                              '${bodyTransaction.object}',
                                                              '${bodyTransaction.idPlan}',
                                                              '${bodyTransaction.amount}',          
                                                              '${bodyTransaction.days}',          
                                                              '${bodyTransaction.namePlan}',                
                                                              '${bodyTransaction.trialdays}',
                                                              '${bodyTransaction.plancreated}',
                                                              '${bodyTransaction.current_transaction}',
                                                              '${bodyTransaction.payment_method}',
                                                              '${bodyTransaction.card_brand}',
                                                              '${bodyTransaction.card_last_digits}',          
                                                              '${bodyTransaction.period_start}',          
                                                              '${bodyTransaction.periodo_end}',                
                                                              '${bodyTransaction.charges}',
                                                              '${bodyTransaction.soft_descriptor}',
                                                              '${bodyTransaction.status}',
                                                              '${bodyTransaction.date_Created}',
                                                              '${bodyTransaction.phoneddd}',          
                                                              '${bodyTransaction.phoneNumber}',          
                                                              '${bodyTransaction.street}',                
                                                              '${bodyTransaction.complementary}',
                                                              '${bodyTransaction.street_number}',                
                                                              '${bodyTransaction.neighborhood}',                
                                                              '${bodyTransaction.city}',                
                                                              '${bodyTransaction.zipcode}',                
                                                              '${bodyTransaction.country}',
                                                              '${bodyTransaction.document_number}',                
                                                              '${bodyTransaction.document_type}',
                                                              '${bodyTransaction.name}',
                                                              '${bodyTransaction.email}',
                                                              '${bodyTransaction.gender}',
                                                              '${bodyTransaction.cardid}',
                                                              '${bodyTransaction.brand}',                
                                                              '${bodyTransaction.holder_name}',  
                                                              '${bodyTransaction.first_digits}',                  
                                                              '${bodyTransaction.last_digits}',                  
                                                              '${bodyTransaction.fingerprint}',   
                                                              '${bodyTransaction.valid}',   
                                                              '${bodyTransaction.expiration_date}',                   
                                                              '${bodyTransaction.manage_token}',
                                                              '${bodyTransaction.manage_url}')`

                            console.log(sql)
                            mysql.getConnection((error, connection) => {
                                connection.query(sql, function (error, result) {
                                    connection.release();
                                    if (error)
                                        reject(error)

                                    const ID = '_' + Math.random().toString(36).substr(2, 9)
                                    modelUser.NewUser(bodyTransaction.email, ID).then(result => {

                                        if (error)
                                            reject(error)



                                        var template =
                                            `<div>
                                                        <h1>Olá tudo bem?</h1>
                                                    <p>Estamos muito felizes de você ter dado um passo para seu Planejamento Financeiro! :)</p>
                                                    <p>Queremos que sua experiência conosco seja à melhor possivel, dessa forma sempre que 
                                                    não conseguir resolver seus problemas no site ou aplicativo pode nos procurar no email
                                                    contato@seplaneje.com, iremos te atender o quanto antes.</p>

                                                    <strong>Para seu primeiro acesso, utilize as seguintes credenciais</strong>
                                                    <p><strong>Usuário:</strong>${bodyTransaction.email}</p>
                                                    <p><strong>Senha:</strong>${ID}</p>
        
                                            </div>`

                                        const transporter = nodemailer.createTransport({
                                            host: "smtp.umbler.com",
                                            port: 587,
                                            auth: { user, pass }
                                        })

                                        transporter.sendMail({
                                            from: user,
                                            to: bodyTransaction.email,
                                            replyTo: "contato@seplaneje.com",
                                            subject: "Seplaneje - Credenciais para Acesso ao seu planejamento",
                                            html: template
                                        }, function (err) {

                                            if (err)
                                                throw err;

                                            console.log('E-mail enviado para!', `${bodyTransaction.email}`);


                                        })
                                        if (error)
                                            reject(error)

                                        resolve(result)
                                    })

                                });
                            });

                        })

                    })

        } catch (e) {
            return e.response.status
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
    },

    notificacao(body) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT
                                 INTO TRANSACAOPOSTBACK
                                         VALUES(  
                                              null,
                                                    '${body.id}',
                                                    '${body.fingerprint}',
                                                    '${body.event}',          
                                                    '${body.old_status}',          
                                                    '${body.current_status}',          
                                                    '${body.object}'  
                                                     )`
            console.log('sql', sql)
            mysql.getConnection((error, connection) => {
                connection.query(sql, function (error, result) {
                    connection.release();
                    if (error)
                        reject(error, { JBI: "Error" })

                    resolve("ok")
                });
            });

        })

    },

    async AtualizaAssinatura(body) {

        try {

            pagarme.client.connect({ api_key: 'ak_test_MH0vQmPWdS1f3jIvmOKDW8mB6WycrA' })
                .then(client => client.subscriptions.find({ id: body.id }))
                .then(subscription => {

                    console.log(subscription)
                    const bodyTransaction = {
                        idtrans: subscription.id,
                        object: subscription.object,
                        idPlan: subscription.plan.id,
                        amount: subscription.plan.amount,
                        days: subscription.plan.days,
                        namePlan: subscription.plan.name,
                        trialdays: subscription.plan.trial_days,
                        plancreated: subscription.plan.date_created,
                        current_transaction: subscription.current_transaction,
                        payment_method: subscription.payment_method,
                        card_brand: subscription.card_brand,
                        card_last_digits: subscription.card_last_digits,
                        period_start: subscription.current_period_start,
                        periodo_end: subscription.current_period_end,
                        charges: subscription.charges,
                        soft_descriptor: subscription.soft_descriptor,
                        status: subscription.status,
                        date_Created: subscription.date_created,
                        phoneddd: subscription.phone.ddd,
                        phoneNumber: subscription.phone.number,
                        street: subscription.address.street,
                        complementary: subscription.address.complementary,
                        street_number: subscription.address.street_number,
                        neighborhood: subscription.address.neighborhood,
                        city: subscription.address.city,
                        zipcode: subscription.address.zipcode,
                        country: subscription.address.country,
                        document_number: subscription.customer.document_number,
                        document_type: subscription.customer.document_type,
                        name: subscription.customer.name,
                        email: subscription.customer.email,
                        gender: subscription.customer.gender,
                        cardid: subscription.card.id,
                        brand: subscription.card.brand,
                        holder_name: subscription.card.holder_name,
                        first_digits: subscription.card.first_digits,
                        last_digits: subscription.card.last_digits,
                        fingerprint: subscription.card.fingerprint,
                        valid: subscription.card.valid,
                        expiration_date: subscription.card.expiration_date,
                        manage_token: subscription.manage_token,
                        manage_url: subscription.manage_url
                    }


                    const sql = `INSERT
                                                INTO TRANSACAOPOST
                                                        VALUES(  
                                                               null,
                                                              '${bodyTransaction.idtrans}',
                                                              '${bodyTransaction.object}',
                                                              '${bodyTransaction.idPlan}',
                                                              '${bodyTransaction.amount}',          
                                                              '${bodyTransaction.days}',          
                                                              '${bodyTransaction.namePlan}',                
                                                              '${bodyTransaction.trialdays}',
                                                              '${bodyTransaction.plancreated}',
                                                              '${bodyTransaction.current_transaction}',
                                                              '${bodyTransaction.payment_method}',
                                                              '${bodyTransaction.card_brand}',
                                                              '${bodyTransaction.card_last_digits}',          
                                                              '${bodyTransaction.period_start}',          
                                                              '${bodyTransaction.periodo_end}',                
                                                              '${bodyTransaction.charges}',
                                                              '${bodyTransaction.soft_descriptor}',
                                                              '${bodyTransaction.status}',
                                                              '${bodyTransaction.date_Created}',
                                                              '${bodyTransaction.phoneddd}',          
                                                              '${bodyTransaction.phoneNumber}',          
                                                              '${bodyTransaction.street}',                
                                                              '${bodyTransaction.complementary}',
                                                              '${bodyTransaction.street_number}',                
                                                              '${bodyTransaction.neighborhood}',                
                                                              '${bodyTransaction.city}',                
                                                              '${bodyTransaction.zipcode}',                
                                                              '${bodyTransaction.country}',
                                                              '${bodyTransaction.document_number}',                
                                                              '${bodyTransaction.document_type}',
                                                              '${bodyTransaction.name}',
                                                              '${bodyTransaction.email}',
                                                              '${bodyTransaction.gender}',
                                                              '${bodyTransaction.cardid}',
                                                              '${bodyTransaction.brand}',                
                                                              '${bodyTransaction.holder_name}',  
                                                              '${bodyTransaction.first_digits}',                  
                                                              '${bodyTransaction.last_digits}',                  
                                                              '${bodyTransaction.fingerprint}',   
                                                              '${bodyTransaction.valid}',   
                                                              '${bodyTransaction.expiration_date}',                   
                                                              '${bodyTransaction.manage_token}',
                                                              '${bodyTransaction.manage_url}')`


                    mysql.getConnection((error, connection) => {
                        connection.query(sql, function (error, result) {
                            connection.release();
                            if (error)
                                return (error, { JBI: "Error" })

                            return ("ok")
                        });
                    });
                })

        } catch (e) {
            // return e.response
            console.log(e.response)
        }
    }
}