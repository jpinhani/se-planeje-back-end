require("dotenv").config();
const express = require('express')

// const router = express.Router()
const app = require('./app');


const port = process.env.SP_PORT_BACKEND

const hostname = process.env.SP_HOST_BACKEND


app.listen(process.env.PORT||port, () => {
  console.log(`App running running at ${port}`);
})

app.get('/', (req, res) => {
  res.send('Hello Dev - Seplaneje!')
})



