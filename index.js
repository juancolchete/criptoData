const express = require('express');
const app = express();
const crypto = require('./api/crypto');

app.use(express.json({ extended: false}));
app.get('/', (req, res) => {
  res.send("Welcome")
});
app.use('api/crypto', crypto)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));