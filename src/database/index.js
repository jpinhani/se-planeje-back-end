require("dotenv").config();
const mysql = require('mysql');


module.exports = mysql.createPool({
  host: process.env.SP_HOST,
  port: process.env.SP_PORT,
  user: process.env.SP_USER,
  password: process.env.SP_PSW,
  database: process.env.SP_DATABASE
})
