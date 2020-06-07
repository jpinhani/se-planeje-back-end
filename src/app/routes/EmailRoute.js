const express = require('express');
const emailModel = require('./../models/EmailModel')
const moment = require('moment');
const router = express.Router()
const nodemailer = require('nodemailer');

const user = 'contato@seplaneje.com';
const pass = 'Brasil123';


async function itensGeral() {
    const itens = await emailModel.ListaDespesa()
    const listaTratada = itens.filter((filtro) =>
        moment(filtro.DT_PREVISTO) >= moment().subtract(2, 'day') &&
        moment(filtro.DT_PREVISTO) <= moment().add(5, 'day') &&
        (filtro.STATUS === 'Esperando Pagamento' || filtro.STATUS === 'Fatura Pendente'))

    return listaTratada
}

function PessoasIdentificadas(itens) {
    let count = 0
    const pessoas = itens.reduce((novo, atual) => {
        if (novo.length === 0) {
            novo[count] = { ID_USER: atual.ID_USER, EMAIL: atual.USUARIO }
            count = count + 1
        } else if (novo.length > 0) {
            if (novo.filter((verifica) => verifica.ID_USER === atual.ID_USER).length === 0) {
                novo[count] = { ID_USER: atual.ID_USER, EMAIL: atual.USUARIO }
                count = count + 1
            }
        }
        return novo
    }, [])
    return pessoas
}

let itens = []
let pessoas = []

function enviar(i) {

    const usuario = pessoas[i];


    if (!usuario)
        return console.log('Acabamos de enviar!');



    var template2 = itens.filter((filtro) =>
        filtro.ID_USER === usuario.ID_USER).map((dados) => {
            return `<ul>
                       <div style={{display:'flex',
                                    flexDirection:'row', 
                                    justifyContent:'space-between'}}>
                          <div><b>Descrição: </b>${dados.DESCR_DESPESA}</div>
                          <div><b>Categoria: </b>${dados.DESCR_CATEGORIA}</div>
                          <div><b>Data Meta: </b>${moment(dados.DT_PREVISTO).format("DD/MM/YYYY")}</div>
                          <div><b>Valor: </b>${dados.VL_PREVISTO.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })}</div>
                       </div>
                    </ul>`
        })

    var template =
        `<div style={{background:'#87CEFA'}}>
        <h1>Olá tudo bem?</h1>
    <p>O SePlaneje esta passando para te avisar das contas que estão próximas de Pagamento! :)</p>
    <p>Dessa maneira você não esquece de nada e não é pego de forma repentina.</p>
    <strong>Essas são as contas que estão próximas para vencerem dentro de 5 dias:</strong>
       ${template2}
       <strong style={{fontSize:'40px', color:'red'}}>
         Se<span style={{fontSize:'20px',color:'white'}}>Planeje</span></strong>
       </div>`

    const transporter = nodemailer.createTransport({
        host: "smtp.umbler.com",
        port: 587,
        auth: { user, pass }
    })

    transporter.sendMail({
        from: user,
        to: usuario.EMAIL,
        replyTo: "joao.inhani@walar.com.br",
        subject: "Seplaneje - Alerta de Conta próxima do Vencimento",
        html: template
    }, function (err) {

        if (err)
            throw err;

        console.log('E-mail para %s enviado!', `${usuario.ID_USER}`);


    })

    enviar(++i);
}

router.get('/send', async (req, res) => {

    itens = await itensGeral();
    pessoas = PessoasIdentificadas(itens);

    enviar(0)
})


module.exports = router