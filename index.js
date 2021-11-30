const express = require('express');
const axios = require('axios');
const https = require('https');
require('dotenv').config();
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.json({ extended: false}));
app.get('/', (req, res) => {
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });
  axios.defaults.httpsAgent = httpsAgent;
  const headers = {
    'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY
  }
  axios.get('http://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',{headers})
  .then(response => {
    res.json(response.data);
  })
  .catch(error => {
    console.log(error);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));