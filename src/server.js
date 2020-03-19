const app = require('./app')

const port = 3000;
const hostname = 'mysql669.umbler.com';


app.listen(port, hostname, () => {
  console.log(`App running running at http://${hostname}:${port}`);

})