const app = require('./app')

const port = process.env.PORT || 3000;
const hostname = 'http://seplaneje-com.umbler.net';


app.listen(port, () => {
  console.log(`App running running at ${port}`);

})

