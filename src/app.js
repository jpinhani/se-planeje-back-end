const express = require('express')
const cors = require('cors')
const userRoute = require('./app/routes/userRoute')

const app = express()

app.use(cors())
app.use(express.json())

app.use(userRoute)

module.exports = app 