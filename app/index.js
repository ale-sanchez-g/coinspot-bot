let request = require('request');
let coinspot = require('./coinsec/coinspot');
const cspub = require('./coinpub/checkLatest');

let secret = process.env.coinsecret;
let key = process.env.coinkey;
let hasurasec = process.env.hasurasec;
let client = new coinspot(key, secret);

let options = {};

cspub(function(data) {
  for(var attributename in data){    
    options = {
      'method': 'POST',
      'url': 'https://covid19-logic.herokuapp.com/v1/graphql',
      'headers': {
        'x-hasura-admin-secret': '' + hasurasec +'',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `mutation MyMutation {
      insert_coins(objects: {ask: ${data[attributename].ask}, bid: ${data[attributename].bid}, coin: "${attributename}", last: ${data[attributename].last}}) {
        returning {
          id
          created_at
        }
      }
    }`,
        variables: {}
      })
    };

    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });
  }  
});

client.balances(function(e, data) {
 	if (e) {
        console.error(e);
     } 
    console.log(JSON.parse(data));
});