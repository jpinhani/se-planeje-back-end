
const request = require('request');
const querystring = require('querystring');


module.exports = {

    validate(body) {

        return new Promise((resolve, reject) => {
            // let postreq = 'cmd=_notify-validate'


            // JSON object of the IPN message consisting of transaction details.
            let ipnTransactionMessage = body;
            // Convert JSON ipn data to a query string since Google Cloud Function does not expose raw request data.
            let formUrlEncodedBody = querystring.stringify(ipnTransactionMessage);
            // Build the body of the verification post message by prefixing 'cmd=_notify-validate'.
            let verificationBody = `cmd=_notify-validate&${formUrlEncodedBody}`;

            // Iterate the original request payload object
            // and prepend its keys and values to the post string
            // Object.keys(body).map((key) => {
            //     postreq = `${postreq}&${key}=${body[key]}`;
            //     return key;
            // });

            const options = {
                // url: 'https://ipnpb.paypal.com/cgi-bin/webscr',
                // url: 'https://ipnpb.paypal.com/cgi-bin/webscr',
                url: 'https://ipnpb.sandbox.paypal.com/cgi-bin/webscr',

                method: 'POST',
                headers: {
                    'Content-Length': verificationBody.length,
                    //   'Connection': 'close'
                },
                // encoding: 'utf-8',
                // body: postreq
                // body: postreq
                body: verificationBody,
                strictSSL: true,
                rejectUnauthorized: false,
                requestCert: true,
                agent: false
            };

            // Make a post request to PayPal
            request(options, (error, response, resBody) => {
                if (error || response.statusCode !== 200) {
                    reject(new Error(error));
                    return;
                }

                console.log('resBody', resBody)
                // Validate the response from PayPal and resolve / reject the promise.
                if (resBody.substring(0, 8) === 'VERIFIED') {
                    resolve(true);
                } else if (resBody.substring(0, 7) === 'INVALID') {
                    reject(new Error('IPN Message is invalid.'));
                } else {
                    reject(new Error('Unexpected response body.'));
                }
            });
        });
    }
}