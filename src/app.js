const express = require('express')
const cors = require('cors')
const userRoute = require('./app/routes/userRoute')
const despesaRoute = require('./app/routes/despesaRoute')

const app = express()

app.use(cors())
app.use(express.json())

app.use(userRoute)
app.use(despesaRoute)

module.exports = app 