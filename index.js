const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

/* Middlewares */
app.use(cors());
app.use(bodyParser.urlencoded({extended: true})); // Use to retrieve dat afrom POST
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

/* Connect to MongoDB */
const data = JSON.stringify({
  dataSource: 'Cluster0',
  database: 'sample_airbnb', // exercise_tracker
  collection: 'listingsAndReviews', // exerciseLog
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
    // console.log(res.data);
    console.log('DB connected!');
  })
  .catch(function (err) {
    console.log('Error fetching data: ', err);
  });

/* Routes */
app.post('/api/users', (req, res) => {
  // console.log(req.body.username);
  const username = req.body.username;

  res.json({username: username});
  // res.json(JSON.parse(req));
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
