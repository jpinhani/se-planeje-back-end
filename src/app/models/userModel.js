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
      // const sql = `SELECT 
      //                  * FROM USER 
      //                        WHERE EMAIL = '${email}'
      //                          AND (PASSWORD = md5('${password}') OR STATUS = '${password}')`

      const sql = `SELECT
                      C.ID,
                      C.EMAIL,
                      C.PASSWORD,
                      C.STATUS,
                      A.idtrans,
                      CASE WHEN (B.old_status IS NULL AND B.current_status IS NULL) THEN
                              A.status ELSE B.CURRENT_STATUS END PAYSTATUS
                          FROM 
                            USER C,
                            TRANSACAO A
                              LEFT OUTER JOIN TRANSACAOPOSTBACK B ON (A.idtrans = B.idTransacao)
                    WHERE C.EMAIL = A.email 
                        AND C.EMAIL = '${email}' 
                        AND (PASSWORD = md5('${password}') OR STATUS = '${password}')
                      AND (B.id = (SELECT MAX(B1.id) from TRANSACAOPOSTBACK B1
                                            WHERE B.ID = B1.id and
                                                  B.idTransacao = B1.idTransacao) or B.id is null)`

      connection.getConnection((error, conn) => {
        conn.query(sql, function (error, result) {
          conn.release();
          // console.log(error)
          error ? reject(error) : resolve(result)
        });
      });
    })
  },

  NewUser(email, password) {
    console.log(email, password)
    return new Promise((resolve, reject) => {
      const sql = `INSERT 
                           INTO USER VALUES (
                                            null,
                                            '${email}',
                                            md5('${password}'),
                                           '${password}')`

      connection.getConnection((error, conn) => {
        conn.query(sql, function (error, result) {
          conn.release();
          error ? reject(error) : resolve(result)
        });
      });
    })
  }

}