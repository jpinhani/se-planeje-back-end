const app = require('./app')

//PRD
// const port = process.env.PORT || 3000;

//DEV
const port = process.env.PORT || 8082

// const hostname = 'http://seplaneje-com.umbler.net';


app.listen(port, () => {
  console.log(`App running running at ${port}`);

})

app.get('/', (req, res) => {
  res.send('Hello DevPleno!')
})