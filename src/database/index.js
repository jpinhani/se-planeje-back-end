const mysql = require('mysql')

module.exports = mysql.createConnection({
  host: 'mysql669.umbler.com',
  port: 41890,
  user: 'sysplaneje',
  password: 'master123',
  database: 'bdsplan',
  multipleStatements: true
}) 