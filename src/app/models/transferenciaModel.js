const mysql = require('../../database/index')

module.exports = {
  getTransferenciaAll(userID) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT 
                       A.ID,
                       A.ID_USER,
                       A.ID_CONTADEBITO,
                       B.DESCR_CONTA CONTA_DEBITO,
                       A.ID_CONTACREDITO,
                       C.DESCR_CONTA CONTA_CREDITO,
                       A.DATA_TRANSFERENCIA,
                       A.VALOR,
                       A.DESCR_TRANSFERENCIA,
                       A.STATUS
                       FROM
                           TRANSFERENCIA A
                                    LEFT OUTER JOIN CONTA B ON (A.ID_USER = B.ID_USER AND
                                                                A.ID_CONTADEBITO = B.ID)
                                    LEFT OUTER JOIN CONTA C ON (A.ID_USER = C.ID_USER AND
                                                                A.ID_CONTACREDITO = C.ID)
                                WHERE A.ID_USER = ${userID}`

      mysql.getConnection((error, connection) => {
        connection.query(sql, function (error, result) {
          connection.release();
          if (error)
            reject(error)
          resolve(result)
        });
      });
    })
  },

  insertTransferencia(body) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT 
                      INTO TRANSFERENCIA
                        VALUES (null,
                               ${body.idUser},
                              '${body.idContaDebito}',
                              '${body.idContaCredito}',
                              '${body.descrTransferencia}',
                              '${body.dataTransferencia}',
                              '${body.valor}',
                              '${body.status}')`
      mysql.getConnection((error, connection) => {
        connection.query(sql, function (error, result) {
          connection.release();
          if (error)
            reject(error)
          resolve(result)
        });
      });
    })
  },

  updateTransferencia(body) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE TRANSFERENCIA SET 
                          ID_CONTADEBITO = '${body.idContaDebito}', 
                          ID_CONTACREDITO = '${body.idContaCredito}', 
                          DESCR_TRANSFERENCIA ='${body.descrTransferencia}',
                          DATA_TRANSFERENCIA ='${body.dataTransferencia}',
                          VALOR ='${body.valor}'
                              WHERE ID = '${body.id}' 
                                AND ID_USER = '${body.idUser}'`
      mysql.getConnection((error, connection) => {
        connection.query(sql, function (error, result) {
          connection.release();
          if (error)
            reject(error)
          resolve(result)
        });
      });
    })
  },

  deleteTransferencia(body) {

    return new Promise((resolve, reject) => {
      const sql = `DELETE  
                      FROM 
                         TRANSFERENCIA 
                             WHERE ID='${body.id}'`
      mysql.getConnection((error, connection) => {
        connection.query(sql, function (error, result, ) {
          connection.release();
          if (error)
            reject(error)
          resolve(result)
        });
      });
    })
  }
}