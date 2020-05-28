const mysql = require('../../database/index')

module.exports = {
  getCartaoAll(userID) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM CARTAO WHERE ID_USER = '${userID}'`

      mysql.getConnection((error, connection) => {
        connection.query(sql, function (error, result) {
          connection.release();
          error ? reject(error) : resolve(result)
        });
      });
    })
  },

  insertCartao(body) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO
                         CARTAO VALUES (null,
                                       ${body.idUser},
                                       '${body.cartao}', 
                                       '${body.dtVencimento}',
                                       '${body.diaCompra}',
                                       '${body.status}')`

      mysql.getConnection((error, connection) => {
        connection.query(sql, function (error, result) {
          connection.release();
          (error) ? reject(error) : resolve(result)
        });
      });
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
        AND ID_USER = '${body.idUser}'`

      mysql.getConnection((error, connection) => {
        connection.query(sql, function (error, result) {
          connection.release();
          (error) ? reject(error) : resolve(result)
        });
      });
    })
  },

  deleteCartao(body) {

    return new Promise((resolve, reject) => {
      const sql = `DELETE  
                      FROM 
                         CARTAO 
                         WHERE ID='${body.id}'`
      mysql.getConnection((error, connection) => {
        connection.query(sql, function (error, result) {
          connection.release();
          (error) ? reject(error) : resolve(result)
        });
      });
    })
  }
}