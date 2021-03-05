const express = require('express')
const cspub = require('./coinpub/checkLatest');
const app = express()
const port = process.env.PORT || 3000;

let request = require('request');
let hasurasec = process.env.hasurasec;
let hasurauri = 'https://covid19-logic.herokuapp.com/v1/graphql';
let opt = {'method': 'POST',
    'url': hasurauri,
    'headers': {
      'x-hasura-admin-secret': '' + hasurasec +'',
      'Content-Type': 'application/json'
    }};

app.get('/', (req, res) => {
  res.send('<a href=https://github.com/ale-sanchez-g/coinspot-bot/blob/main/README.md>GitHub Project</a>')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/prices', (req, res) => {
  cspub(function(data) {
    res.send(data);
  });
  
})

app.get('/recomend/:coin', (req, res) => {

  let coinName = req.params.coin;

    qry = {
        body: JSON.stringify({
          query: `query avaragecost {
            coins_aggregate(distinct_on: coin, where: {coin: {_eq: "${coinName}"}}) {
              aggregate {
                avg {
                  last
                }
              }
            }
            coins(limit: 5, order_by: {created_at: desc}, where: {coin: {_eq: "${coinName}"}}) {
              coin
              last
            }
          }`,
          variables: {}
        })
      };

    options = JSON.parse((JSON.stringify(opt) + JSON.stringify(qry)).replace(/}{/g,","));

    request(options, function (error, response) {
      if (error) throw new Error(error);
      res.end(response.body);
    });  
})