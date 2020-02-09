const connection = require('../../database/index')

module.exports = {
  getDespesa(cartaoId) {
  	return new Promise((resolve, reject) => {
			const sql = `SELECT * FROM cartao WHERE ID = ${cartaoId}`
      connection.query(sql, function(error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
			})
    })
  },

  insertDespesa(body) {
    
  	return new Promise((resolve, reject) => {
			const sql = `insert into cartao values('${body.idUser}','${body.cartao}', '${body.dtVencimento}','${body.diaCompra}','${body.status})`
      connection.query(sql, function(error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
			})
    })
  },

  updateDespesa(body) {
    
  	return new Promise((resolve, reject) => {
			const sql = `update cartao set CARTAO = '${body.cartao}', DT_VENCIMENTO ='${body.dtVencimento}', DIA_COMPRA ='${body.diaCompra}',ID_NATUREZA ='${body.idNatureza}' where ID='${body.cartaoID}' and ID_USER = '${body.idUser}' )`
      connection.query(sql, function(error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
			})
    })
  },
  
  deleteDespesa(body) {
    
  	return new Promise((resolve, reject) => {
			const sql = `delete  from cartao where ID='${body.cartaoId}' and ID_USER = '${body.idUser}')`
      connection.query(sql, function(error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
			})
    })
  }
}