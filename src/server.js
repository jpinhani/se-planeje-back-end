const app = require('./app')

const port = 3000;
const hostname = 'http://seplaneje-com.umbler.net';


app.listen(port, hostname, () => {
  console.log(`App running running at http://${hostname}:${port}`);

})