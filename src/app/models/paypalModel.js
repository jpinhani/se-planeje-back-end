
const request = require('request');
const querystring = require('querystring');


module.exports = {

    validate(body = {}) {
        return new Promise((resolve, reject) => {
            // Prepend 'cmd=_notify-validate' flag to the post string
            let postreq = 'cmd=_notify-validate';

            // Iterate the original request payload object
            // and prepend its keys and values to the post string
            Object.keys(body).map((key) => {
                postreq = `${postreq}&${key}=${body[key]}`;
                return key;
            });

            const options = {
                url: 'https://ipnpb.paypal.com/cgi-bin/webscr',
                method: 'POST',
                headers: {
                    'Content-Length': postreq.length,
                },
                encoding: 'utf-8',
                body: postreq
            };

            // Make a post request to PayPal
            request(options, (error, response, resBody) => {
                if (error || response.statusCode !== 200) {
                    reject(new Error(error));
                    return;
                }

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