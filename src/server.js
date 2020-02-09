const app = require('./app')

const port = 8082

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})