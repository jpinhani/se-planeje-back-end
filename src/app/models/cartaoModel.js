const connection = require('../../database/index')

module.exports = {
  getCartaoAll(userID) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM CARTAO WHERE ID_USER = '${userID}'`
      console.log(sql)
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  getCartao(idUser, cartaoID) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM CARTAO WHERE CARTAO LIKE '%${cartaoID}%'  AND ID_USER='${idUser}'`
      console.log(sql)
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  insertCartao(body) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO CARTAO VALUES (null,${body.idUser},'${body.cartao}', '${body.dtVencimento}','${body.diaCompra}','${body.status}')`
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  updateCartao(body) {

    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE CARTAO SET 
        CARTAO = '${body.cartao}', 
        DT_VENCIMENTO = '${body.dtVencimento}', 
        DIA_COMPRA ='${body.diaCompra}' 
        WHERE ID = '${body.id}' 
        AND ID_USER = '${body.idUser}'
      `

      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  },

  deleteCartao(body) {

    return new Promise((resolve, reject) => {
      const sql = `DELETE  
                      FROM 
                         CARTAO 
                         WHERE ID='${body.id}' 
                  `
      console.log(sql)
      connection.query(sql, function (error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
      })
    })
  }
}