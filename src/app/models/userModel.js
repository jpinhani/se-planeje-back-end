const connection = require('../../database/index')

module.exports = {

  getUser(userId) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM USER WHERE ID = ${userId}`
      connection.getConnection((error, conn) => {
        conn.query(sql, (error, result) => {
          conn.release();
          (error) ? reject(error) : resolve(result)
        });
      });
    });
  },


  getUserByEmail(email, password) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT 
                       * FROM USER 
                             WHERE EMAIL = '${email}'
                               AND PASSWORD = md5('${password}')`

      connection.getConnection((error, conn) => {
        conn.query(sql, function (error, result) {
          conn.release();
          error ? reject(error) : resolve(result)
        });
      });
    })
  },


}