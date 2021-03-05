const coinspot = require('./coinsec/coinspot');
const cspub = require('./coinpub/checkLatest');
let coinLogic = require('./logic/hasura')

let secret = process.env.coinsecret;
let key = process.env.coinkey;
let client = new coinspot(key, secret);

cspub(function(data) {
  coinLogic.pushCoinsData(data);
});

client.balances(function(e, data) {
 	if (e) {
        console.error(e);
     } 
    console.log(JSON.parse(data));
});