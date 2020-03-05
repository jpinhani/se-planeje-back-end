const connection = require('../../database/index')

module.exports = {
  getCategoriaComboDepencia(userID, tipo, nivel) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT
                    A.* FROM CATEGORIA A
                            WHERE A.NIVEL = ${nivel}-1
                              AND A.ID_USER = ${userID}
                              AND A.TIPO = ${tipo}
                              AND A.ENTRADA = 1`
      console.log(sql)
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  getCategoriaAll(userID) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT
                      B.ID IDPAI,
                      B.DESCR_CATEGORIA PAI,
                      A.ID,
                      A.ID_USER,
                      A.DEPENDENCIA,
                      A.DESCR_CATEGORIA,
                      A.NIVEL,
                      CASE WHEN A.TIPO = 1 THEN
                         'DESPESA' 
                           WHEN A.TIPO = 2 THEN
                          'RECEITA' END TIPODESCR,
                      A.TIPO,
                      A.AGREGACAO,
                      CASE WHEN A.ENTRADA = '0' THEN
                       'Conta de Input' 
                           WHEN A.ENTRADA = '1' THEN
                       'Conta de Consolidação' END ENTRADADESCR,
                      A.ENTRADA,
                      A.STATUS FROM CATEGORIA A 
                           LEFT OUTER JOIN CATEGORIA B ON (A.DEPENDENCIA = B.ID)
                           WHERE A.ID_USER = '${userID}'
                            ORDER BY A.DEPENDENCIA`
      console.log(sql)
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  getCategoria(userID, categoriaID) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT
                      B.ID IDPAI,
                      B.DESCR_CATEGORIA PAI,
                      A.ID,
                      A.ID_USER,
                      A.DEPENDENCIA,
                      A.DESCR_CATEGORIA,
                      A.NIVEL,
                      CASE WHEN A.TIPO = 1 THEN
                         'DESPESA' 
                           WHEN A.TIPO = 2 THEN
                          'RECEITA' END TIPODESCR,
                      A.TIPO,
                      A.AGREGACAO,
                      CASE WHEN A.ENTRADA = '0' THEN
                       'Conta de Input' 
                           WHEN A.ENTRADA = '1' THEN
                       'Conta de Consolidação' END ENTRADADESCR,
                      A.ENTRADA,
                      A.STATUS FROM CATEGORIA A 
                           LEFT OUTER JOIN CATEGORIA B ON (A.DEPENDENCIA = B.ID)
                           WHERE A.ID_USER = '${userID}'
                             AND A.DESCR_CATEGORIA LIKE '%${categoriaID}%'
                            ORDER BY A.DEPENDENCIA`
      console.log(sql)
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  insertCategoria(body) {

    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO CATEGORIA
                        VALUES (null, 
                              '${body.idUser}',
                              '${body.dependencia}',
                              '${body.descrCategoria}',
                              '${body.nivel}',
                              '${body.tipo}',
                              '${body.agregacao}',
                              '${body.entrada}',
                              '${body.status}')`
      console.log(sql)
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  updateCategoria(body) {

    return new Promise((resolve, reject) => {
      const sql = `UPDATE CATEGORIA SET
                              DEPENDENCIA = '${body.dependencia}', 
                              DESCR_CATEGORIA = '${body.descrCategoria}', 
                              NIVEL = '${body.nivel}',
                              TIPO = '${body.tipo}',
                              AGREGACAO = '${body.agregacao}',
                              ENTRADA = '${body.entrada}',
                              STATUS ='${body.status}' 
                        WHERE ID='${body.id}'`
      console.log(sql)
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  deleteCategoria(body) {

    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM CATEGORIA WHERE ID='${body.id}'`
      console.log(sql)
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  }
}