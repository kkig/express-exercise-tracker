const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

app.use(cors());
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

const data = JSON.stringify({
  dataSource: 'Cluster0',
  database: 'sample_airbnb',
  collection: 'listingsAndReviews',
  filter: {
    _id: '10006546',
  },
});

const config = {
  method: 'post',
  url: process.env.MONGO_DATA_API_URI + '/action/findOne',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key': process.env.MONGO_DATA_API_KEY,
  },
  data: data,
};

axios(config)
  .then(function (res) {
    console.log(res.data);
  })
  .catch(function (err) {
    console.log('Error fetching data: ', err);
  });

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
