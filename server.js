require("dotenv").config();
const app = require('./app');


//PRD
// const port = process.env.PORT || 3000;

//DEV
const port = process.env.SP_PORT_BACKEND
//process.env.PORT ||
const hostname = process.env.SP_HOST_BACKEND
//|| 'http://seplaneje-com.umbler.net';


app.listen(port, () => {
  console.log(`App running running at ${port}`);

})

app.get('/', (req, res) => {
  res.send('Hello DevPleno!')
})