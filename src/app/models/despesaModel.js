const connection = require('../../database/index')

module.exports = {
  getDespesa(despesaId) {
  	return new Promise((resolve, reject) => {
			const sql = `SELECT * FROM DESPESA WHERE ID = ${despesaId}`
      connection.query(sql, function(error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
			})
    })
  },

  insertDespesa(body) {
    
  	return new Promise((resolve, reject) => {
			const sql = `insert into despesa values (${body.id}, ${body.email})`
      connection.query(sql, function(error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
			})
    })
  }
}