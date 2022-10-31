const express = require('express');
const usersRouter = express.Router();

const axios = require('axios');

const UserData = require('../models/userData');

usersRouter.get('/test', (req, res) => {
  res.json({msg: 'Router works!'});
});

usersRouter.get('/', (req, res) => {
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
      res
        .setHeader('Access-Control-Allow-Origin', '*')
        .json(resData.data.documents);
    })
    .catch((err) => {
      res.json({error: err});
    });
});

usersRouter.post('/:id/delete', (req, res) => {
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

usersRouter.post('/', (req, res) => {
  const username = req.body.username;

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

module.exports = usersRouter;
