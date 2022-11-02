const express = require('express');
const usersRouter = express.Router();

const axios = require('axios');

const {reqBodyPromise, generateAxiosConfig} = require('../utils/users');

const UserData = require('../models/userData');

usersRouter.get('/test', (req, res) => {
  res.json({msg: 'Router works!'});
});

usersRouter.get('/', async (req, res) => {
  const reqBody = await reqBodyPromise('projection', {_id: 1, username: 1});

  generateAxiosConfig('post', 'find', reqBody).then((config) => {
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
});

usersRouter.post('/:id/delete', async (req, res) => {
  const userId = req.params.id;
  const reqData = await reqBodyPromise('filter', {_id: {$oid: userId}});

  generateAxiosConfig('post', 'deleteOne', reqData).then((config) => {
    axios(config)
      .then((response) => {
        res.json(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

usersRouter.post('/', async (req, res) => {
  const username = req.body.username;
  const reqBody = await reqBodyPromise(
    'document',
    new UserData({username: username}, {_id: false})
  );

  generateAxiosConfig('post', 'insertOne', reqBody).then((config) => {
    axios(config)
      .then((resData) => {
        res.json({_id: resData.data.insertedId, username: username});
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = usersRouter;
