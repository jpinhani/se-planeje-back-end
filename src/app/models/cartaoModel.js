const connection = require('../../database/index')

module.exports = {
  getCartaoAll(body) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM CARTAO WHERE ID_USER = '2'`
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  getCartao(cartaoId) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM CARTAO WHERE CARTAO LIKE '%${cartaoId}%'`
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  insertCartao(body) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO CARTAO VALUES (null,'${body.idUser}','${body.cartao}', '${body.dtVencimento}','${body.diaCompra}','${body.status}')`
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  updateCartao(body) {

    return new Promise((resolve, reject) => {
      const sql = `UPDATE CARTAO SET CARTAO = '${body.cartao}', DT_VENCIMENTO ='${body.dtVencimento}', DIA_COMPRA ='${body.diaCompra}',ID_NATUREZA ='${body.idNatureza}' where ID='${body.cartaoID}' and ID_USER = '${body.idUser}' )`
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  deleteCartao(body) {

    return new Promise((resolve, reject) => {
      const sql = `delete  from cartao where ID='${body.cartaoId}' and ID_USER = '${body.idUser}')`
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  }
}