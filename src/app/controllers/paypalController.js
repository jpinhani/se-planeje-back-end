
module.exports = {

  index(req, res) {
    try {
      console.log('It works!');
      res.status(200).send('OK');
      res.end();
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}

