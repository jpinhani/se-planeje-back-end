const connection = require('../../database/index')

module.exports = {
  getNatureza(naturezaId) {
  	return new Promise((resolve, reject) => {
			const sql = `SELECT * FROM natureza WHERE ID = ${naturezaId}`
      connection.query(sql, function(error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
			})
    })
  },

  insertNatureza(body) {
    
  	return new Promise((resolve, reject) => {
			const sql = `insert into natureza values('${body.idUser}','${body.descrNatureza}', '${body.status}')`
      connection.query(sql, function(error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
			})
    })
  },

  updateNatureza(body) {
    
  	return new Promise((resolve, reject) => {
			const sql = `update natureza set DESCR_NATUREZA = '${body.descrNatureza}', STATUS ='${body.status}' where ID='${body.naturezaID}' and ID_USER = '${body.idUser}' )`
      connection.query(sql, function(error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
			})
    })
  },
  
  deleteNatureza(body) {
    
  	return new Promise((resolve, reject) => {
			const sql = `delete  from natureza where ID='${body.naturezaId}' and ID_USER = '${body.idUser}')`
      connection.query(sql, function(error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
			})
    })
  }
}