const express = require('express')
const app = express()
const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.send('<a href=https://github.com/ale-sanchez-g/coinspot-bot/blob/main/README.md>GitHub Project</a>')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})