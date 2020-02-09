const express = require('express')
const cors = require('cors')
const userRoute = require('./app/routes/userRoute')
const despesaRoute = require('./app/routes/despesaRoute')
const cartaoRoute = require('./app/routes/cartaoRoute')
const naturezaRoute = require('./app/routes/naturezaRoute')
const app = express()

app.use(cors())
app.use(express.json())

app.use(userRoute)
app.use(despesaRoute)
app.use(cartaoRoute)
app.use(naturezaRoute)

module.exports = app 