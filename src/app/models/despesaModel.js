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
      const sql = ` SELECT 
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
                      A.STATUS,
                     IFNULL(CASE WHEN 
                      ((A.DT_PREVISTO < CAST(CONCAT(YEAR(A.DT_PREVISTO),'-',MONTH(A.DT_PREVISTO),'-',C.DIA_COMPRA) AS DATE))
				          AND (A.DT_PREVISTO IS NOT NULL))
                         THEN
                     CAST(CONCAT(YEAR(A.DT_PREVISTO),'-',MONTH(A.DT_PREVISTO),'-',C.DT_VENCIMENTO) AS DATE)
                         WHEN
                    ((A.DT_PREVISTO >= CAST(CONCAT(YEAR(A.DT_PREVISTO),'-',MONTH(A.DT_PREVISTO),'-',C.DIA_COMPRA) AS DATE))
                         AND (MONTH(A.DT_PREVISTO) < 12)
                         AND (A.DT_PREVISTO IS NOT NULL))
                        THEN
                     CAST(CONCAT(YEAR(A.DT_PREVISTO),'-',(MONTH(A.DT_PREVISTO) + 1),'-',C.DT_VENCIMENTO) AS DATE)
                         WHEN
                    ((A.DT_PREVISTO >= CAST(CONCAT(YEAR(A.DT_PREVISTO),'-',MONTH(A.DT_PREVISTO),'-',C.DIA_COMPRA) AS DATE))
						 AND (MONTH(A.DT_PREVISTO) = 12)
                         AND (A.DT_PREVISTO IS NOT NULL))
                        THEN
                     CAST(CONCAT((YEAR(A.DT_PREVISTO) + 1),'-',1,'-',C.DT_VENCIMENTO) AS DATE)
                     END,A.DT_PREVISTO) AS DT_VISAO
                            FROM DESPESA A
                                LEFT OUTER JOIN CATEGORIA B ON (A.ID_CATEGORIA = B.ID 
															AND A.ID_USER = B.ID_USER)
                                LEFT OUTER JOIN CARTAO C ON (A.ID_CARTAO = C.ID
													     AND A.ID_USER = C.ID_USER )
                            WHERE A.STATUS IN ('Esperando Pagamento','Fatura Pendente') 
                              and A.ID_USER = ${idUser}
                                 ORDER BY A.DT_PREVISTO`
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
                                      ${body.categoria},
                                       null,
                                      ${body.cartao},
                                     '${body.descrDespesa}', 
                                     '${body.parcela}',
                                       null,
                                       null,
                                     '${body.valorPrevisto}',
                                     '${body.dataPrevista}',
                                       null,
                                     '${body.status}',
                                     null)`
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  insertDespesaReal(body) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO DESPESA VALUES 
                                    ( null,
                                     '${body.idGrupo}',
                                     '${body.idUser}',
                                      ${body.categoria},
                                      ${body.conta},
                                      ${body.cartao},
                                     '${body.descrDespesa}', 
                                     '${body.parcela}',
                                     '${body.valorReal}',
                                     '${body.dataReal}',
                                      null,
                                      null,
                                      null,
                                     '${body.status}',
                                     null)`
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
                               ID_CATEGORIA =  ${body.categoria},
                                  ID_CARTAO =  ${body.cartao}, 
                              DESCR_DESPESA = '${body.descrDespesa}',
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

  updateDespesaReal(body) {

    return new Promise((resolve, reject) => {

      const cont = `SELECT
                    COUNT(ID) AS QTD,
                    VL_PREVISTO AS META FROM DESPESA
                       WHERE  ID_USER = '${body.idUser}'
                       AND ID_GRUPO = '${body.idGrupo}'
                       AND DT_PREVISTO = '${body.dataPrevista}'
                       AND STATUS IN ('Esperando Pagamento','Fatura Pendente')`

      const sql = `UPDATE DESPESA SET
                               ID_CATEGORIA =  ${body.categoria},
                                  ID_CARTAO =  ${body.cartao}, 
                                   ID_CONTA =  ${body.conta},
                              DESCR_DESPESA = '${body.descrDespesa}',
                                    VL_REAL = '${body.valorReal}',
                                    DT_REAL = '${body.dataReal}',
                                     STATUS = '${body.status}'
                                  WHERE ID='${body.id}' AND ID_USER = '${body.idUser}'`
      console.log(cont)
      connection.query(cont, function (error, result, fields) {
        if (error) {
          reject(error)
        } else if (result[0].QTD > 0 && result[0].META + (body.valorCorrigir) > 0) {
          const sql2 = `UPDATE DESPESA SET
                                    ID_CATEGORIA =  ${body.categoria},
                                      ID_CARTAO =  ${body.cartao}, 
                                        ID_CONTA =  ${body.conta},
                                  DESCR_DESPESA = '${body.descrDespesa}',
                                        VL_REAL = '${body.valorReal}',
                                        VL_PREVISTO = '${body.valorReal}',
                                        DT_REAL = '${body.dataReal}',
                                          STATUS = '${body.status}'
                                      WHERE ID='${body.id}' AND ID_USER = '${body.idUser}'`

          const amort2 = `UPDATE DESPESA SET
                                  VL_PREVISTO = VL_PREVISTO + (${body.valorCorrigir})
                                      WHERE 
                                         ID_USER = '${body.idUser}'
                                        AND ID_GRUPO = '${body.idGrupo}'
                                        AND DT_PREVISTO = '${body.dataPrevista}'
                                        AND STATUS IN ('Esperando Pagamento','Fatura Pendente')`
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
          const sql3 = `UPDATE DESPESA SET
                                      ID_CATEGORIA =  ${body.categoria},
                                        ID_CARTAO =  ${body.cartao}, 
                                          ID_CONTA =  ${body.conta},
                                    DESCR_DESPESA = '${body.descrDespesa}',
                                          VL_REAL = '${body.valorReal}',
                                          VL_PREVISTO = VL_PREVISTO + ${result[0].META},
                                          DT_REAL = '${body.dataReal}',
                                            STATUS = '${body.status}'
                                        WHERE ID='${body.id}' AND ID_USER = '${body.idUser}'`

          const amort3 = `DELETE
                                FROM DESPESA
                                  WHERE  ID_USER = '${body.idUser}'
                                  AND ID_GRUPO = '${body.idGrupo}'
                                  AND DT_PREVISTO = '${body.dataPrevista}'
                                  AND STATUS IN ('Esperando Pagamento','Fatura Pendente')`

          connection.query(sql3, function (error, result) {
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
  },


  delteDespesaMetaReal(body) {

    return new Promise((resolve, reject) => {

      const cont = `SELECT
                        COUNT(ID) AS QTD FROM DESPESA
                                         WHERE  ID_USER = '${body.idUser}'
                                         AND ID_GRUPO = '${body.idGrupo}'
                                         AND DT_PREVISTO = '${body.dataPrevista}'
                                         AND STATUS IN ('Esperando Pagamento','Fatura Pendente')`
      connection.query(cont, function (error, result) {
        if (error) {
          reject(error)
        } else if (result[0].QTD > 0) {
          const amort1 = `DELETE FROM DESPESA
                                                  WHERE ID='${body.id}' 
                                                    AND ID_USER = '${body.idUser}'`

          const amort2 = `UPDATE DESPESA SET
                                  VL_PREVISTO = VL_PREVISTO + ${body.valorReal}
                                      WHERE 
                                         ID_USER = '${body.idUser}'
                                        AND ID_GRUPO = '${body.idGrupo}'
                                        AND DT_PREVISTO = '${body.dataPrevista}'
                                        AND STATUS IN ('Esperando Pagamento','Fatura Pendente')`

          connection.query(amort1, function (error) {
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
        } else {
          const sql = `UPDATE DESPESA SET
                                    ID_CATEGORIA =  ${body.ID_CATEGORIA},
                                      ID_CARTAO =   ${body.ID_CARTAO}, 
                                        ID_CONTA = null,
                                        VL_REAL =  null,
                                        DT_REAL =  null,
                                          STATUS = '${body.status}'
                                      WHERE ID='${body.id}' AND ID_USER = '${body.idUser}'`
          console.log(sql)
          connection.query(sql, function (error, result, fields) {
            if (error)
              reject(error)
            resolve(result)
          })


        }
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
                              SET ID_CONTA =  ${body.idConta},
                                  ID_CARTAO = ${body.cartao},
                                  DESCR_DESPESA = '${body.descrDespesa}',
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

  pagarDespesaMetaAmortizacao(body) {

    return new Promise((resolve, reject) => {
      const sql1 = `INSERT INTO DESPESA VALUES 
                                    ( null,
                                     '${body.idGrupo}',
                                     '${body.idUser}',
                                      ${body.categoria},
                                      ${body.idConta},
                                      ${body.cartao},
                                     '${body.descrDespesa}', 
                                     '${body.parcela}',
                                     '${body.valorReal}',
                                     '${body.dataReal}',
                                     '${body.valorReal}',
                                     '${body.dataPrevista}',
                                       null,
                                     '${body.status}',
                                     null)`


      const sql2 = `UPDATE DESPESA 
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
                        A.STATUS ,
                         IFNULL(CASE WHEN 
                      ((A.DT_REAL < CAST(CONCAT(YEAR(A.DT_REAL),'-',MONTH(A.DT_REAL),'-',C.DIA_COMPRA) AS DATE))
				          AND (A.DT_REAL IS NOT NULL))
                         THEN
                     CAST(CONCAT(YEAR(A.DT_REAL),'-',MONTH(A.DT_REAL),'-',C.DT_VENCIMENTO) AS DATE)
                         WHEN
                    ((A.DT_REAL >= CAST(CONCAT(YEAR(A.DT_REAL),'-',MONTH(A.DT_REAL),'-',C.DIA_COMPRA) AS DATE))
                         AND (MONTH(A.DT_REAL) < 12)
                         AND (A.DT_REAL IS NOT NULL))
                        THEN
                     CAST(CONCAT(YEAR(A.DT_REAL),'-',(MONTH(A.DT_REAL) + 1),'-',C.DT_VENCIMENTO) AS DATE)
                         WHEN
                    ((A.DT_REAL >= CAST(CONCAT(YEAR(A.DT_REAL),'-',MONTH(A.DT_REAL),'-',C.DIA_COMPRA) AS DATE))
						 AND (MONTH(A.DT_REAL) = 12)
                         AND (A.DT_REAL IS NOT NULL))
                        THEN
                     CAST(CONCAT((YEAR(A.DT_REAL) + 1),'-',1,'-',C.DT_VENCIMENTO) AS DATE)
                     END,A.DT_REAL) AS DT_VISAO
                              FROM DESPESA A
                                  LEFT OUTER JOIN CATEGORIA B ON (A.ID_CATEGORIA = B.ID AND A.ID_USER = B.ID_USER)
                                  LEFT OUTER JOIN CARTAO C ON (A.ID_CARTAO = C.ID AND A.ID_USER = C.ID_USER)
                                  LEFT OUTER JOIN CONTA D ON (A.ID_CONTA = D.ID AND A.ID_USER = D.ID_USER)
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
                              WHERE A.ID_USER = ${idUser} AND  A.STATUS IN('Fatura Pendente', 'Fatura Pronta Para Pagamento')`
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  insertDespesaFatura(body) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE DESPESA D
        SET  D.ID_CONTA = ${body.conta}, 
             D.ID_FATURA = '${body.id}',
             D.STATUS = (CASE 
                          WHEN D.STATUS = 'Fatura Pronta Para Pagamento' THEN
                              'Fatura Paga'
                          WHEN D.STATUS = 'Fatura Pendente' THEN
                              'Fatura Economizada' END),
             D.DT_CREDITO = D.DT_REAL,
             D.DT_REAL = '${body.dataReal}'
        WHERE D.ID IN (
                SELECT
                TEMP.ID
                FROM(
                  SELECT A.ID
					    FROM DETALHE_FATURA A
                              WHERE A.ID_USER = ${body.idUser}  AND  A.STATUS IN('Fatura Pronta Para Pagamento','Fatura Pendente')
                                AND CONCAT(A.CARTAO,' - ',A.FATURA) = '${body.id}') TEMP )`

      console.log(sql)
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },
}

