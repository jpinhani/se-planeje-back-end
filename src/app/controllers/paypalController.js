class IPNController {

  static index(req, res) {
    console.log('It works! 😀');
    res.status(200).send('OK');
    res.end();
  }

}

export default IPNController;