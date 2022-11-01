const express = require('express');
const usersRouter = express.Router();

const axios = require('axios');

const {testFn, generateNewReqBody} = require('../utils/users');

const UserData = require('../models/userData');

// function testJest() {
//   return 'Working :)';
// }

testFn();

// function DbReqBody() {
//   this.dataSource = process.env.MONGO_DATASOURCE;
//   this.database = process.env.MONGO_DATABASE;
//   this.collection = process.env.MONGO_COLLECTION;
// }

// function generateNewReqBody(key, obj) {
//   if (key && obj) {
//     const newReqBody = new DbReqBody();
//     newReqBody[key] = obj;

//     return newReqBody;
//   } else {
//     return new DbReqBody();
//   }
// }

usersRouter.get('/test', (req, res) => {
  res.json({msg: 'Router works!'});
});

usersRouter.get('/', (req, res) => {
  const reqBody = generateNewReqBody('projection', {_id: 1, username: 1});

  const config = {
    method: 'post',
    url: process.env.MONGO_DATA_API_URI + '/action/find',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': process.env.MONGO_DATA_API_KEY,
    },
    data: JSON.stringify(reqBody),
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

  const reqData = generateNewReqBody('filter', {_id: {$oid: userId}});

  const config = {
    method: 'post',
    url: endpoint,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': process.env.MONGO_DATA_API_KEY,
    },
    data: JSON.stringify(reqData),
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

  const reqBody = generateNewReqBody('document', user);

  const config = {
    method: 'post',
    url: process.env.MONGO_DATA_API_URI + '/action/insertOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': process.env.MONGO_DATA_API_KEY,
    },
    data: JSON.stringify(reqBody),
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
