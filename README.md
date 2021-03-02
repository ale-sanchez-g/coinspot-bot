# coinspot-bot
This is a simple bot that will check coinspot API

## Dependencies

- latest node version
- Get API Key and Secret from [Coinspot](https://www.coinspot.com.au/my/api) ensure it has full access

## Reference 

This project is base on [coinspot-api](https://www.npmjs.com/package/coinspot-api)

## Run

> npm install

> export coinsecret=GET_SECRET_FROM_COINSPOT

> export coinkey=GET_KEY_FROM_COINSPOT

> npm run

Example ouput

```
{
  btc: { bid: '63520.09', ask: '63823.52', last: '63613.59' },
  ltc: { bid: '225.67', ask: '228.6177', last: '229.0696' },
  doge: { bid: '0.06600001', ask: '0.06769999', last: '0.0675' },
  eth: { bid: '2009', ask: '2033.999999', last: '2010' },
  powr: { bid: '0.28100001', ask: '0.309559', last: '0.31598901' },
  ans: { bid: '47', ask: '49.25', last: '47' },
  xrp: { bid: '0.57', ask: '0.57859996', last: '0.58149898' },
  trx: { bid: '0.062', ask: '0.062239', last: '0.062' },
  eos: { bid: '4.79', ask: '5.2', last: '4.92' },
  str: { bid: '0.54000001', ask: '0.5523', last: '0.5528' },
  rfox: { bid: '0.18001', ask: '0.189986', last: '0.189987' },
  rhoc: { bid: '0.113001', ask: '0.219999', last: '0.22' },
  gas: { bid: '13.1256', ask: '15.3', last: '15.466059' }
}
{
  status: 'ok',
  balance: {
    aud: 100,
    btc: 0.00012345,
    ltc: 0.01234567
  }
}
```