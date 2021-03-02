const https = require('https');

function coinspotpub(callback) {
    https.get('https://www.coinspot.com.au/pubapi/latest', (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        console.log(JSON.parse(data).prices);
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
}

module.exports = coinspotpub;