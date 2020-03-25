const connection = require('../../database/index')

module.exports = {
  getCartao(idUser) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT
                       * FROM CARTAO A
                        WHERE A.ID_USER = '${idUser}'`

      console.log(sql)
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  getCategory(idUser) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT
                       * FROM CATEGORIA A
                        WHERE A.ID_USER = '${idUser}'
                          AND A.ENTRADA = 0
                          AND A.TIPO = 1`
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  getDespesaAll(idUser) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT 
                      A.ID,
                      A.ID_GRUPO,
                      A.ID_USER,
                      A.ID_CATEGORIA,
                      B.DESCR_CATEGORIA,
                      C.CARTAO,
                      A.ID_CARTAO,
                      A.DESCR_DESPESA,
                      A.NUM_PARCELA,
                      A.VL_PREVISTO,
                      A.DT_PREVISTO,
                      A.STATUS 
                            FROM DESPESA A
                                LEFT OUTER JOIN CATEGORIA B ON (A.ID_CATEGORIA = B.ID)
                                LEFT OUTER JOIN CARTAO C ON (A.ID_CARTAO = C.ID)
                            WHERE A.STATUS IN ('Esperando Pagamento','Fatura Pendente') 
                              and A.ID_USER = ${idUser}`
      console.log('sqllll', sql)
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  insertDespesa(body) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO DESPESA VALUES 
                                    ( null,
                                     '${body.idGrupo}',
                                     '${body.idUser}',
                                     '${body.categoria}',
                                       null,
                                     '${body.cartao}',
                                     '${body.descrDespesa}', 
                                     '${body.parcela}',
                                       null,
                                       null,
                                     '${body.valorPrevisto}',
                                     '${body.dataPrevista}',
                                       null,
                                     '${body.status}')`
      console.log(sql)
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  updateDespesa(body) {

    return new Promise((resolve, reject) => {
      const sql = `UPDATE DESPESA SET
                               ID_CATEGORIA = '${body.categoria}',
                                  ID_CARTAO = '${body.cartao}', 
                              DESCR_DESPESA = '${body.descrDespesa}',
                                VL_PREVISTO = '${body.valorPrevisto}',
                                DT_PREVISTO = '${body.dataPrevista}'
                                  WHERE ID='${body.id}' AND ID_USER = '${body.idUser}'`
      console.log(sql)
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  selectDespesaGroup(body) {

    return new Promise((resolve, reject) => {
      const sql = `SELECT 
                      COUNT(*) registros FROM DESPESA A 
                             WHERE A.ID_GRUPO = '${body.idGrupo}'
                               AND A.ID_USER = '${body.idUser}'
                               AND A.NUM_PARCELA >= '${body.parcela}'
                               AND A.STATUS IN ('Esperando Pagamento','Fatura Pendente')`
      console.log(sql)
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  deleteDespesaGroup(body) {

    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM DESPESA 
                              WHERE ID_GRUPO = '${body.idGrupo}'
                                AND ID_USER = '${body.idUser}'
                                AND NUM_PARCELA >= '${body.parcela}'
                                AND STATUS IN ('Esperando Pagamento','Fatura Pendente')`
      console.log(sql)
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve('ok')
      })
    })
  },

  deleteDespesa(body) {

    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM DESPESA WHERE ID='${body.id}'`
      console.log(sql)
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  pagarDespesaMeta(body) {

    return new Promise((resolve, reject) => {
      const sql = `UPDATE DESPESA 
                              SET ID_CONTA = '${body.idConta}',
                                  DESCR_DESPESA = '${body.descrDespesa}',
                                  VL_REAL = '${body.valorReal}',
                                  DT_REAL = '${body.dataReal}',
                                  STATUS = '${body.status}'
                                     WHERE ID='${body.id}'
                                       AND ID_USER = '${body.idUser}'`
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  pagarDespesaMetaAmortizacao(body) {

    return new Promise((resolve, reject) => {
      const sql1 = `INSERT INTO DESPESA VALUES 
                                    ( null,
                                     '${body.idGrupo}',
                                     '${body.idUser}',
                                     '${body.categoria}',
                                       null,
                                     '${body.cartao}',
                                     '${body.descrDespesa}', 
                                     '${body.parcela}',
                                     '${body.valorReal}',
                                     '${body.dataReal}',
                                     '${body.valorReal}',
                                     '${body.dataPrevista}',
                                       null,
                                     '${body.status}')`


      const sql2 = `UPDATE DESPESA 
                              SET VL_PREVISTO = '${body.novoPrevisto}'
                                     WHERE ID='${body.id}'
                                       AND ID_USER = '${body.idUser}'`

      connection.query(sql1, function (error, result, fields) {
        if (error) {
          reject(error)
        } else {
          connection.query(sql2, function (error, result, fields) {
            if (error)
              reject(error)
            resolve(result)
          })
        }
      })
    })
  },
  getDespesaAllPaga(idUser) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT 
                        A.ID,
                        A.ID_GRUPO,
                        A.ID_USER,
                        A.ID_CATEGORIA,
                        A.ID_CONTA,
                        D.DESCR_CONTA,
                        B.DESCR_CATEGORIA,
                        C.CARTAO,
                        A.ID_CARTAO,
                        A.DESCR_DESPESA,
                        A.NUM_PARCELA,
                        A.VL_PREVISTO,
                        A.VL_REAL,
                        A.DT_PREVISTO,
                        A.DT_REAL,
                        A.STATUS 
                              FROM DESPESA A
                                  LEFT OUTER JOIN CATEGORIA B ON (A.ID_CATEGORIA = B.ID)
                                  LEFT OUTER JOIN CARTAO C ON (A.ID_CARTAO = C.ID)
                                  LEFT OUTER JOIN CONTA D ON (A.ID_CONTA = D.ID)
                              WHERE A.STATUS IN ('Pagamento Realizado','Fatura Pronta Para Pagamento')
                              AND A.ID_USER = ${idUser}`
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  getDespesaAllFatura(idUser) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT
                        CONCAT(A.CARTAO,' - ',A.FATURA) AS ID,
                        A.CARTAO,
                        A.FATURA,
                        A.STATUS,
                        SUM(A.VL_REAL) VL_REAL,
                        SUM(A.VL_PREVISTO) VL_PREVISTO,
                        SUM(CASE WHEN A.VL_REAL IS NULL THEN
                          A.VL_PREVISTO
                          ELSE A.VL_REAL END
                      ) VL_FORECAST
                              FROM DETALHE_FATURA A
                                WHERE A.ID_USER = '${idUser}' AND  A.STATUS IN ('Fatura Pendente', 'Fatura Pronta Para Pagamento')
                                GROUP BY 
                                          A.CARTAO,
                                          A.FATURA
                                          ORDER BY 3,2`

      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },
  getDespesaAllFaturaDetalhe(idUser) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT
                      CONCAT(A.CARTAO,' - ',A.FATURA) AS ID,
                      A.ID ID_DESPESA,
                      A.CARTAO,
                      A.DESCR_DESPESA,
                      A.FATURA,
                      VL_PREVISTO,
                      VL_REAL,
                      A.NUM_PARCELA,
                      A.STATUS
                            FROM DETALHE_FATURA A
                              WHERE A.ID_USER = ${idUser}`
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  }

}

