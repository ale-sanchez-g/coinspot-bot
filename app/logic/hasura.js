let request = require('request');
let hasurasec = process.env.hasurasec;
let hasurauri = 'https://covid19-logic.herokuapp.com/v1/graphql';

let opt = {'method': 'POST',
    'url': hasurauri,
    'headers': {
      'x-hasura-admin-secret': '' + hasurasec +'',
      'Content-Type': 'application/json'
    }};

function coinLogic(data) {
    console.log(data);
}

coinLogic.pushCoinsData = function(data) {
    for(let attributename in data){    
        qry = {
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
        
        options = JSON.parse((JSON.stringify(opt) + JSON.stringify(qry)).replace(/}{/g,","));

        request(options, function (error, response) {
          if (error) throw new Error(error);
          console.log(response.body);
        });
      }  
};

coinLogic.recommendation = function(coin) {
    console.log(`checking coin ${coin}`);

    qry = {
        body: JSON.stringify({
          query: `query avaragecost {
            coins_aggregate(where: {coin: {_eq: "${coin}"}}, order_by: {created_at: desc}) {
              aggregate {
                avg {
                  last
                }
              }
            }
            coins(limit: 5, where: {coin: {_eq: "${coin}"}}) {
              coin
              last
              ask
              bid
            }
          }`,
          variables: {}
        })
      };

    options = JSON.parse((JSON.stringify(opt) + JSON.stringify(qry)).replace(/}{/g,","));

    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });

};

module.exports = coinLogic;