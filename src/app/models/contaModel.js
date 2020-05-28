const mysql = require('../../database/index')

module.exports = {

  getContaAll(userID) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM CONTA WHERE ID_USER = '${userID}'`
      mysql.getConnection((error, connection) => {
        connection.query(sql, function (error, result, fields) {
          connection.release();
          if (error)
            reject(error)
          resolve(result)
        });
      })
    })
  },

  getConta(idUser, contaID) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM CONTA WHERE DESCR_CONTA LIKE '%${contaID}%'  AND ID_USER='${idUser}'`
      mysql.getConnection((error, connection) => {
        connection.query(sql, function (error, result, fields) {
          connection.release();
          if (error)
            reject(error)
          resolve(result)
        });
      })
    })
  },

  insertConta(body) {

    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO CONTA VALUES (null, '${body.idUser}','${body.descrConta}', '${body.status}')`
      mysql.getConnection((error, connection) => {
        connection.query(sql, function (error, result, fields) {
          connection.release();
          if (error)
            reject(error)
          resolve(result)
        });
      });
    })
  },

  updateConta(body) {

    return new Promise((resolve, reject) => {
      const sql = `UPDATE CONTA 
                       SET DESCR_CONTA = '${body.descrConta}', 
                           STATUS ='${body.status}' 
                           WHERE ID='${body.id}'`
      mysql.getConnection((error, connection) => {
        connection.query(sql, function (error, result, fields) {
          connection.release();
          if (error)
            reject(error)
          resolve(result)
        });
      });
    })
  },

  deleteConta(body) {

    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM CONTA WHERE ID='${body.id}'`
      mysql.getConnection((error, connection) => {
        connection.query(sql, function (error, result, fields) {
          connection.release();
          if (error)
            reject(error)
          resolve(result)
        });
      })
    })
  }
}