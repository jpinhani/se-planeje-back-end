const mysql = require('../../database/index')

module.exports = {

  getVision(user) {
    return new Promise((resolve, reject) => {
      const SQL = `SELECT * FROM VISAO WHERE ID_USER = '${user}' ORDER BY DT_INICIO`

      mysql.getConnection((error, connection) => {
        connection.query(SQL, function (error, result) {
          connection.release();
          if (error)
            reject(error)
          resolve(result)
        });
      });
    })
  },

  getVisionBySimilarName(user, name) {
    return new Promise((resolve, reject) => {
      const SQL = `
        SELECT * FROM VISAO 
        WHERE ( ID_USER = '${user}' )
        AND   ( VISAO LIKE '%${name}%' )`

      mysql.getConnection((error, connection) => {
        connection.query(SQL, function (error, result) {
          connection.release();
          if (error)
            reject(error)
          resolve(result)
        });
      });
    })
  },

  insertVision(vision) {
    return new Promise((resolve, reject) => {
      const {
        ID_USER,
        VISAO,
        DT_INICIO,
        DT_FIM,
        STATUS
      } = vision

      const SQL = `
        INSERT INTO VISAO
        VALUES
        (
          null,
          ${ID_USER}, 
          '${VISAO}', 
          '${DT_INICIO}', 
          '${DT_FIM}', 
          '${STATUS}'
        )
      `
      mysql.getConnection((error, connection) => {
        connection.query(SQL, function (error, result, fields) {
          connection.release();
          if (error)
            reject(error)
          resolve(result)
        });
      });
    })
  },

  updateVision(vision) {
    const {
      ID,
      ID_USER,
      VISAO,
      DT_INICIO,
      DT_FIM,
      STATUS
    } = vision

    return new Promise((resolve, reject) => {
      const SQL = `
        UPDATE VISAO
        SET 
          ID_USER = '${ID_USER}',
          VISAO = '${VISAO}',
          DT_INICIO = '${DT_INICIO}',
          DT_FIM = '${DT_FIM}',
          STATUS = '${STATUS}'
        WHERE (ID = '${ID}')
      `
      mysql.getConnection((error, connection) => {
        connection.query(SQL, function (error, result, fields) {
          connection.release();
          if (error)
            reject(error)
          resolve(result)
        });
      });
    })
  },

  deleteVision(visionId) {
    return new Promise((resolve, reject) => {
      const SQL = `DELETE FROM VISAO WHERE ID = '${visionId}'`

      mysql.getConnection((error, connection) => {
        connection.query(SQL, function (error, result, fields) {
          connection.release();
          if (error)
            reject(error)
          resolve(result)
        });
      });
    })
  }
}