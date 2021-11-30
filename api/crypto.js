const express = require('express');
const axios = require('axios');
const https = require('https');
require('dotenv').config();
const router = express.Router();

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

router.get('/', (req, res) => {
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

module.exports = router;