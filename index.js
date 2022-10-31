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

/* Model */
const UserData = require('./models/userData');
const {Schema} = require('mongoose');
const e = require('express');

/* Routes */
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/users', (req, res) => {
  const reqBody = JSON.stringify({
    dataSource: process.env.MONGO_DATASOURCE,
    database: process.env.MONGO_DATABASE,
    collection: process.env.MONGO_COLLECTION,
    projection: {_id: 1, username: 1},
  });

  const config = {
    method: 'post',
    url: process.env.MONGO_DATA_API_URI + '/action/find',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': process.env.MONGO_DATA_API_KEY,
    },
    data: reqBody,
  };

  axios(config)
    .then((resData) => {
      // res.json(resData.data.documents);
      res
        .setHeader('Access-Control-Allow-Origin', '*')
        .json(resData.data.documents);
    })
    .catch((err) => {
      res.json({error: err});
    });
});

app.post('/api/users/:id/delete', (req, res) => {
  const userId = req.params.id;
  const endpoint = process.env.MONGO_DATA_API_URI + '/action/deleteOne';

  const reqData = JSON.stringify({
    dataSource: process.env.MONGO_DATASOURCE,
    database: process.env.MONGO_DATABASE,
    collection: process.env.MONGO_COLLECTION,
    filter: {_id: {$oid: userId}},
  });

  const config = {
    method: 'post',
    url: endpoint,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': process.env.MONGO_DATA_API_KEY,
    },
    data: reqData,
  };

  axios(config)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/api/users', (req, res) => {
  // console.log(req.body.username);
  const username = req.body.username;

  if (username === '') return res.json({error: 'Invalid User Name!'});

  // Skip generating ID to retain ObjectId format for _id.
  const user = new UserData({username: username}, {_id: false});

  const data = JSON.stringify({
    dataSource: process.env.MONGO_DATASOURCE,
    database: process.env.MONGO_DATABASE,
    collection: process.env.MONGO_COLLECTION,
    document: user,
  });

  const config = {
    method: 'post',
    url: process.env.MONGO_DATA_API_URI + '/action/insertOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': process.env.MONGO_DATA_API_KEY,
    },
    data: data,
  };

  axios(config)
    .then((resData) => {
      res.json({_id: resData.data.insertedId, username: username});
    })
    .catch((err) => {
      console.log(err);
    });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
