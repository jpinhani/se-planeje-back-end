const mysql = require('../../database/index')

module.exports = {

    getChartDespesa(userID) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT 
                                A.ID,
                                A.ID_GRUPO,
                                A.ID_USER,
                                A.ID_CATEGORIA,
                                C.DESCR_CATEGORIA,
                                A.ID_CONTA,
                                D.DESCR_CONTA,
                                A.ID_CARTAO,
                                B.CARTAO DESCR_CARTAO,
                                A.DESCR_DESPESA,
                                A.NUM_PARCELA,
                                A.VL_REAL,
                                A.DT_REAL,
                                A.VL_PREVISTO,
                                A.DT_PREVISTO,
                                A.ID_FATURA,
                                A.STATUS,
                                A.DT_CREDITO 
                                   FROM DESPESA A
                                        LEFT OUTER JOIN CARTAO B ON (A.ID_CARTAO = B.ID AND
                                                                     A.ID_USER = B.ID_USER)
                                        LEFT OUTER JOIN CATEGORIA C ON (A.ID_CATEGORIA = C.ID AND
                                                                        A.ID_USER = C.ID_USER)
                                        LEFT OUTER JOIN CONTA D ON (A.ID_CONTA = D.ID AND
                                                                    A.ID_USER = D.ID_USER)
                                     WHERE A.ID_USER = '${userID}'`
            mysql.getConnection((error, connection) => {
                connection.query(sql, function (error, result) {
                    connection.release();
                    if (error)
                        reject(error)
                    resolve(result)
                });
            });
        })
    },

    getChartReceita(userID) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT 
                                A.ID,
                                A.ID_GRUPO,
                                A.ID_USER,
                                A.ID_CATEGORIA,
                                C.DESCR_CATEGORIA,
                                A.ID_CONTA,
                                D.DESCR_CONTA,
                                A.DESCR_RECEITA,
                                A.NUM_PARCELA,
                                A.VL_REAL,
                                A.DT_REAL,
                                A.VL_PREVISTO,
                                A.DT_PREVISTO,
                                A.STATUS
                                   FROM RECEITA A
                                        LEFT OUTER JOIN CATEGORIA C ON (A.ID_CATEGORIA = C.ID AND
                                                                        A.ID_USER = C.ID_USER)
                                        LEFT OUTER JOIN CONTA D ON (A.ID_CONTA = D.ID AND
                                                                    A.ID_USER = D.ID_USER)
                                     WHERE A.ID_USER = '${userID}'`
            mysql.getConnection((error, connection) => {
                connection.query(sql, function (error, result) {
                    connection.release();
                    if (error)
                        reject(error)
                    resolve(result)
                });
            })
        })
    }
}