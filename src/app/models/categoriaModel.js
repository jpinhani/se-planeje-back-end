const connection = require('../../database/index')

module.exports = {
  getCategoriaComboDepencia(userID, tipo, nivel) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT
                      * FROM CATEGORIA A
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
                      B.DESCR_CATEGORIA PAI,
                      A.* FROM CATEGORIA A 
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
                      B.DESCR_CATEGORIA PAI,
                      A.* FROM CATEGORIA A 
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

  insertConta(body) {

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

  updateConta(body) {

    return new Promise((resolve, reject) => {
      const sql = `UPDATE CONTA SET DESCR_CONTA = '${body.descrConta}', STATUS ='${body.status}' where ID='${body.naturezaID}' and ID_USER = '${body.idUser}' )`
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  deleteConta(body) {

    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM CONTA WHERE ID='${body.id}'`
      console.log(sql)
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  }
}