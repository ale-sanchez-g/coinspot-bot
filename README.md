# coinspot-bot
This is a simple bot that will check coinspot API

## Dependencies

- latest node version
- Get API Key and Secret from [Coinspot](https://www.coinspot.com.au/my/api) ensure it has full access

## Reference 

This project is base on [coinspot-api](https://www.npmjs.com/package/coinspot-api)

## DB set up

In order to store historical data, we have a Heroku cron job that captures the below into a Hasura GraphQL server with a postgress DB

| id | coin | bid | ask | last | created_at |
|----|------|-----|-----|------|------------|
| 1  | btc  |1.000|1.000|1.0000| 2021-03-07T04:00:46.780691+00:00|


## Run

```sh
npm install
export coinsecret=GET_SECRET_FROM_COINSPOT
export coinkey=GET_KEY_FROM_COINSPOT
export hasurasec=HASURE_GRAPHQL_SECRET
npm start
```

Available endpoints

> GET /

response
```
GitHub Project
```

> GET /prices

response
```json
{
  btc: {
    bid: "65706.57000002",
    ask: "66350",
    last: "66350"
  }
}
```

> GET /recomend/:coin

response
```json
{
  data: {
    coins_aggregate: {
      aggregate: {
        avg: {
          last: 65000
        }
      }
    },
  coins: [
    {
      "coin": "btc",
      "last": 65000,
      "ask": 65000,
      "bid": 64433.08000001
    }
  ]
  }
}
```
