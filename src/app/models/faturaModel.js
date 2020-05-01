const connection = require('../../database/index')

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
      console.log(sql)
      connection.query(sql, function (error, result) {
        if (error)
          reject(error)
        resolve(result)
      })
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
      console.log(sql)
      connection.query(sql, function (error, result) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  }
}