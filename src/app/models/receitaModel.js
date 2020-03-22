const connection = require('../../database/index')

module.exports = {

  getCategory(idUser) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT
                       * FROM CATEGORIA A
                        WHERE A.ID_USER = '${idUser}'
                          AND A.ENTRADA = 0`
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
                                LEFT OUTER JOIN CARTAO C ON (A.ID_CARTAO = C.ID)
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
  }
}