const PayPalService = require('./../models/paypalModel')
const ipn = require('paypal-ipn');
module.exports = {

  async index(req, res) {

    console.log('It works!');
    res.status(200).send('OK');
    res.end();

    const body = req.body || {};

    // Validate IPN message with PayPal
    try {
      const isValidated = await PayPalService.validate(body);
      if (!isValidated) {
        console.error('Error validating IPN message.');
        return;
      }

      // IPN Message is validated!
      console.log('body.txn_type', body.txn_type)
      const transactionType = body.txn_type;

      switch (transactionType) {
        case 'web_accept':
        case 'subscr_payment':
          const status = body.payment_status;
          const amount = body.mc_gross;
          console.log('body', body)
          // Validate that the status is completed, 
          // and the amount match your expectaions.
          break;
        case 'subscr_signup':
        case 'subscr_cancel':
        case 'subscr_eot':
          // Update user profile
          console.log('body1', body)
          break;
        case 'recurring_payment_suspended':
        case 'recurring_payment_suspended_due_to_max_failed_payment':
          // Contact the user for more details
          break;
        default:
          console.log('Unhandled transaction type: ', transactionType);
      }
    } catch (e) {
      console.error(e);
    }

  },

  novotest(req, res) {


    ipn.verify(req.body, function callback(err, msg) {
      if (err) {
        console.error(msg);
      } else {
        //Do stuff with original params here
        console.log('msgSucess', msg);
        if (req.body.payment_status == 'Completed') {
          //Payment has been confirmed as completed
        }
      }

    });
    res.end();
  }
}

