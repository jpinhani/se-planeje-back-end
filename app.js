require("dotenv").config();
const express = require('express')
const cors = require('cors')
const authRoute = require('./src/app/routes/authRoute')
const userRoute = require('./src/app/routes/userRoute')
const despesaRoute = require('./src/app/routes/despesaRoute')
const cartaoRoute = require('./src/app/routes/cartaoRoute')
const contaRoute = require('./src/app/routes/contaRoute')
const categoriaRoute = require('./src/app/routes/categoriaRoute')
const receitaRoute = require('./src/app/routes/receitaRoute')
const visaoRoute = require('./src/app/routes/visaoRoute')
const faturaRoute = require('./src/app/routes/faturaRoute')
const transferencia = require('./src/app/routes/transferenciaRoute')
const chartRoute = require('./src/app/routes/chartRoute')
// const emailRoute = require('./src/app/routes/EmailRoute')
// const pagarmeRoute = require('./src/app/routes/pagarmeRoute')


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
app.use(visaoRoute)
app.use(faturaRoute)
app.use(transferencia)
app.use(chartRoute)
// app.use(emailRoute)
// app.use(pagarmeRoute)

module.exports = app 