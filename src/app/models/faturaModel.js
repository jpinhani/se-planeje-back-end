const mysql = require('../../database/index')

module.exports = {
  getfaturaAll(userID) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT
                      A.ID_FATURA,
                      right(A.ID_FATURA,10) AS DT_VENCIMENTO,
                      A.DT_REAL AS DT_PAGAMENTO,
                        SUM(A.VL_REAL) AS VL_REAL
                          FROM DESPESA A
                                    WHERE A.STATUS = 'Fatura Paga' AND A.ID_USER = ${userID}
                                      GROUP BY A.ID_FATURA`

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

  getfaturaDetalhe(userID) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT
                    A.ID_FATURA,
                    right(A.ID_FATURA,10) AS DT_VENCIMENTO,
                    A.VL_REAL,
                    A.DT_REAL AS DT_PAGAMENTO,
                    A.DT_CREDITO,
                    A.DESCR_DESPESA
                        FROM DESPESA A
                                  WHERE A.STATUS = 'Fatura Paga' AND A.ID_USER = ${userID}
                                     ORDER BY A.DT_CREDITO`

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

  deleteDespesaFatura(body) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE DESPESA A
        SET  A.ID_CONTA = null, 
             A.ID_FATURA = null,
             A.STATUS = CASE WHEN A.STATUS = 'Fatura Paga' THEN
                         'Fatura Pronta Para Pagamento' ELSE
                         'Fatura Pendente' END,
             A.DT_REAL = A.DT_CREDITO, 
             A.DT_CREDITO = NULL
					WHERE A.ID_FATURA = '${body.id}'
								AND A.ID_USER = ${body.idUser}
                                AND A.STATUS IN ('Fatura Paga','Fatura Economizada')`

      mysql.getConnection((error, connection) => {
        connection.query(sql, function (error, result, fields) {
          connection.release();
          if (error)
            reject(error)
          resolve(result)
        });
      });
    })
  }
}