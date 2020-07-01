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

  vrfyPagamento(idUser) {
    return new Promise((resolve, reject) => {

      const sql = `SELECT
                       * FROM GETUSERGENERAL
                             WHERE ID = ${idUser}`

      connection.getConnection((error, conn) => {
        conn.query(sql, function (error, result) {
          conn.release();
          error ? reject(error) : resolve(result)
        });
      });
    })
  },

  getUserByEmail(email, password) {
    return new Promise((resolve, reject) => {

      const sql = `SELECT
                           * FROM GETUSERGENERAL
                                 WHERE EMAIL = '${email}' 
                                  AND  PASSWORD = md5('${password}')`

      connection.getConnection((error, conn) => {
        conn.query(sql, function (error, result) {
          conn.release();
          error ? reject(error) : resolve(result)
        });
      });
    })
  },

  getUserDetails(idUser) {
    return new Promise((resolve, reject) => {

      const sql = `SELECT
                           * FROM GETUSERGENERAL
                                 WHERE ID = ${idUser}`

      connection.getConnection((error, conn) => {
        conn.query(sql, function (error, result) {
          conn.release();
          error ? reject(error) : resolve(result)
        });
      });
    })
  },


  NewUser(email, password) {

    return new Promise((resolve, reject) => {
      const sql = `INSERT 
                           INTO USER VALUES (
                                            null,
                                            '${email}',
                                            md5('${password}'),
                                           'Ativo')`

      connection.getConnection((error, conn) => {
        conn.query(sql, function (error, result) {
          conn.release();
          error ? reject(error) : resolve(result)
        });
      });
    })
  },
  alterpsw(body) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE USER 
                            SET PASSWORD = md5('${body.password}'),
                                STATUS = 'Ativo'
                                   WHERE  ID = '${body.id}'`
      connection.getConnection((error, conn) => {
        conn.query(sql, (error, result) => {
          conn.release();
          error ? reject(error) : resolve(result)
        });
      });
    });
  },
  CanceledUser(email) {

    return new Promise((resolve, reject) => {
      const sql = `UPDATE 
                         USER SET STATUS = 'Inativo'
                              WHERE EMAIL = '${email}'`

      connection.getConnection((error, conn) => {
        conn.query(sql, function (error, result) {
          conn.release();
          error ? reject(error) : resolve(result)
        });
      });
    })
  }

}