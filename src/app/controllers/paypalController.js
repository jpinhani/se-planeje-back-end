
module.exports = {

  index(req, res) {
    console.log('It works! 😀');
    res.status(200).send('OK');
    res.end();
  }

}

