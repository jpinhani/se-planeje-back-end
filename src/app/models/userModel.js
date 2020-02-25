const connection = require('../../database/index')

module.exports = {
  getUser(userId) {
  	return new Promise((resolve, reject) => {
			const sql = `SELECT * FROM USER WHERE ID = ${userId}`
      connection.query(sql, function(error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
			})
    })
  },

  getUserByEmail(email) {
  	return new Promise((resolve, reject) => {
			const sql = `SELECT * FROM USER WHERE EMAIL = '${email}'`
      connection.query(sql, function(error, result, fields) {
        if (error)
          reject(error)
        resolve(result)
			})
    })
  },
  

}