const express = require('express')
const cors = require('cors')
const authRoute = require('./src/app/routes/authRoute')
const userRoute = require('./src/app/routes/userRoute')
const despesaRoute = require('./src/app/routes/despesaRoute')
const cartaoRoute = require('./src/app/routes/cartaoRoute')
const contaRoute = require('./src/app/routes/contaRoute')
const categoriaRoute = require('./src/app/routes/categoriaRoute')
const receitaRoute = require('./src/app/routes/receitaRoute')
const visionRoute = require('./src/app/routes/visionRoute')

const app = express()

app.use(cors())
app.use(express.json())

app.use(authRoute)
app.use(userRoute)
app.use(despesaRoute)
app.use(cartaoRoute)
app.use(contaRoute)
app.use(receitaRoute)
app.use(categoriaRoute)
app.use(visionRoute)

module.exports = app 