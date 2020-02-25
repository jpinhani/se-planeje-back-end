const express = require('express')
const cors = require('cors')
const authRoute = require('./app/routes/authRoute')
const userRoute = require('./app/routes/userRoute')
const despesaRoute = require('./app/routes/despesaRoute')
const cartaoRoute = require('./app/routes/cartaoRoute')
const naturezaRoute = require('./app/routes/naturezaRoute')
const receitaRoute = require('./app/routes/receitaRoute')
const app = express()

app.use(cors())
app.use(express.json())

app.use(authRoute)
app.use(userRoute)
app.use(despesaRoute)
app.use(cartaoRoute)
app.use(naturezaRoute)
app.use(receitaRoute)

module.exports = app 