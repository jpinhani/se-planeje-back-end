const connection = require('../../database/index')

module.exports = {
  getReceita(receitaId) {
  	return new Promise((resolve, reject) => {
			const sql = `SELECT * FROM RECEITA WHERE ID = ${receitaId}`
      connection.query(sql, function(error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
			})
    })
  },

  insertReceita(body) {
    
  	return new Promise((resolve, reject) => {
			const sql = `insert into RECEITA values('${body.idUser}','${body.description}', '${body.numParcela}','${body.status}','${body.idNatureza}','${body.vlReal}','${body.vlPrevisto}','${body.dtInicio}','${body.dtReal}','${body.idConta}')`
      connection.query(sql, function(error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
			})
    })
  },

  updateReceita(body) {
    
  	return new Promise((resolve, reject) => {
			const sql = `update RECEITA set DESCRIPTION = '${body.description}', NUM_PARCELA ='${body.numParcela}', STATUS ='${body.status}',ID_NATUREZA ='${body.idNatureza}',VL_REAL ='${body.vlReal}',VL_PREVISTO ='${body.vlPrevisto}',DT_INICIO ='${body.dtInicio}',DT_REAL ='${body.dtReal}',ID_CONTA ='${body.idConta}' where ID='${body.receitaID}' and ID_USER = '${body.idUser}')`
      connection.query(sql, function(error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
			})
    })
  },
  
  deleteReceita(body) {
    
  	return new Promise((resolve, reject) => {
			const sql = `delete  from RECEITA where ID='${body.receitaId}' and ID_USER = '${body.idUser}')`
      connection.query(sql, function(error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
			})
    })
  }
}