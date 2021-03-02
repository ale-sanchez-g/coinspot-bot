let coinspot = require('./coinsec/coinspot');
const cspub = require('./coinpub/checkLatest');

let secret = process.env.coinsecret;
let key = process.env.coinkey;

let client = new coinspot(key, secret);

cspub(function(data) {
  console.log(JSON.parse(data));
});

client.balances(function(e, data) {
 	if (e) {
        console.error(e);
     } 
    console.log(JSON.parse(data));
});