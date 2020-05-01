const connection = require('../../database/index')

module.exports = {

  getCategory(idUser) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT
                       * FROM CATEGORIA A
                        WHERE A.ID_USER = '${idUser}'
                          AND A.ENTRADA = 0
                          AND A.TIPO = 2`
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  getReceitaAll(idUser) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT 
                      A.ID,
                      A.ID_GRUPO,
                      A.ID_USER,
                      A.ID_CATEGORIA,
                      B.DESCR_CATEGORIA,
                      A.DESCR_RECEITA,
                      A.NUM_PARCELA,
                      A.VL_PREVISTO,
                      A.DT_PREVISTO,
                      A.STATUS 
                            FROM RECEITA A
                                LEFT OUTER JOIN CATEGORIA B ON (A.ID_CATEGORIA = B.ID)
                            WHERE A.STATUS IN ('Esperando Pagamento') 
                              and A.ID_USER = ${idUser}`
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  insertReceita(body) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO RECEITA VALUES 
                                    ( null,
                                     '${body.idGrupo}',
                                     '${body.idUser}',
                                     '${body.categoria}',
                                       null,
                                     '${body.descrReceita}', 
                                     '${body.parcela}',
                                       null,
                                       null,
                                     '${body.valorPrevisto}',
                                     '${body.dataPrevista}',
                                     '${body.status}')`
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  updateReceita(body) {

    return new Promise((resolve, reject) => {
      const sql = `UPDATE RECEITA SET
                               ID_CATEGORIA = '${body.categoria}',
                              DESCR_RECEITA = '${body.descrReceita}',
                                VL_PREVISTO = '${body.valorPrevisto}',
                                DT_PREVISTO = '${body.dataPrevista}'
                                  WHERE ID='${body.id}' AND ID_USER = '${body.idUser}'`
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  selectReceitaGroup(body) {

    return new Promise((resolve, reject) => {
      const sql = `SELECT 
                      COUNT(*) registros FROM RECEITA A 
                             WHERE A.ID_GRUPO = '${body.idGrupo}'
                               AND A.ID_USER = '${body.idUser}'
                               AND A.NUM_PARCELA >= '${body.parcela}'
                               AND A.STATUS IN ('Esperando Pagamento')`
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  deleteReceitaGroup(body) {

    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM RECEITA 
                              WHERE ID_GRUPO = '${body.idGrupo}'
                                AND ID_USER = '${body.idUser}'
                                AND NUM_PARCELA >= '${body.parcela}'
                                AND STATUS IN ('Esperando Pagamento')`
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve('ok')
      })
    })
  },

  deleteReceita(body) {

    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM RECEITA WHERE ID='${body.id}'`
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  pagarReceitaMeta(body) {

    return new Promise((resolve, reject) => {
      const sql = `UPDATE RECEITA 
                              SET ID_CONTA =  ${body.idConta},
                                  DESCR_RECEITA = '${body.descrDespesa}',
                                  VL_REAL = '${body.valorReal}',
                                  DT_REAL = '${body.dataReal}',
                                  STATUS = '${body.status}'
                                     WHERE ID='${body.id}'
                                       AND ID_USER = '${body.idUser}'`
      console.log(sql)
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  pagarReceitaMetaAmortizacao(body) {

    return new Promise((resolve, reject) => {
      const sql1 = `INSERT INTO RECEITA VALUES 
                                    ( null,
                                     '${body.idGrupo}',
                                     '${body.idUser}',
                                      ${body.categoria},
                                      ${body.idConta},
                                     '${body.descrDespesa}', 
                                     '${body.parcela}',
                                     '${body.valorReal}',
                                     '${body.dataReal}',
                                     '${body.valorReal}',
                                     '${body.dataPrevista}',
                                     '${body.status}')`


      const sql2 = `UPDATE RECEITA 
                              SET VL_PREVISTO = '${body.novoPrevisto}'
                                     WHERE ID='${body.id}'
                                       AND ID_USER = '${body.idUser}'`
      console.log(sql1)
      console.log(sql2)
      connection.query(sql1, function (error) {
        if (error) {
          reject(error)
        } else {
          connection.query(sql2, function (error, result) {
            if (error)
              reject(error)
            resolve(result)
          })
        }
      })
    })
  },
  getReceitaAllPaga(idUser) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT 
                        A.ID,
                        A.ID_GRUPO,
                        A.ID_USER,
                        A.ID_CATEGORIA,
                        A.ID_CONTA,
                        D.DESCR_CONTA,
                        B.DESCR_CATEGORIA,
                        A.DESCR_RECEITA,
                        A.NUM_PARCELA,
                        A.VL_PREVISTO,
                        A.VL_REAL,
                        A.DT_PREVISTO,
                        A.DT_REAL,
                        A.STATUS 
                              FROM DESPESA A
                                  LEFT OUTER JOIN CATEGORIA B ON (A.ID_CATEGORIA = B.ID AND A.ID_USER = B.ID_USER)
                                  LEFT OUTER JOIN CONTA D ON (A.ID_CONTA = D.ID AND A.ID_USER = D.ID_USER)
                              WHERE A.STATUS IN ('Pagamento Realizado')
                              AND A.ID_USER = ${idUser}`
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  insertReceitaReal(body) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO RECEITA VALUES 
                                    ( null,
                                     '${body.idGrupo}',
                                     '${body.idUser}',
                                      ${body.categoria},
                                      ${body.conta},
                                     '${body.descrDespesa}', 
                                     '${body.parcela}',
                                     '${body.valorReal}',
                                     '${body.dataReal}',
                                      null,
                                      null,
                                     '${body.status}')`
      console.log(sql)
      connection.query(sql, function (error, result) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  updateReceitaReal(body) {

    return new Promise((resolve, reject) => {

      const cont = `SELECT
                    COUNT(ID) AS QTD,
                    VL_PREVISTO AS META FROM RECEITA
                       WHERE  ID_USER = '${body.idUser}'
                       AND ID_GRUPO = '${body.idGrupo}'
                       AND DT_PREVISTO = '${body.dataPrevista}'
                       AND STATUS IN ('Esperando Pagamento')`

      const sql = `UPDATE RECEITA SET
                               ID_CATEGORIA =  ${body.categoria},
                                   ID_CONTA =  ${body.conta},
                              DESCR_RECEITA = '${body.descrDespesa}',
                                    VL_REAL = '${body.valorReal}',
                                    DT_REAL = '${body.dataReal}',
                                     STATUS = '${body.status}'
                                  WHERE ID='${body.id}' AND ID_USER = '${body.idUser}'`
      console.log(cont)
      connection.query(cont, function (error, result, fields) {
        if (error) {
          reject(error)
        } else if (result[0].QTD > 0 && result[0].META + (body.valorCorrigir) > 0) {
          const sql2 = `UPDATE RECEITA SET
                                    ID_CATEGORIA =  ${body.categoria},
                                        ID_CONTA =  ${body.conta},
                                  DESCR_RECEITA = '${body.descrDespesa}',
                                        VL_REAL = '${body.valorReal}',
                                        VL_PREVISTO = '${body.valorReal}',
                                        DT_REAL = '${body.dataReal}',
                                          STATUS = '${body.status}'
                                      WHERE ID='${body.id}' AND ID_USER = '${body.idUser}'`

          const amort2 = `UPDATE RECEITA SET
                                  VL_PREVISTO = VL_PREVISTO + (${body.valorCorrigir})
                                      WHERE 
                                         ID_USER = '${body.idUser}'
                                        AND ID_GRUPO = '${body.idGrupo}'
                                        AND DT_PREVISTO = '${body.dataPrevista}'
                                        AND STATUS IN ('Esperando Pagamento')`
          connection.query(sql2, function (error) {
            if (error) {
              reject(error)
            } else {
              connection.query(amort2, function (error, result) {
                if (error)
                  reject(error)
                resolve(result)
              })
            }
          })
        } else if (result[0].QTD > 0 && result[0].META + (body.valorCorrigir) <= 0) {
          const sql3 = `UPDATE RECEITA SET
                                      ID_CATEGORIA =  ${body.categoria}, 
                                          ID_CONTA =  ${body.conta},
                                    DESCR_RECEITA = '${body.descrDespesa}',
                                          VL_REAL = '${body.valorReal}',
                                          VL_PREVISTO = VL_PREVISTO + ${result[0].META},
                                          DT_REAL = '${body.dataReal}',
                                            STATUS = '${body.status}'
                                        WHERE ID='${body.id}' AND ID_USER = '${body.idUser}'`

          const amort3 = `DELETE
                                FROM RECEITA
                                  WHERE  ID_USER = '${body.idUser}'
                                  AND ID_GRUPO = '${body.idGrupo}'
                                  AND DT_PREVISTO = '${body.dataPrevista}'
                                  AND STATUS IN ('Esperando Pagamento')`

          connection.query(sql3, function (error) {
            if (error) {
              reject(error)
            } else {
              connection.query(amort3, function (error, result) {
                if (error)
                  reject(error)
                resolve(result)
              })
            }
          })
        }
        else {
          connection.query(sql, function (error, result) {
            if (error)
              reject(error)
            resolve(result)
          })
        }
      })
    })
  }
}