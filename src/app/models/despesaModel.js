const connection = require('../../database/index')

module.exports = {
  getCartao(idUser) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT
                       * FROM CARTAO A
                        WHERE A.ID_USER = '${idUser}'`

      console.log(sql)
      connection.query(sql, function (error, result, fields) {
        // console.log('Resultado esperado:', result[0].Verify)
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
                          AND A.ENTRADA = 0`

      console.log(sql)
      connection.query(sql, function (error, result, fields) {
        // console.log('Resultado esperado:', result[0].Verify)
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
      const sql = `delete  from despesa where ID='${body.despesaId}' and ID_USER = '${body.idUser}')`
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  }
}