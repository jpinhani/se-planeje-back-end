const mysql = require('../../database/index')

module.exports = {
    insertLote(body) {
        return new Promise((resolve, reject) => {
          const sqlDespesa = `UPDATE DESPESA A
                                    SET A.ID_CONTA = ${body.IsCartao === true ? 'null': body.IdCartao},
                                        A.ID_CARTAO = ${body.IsCartao === true ? body.IdCartao: null},
                                        A.VL_REAL = ${body.VlReal},
                                        A.DT_REAL = '${body.DataReal}',
                                        A.STATUS = ${body.IsCartao === true ? `'Fatura Pronta Para Pagamento'`: `'Pagamento Realizado'`}
                                           WHERE ID='${body.Id}' AND ID_USER = '${body.idUser}'`
                                        
          const sqlReceita = `UPDATE RECEITA A
                                    SET A.ID_CONTA = ${body.IdCartao},
                                        A.VL_REAL = ${body.VlReal},
                                        A.DT_REAL = '${body.DataReal}',
                                        A.STATUS =  'Pagamento Realizado'
                                           WHERE ID='${body.Id}' AND ID_USER = '${body.idUser}'`


        console.log(sqlDespesa)
          mysql.getConnection((error, connection) => {
            connection.query(body.Tipo === 'DESPESA' ? sqlDespesa : sqlReceita, function (error, result, fields) {
              connection.release();
              if (error)
                reject(error)
              resolve(result)
            });
          });
        })
      },
}