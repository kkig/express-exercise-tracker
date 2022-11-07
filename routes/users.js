const express = require('express');
const usersRouter = express.Router();

const axios = require('axios');

const {getDataApiConfig} = require('../utils/users');

const UserData = require('../models/User');
const Exercise = require('../models/Exercise');

usersRouter.get('/', async (req, res) => {
  const projection = {_id: 1, username: 1};
  const config = await getDataApiConfig('find', {projection: projection});

  axios(config)
    .then((doc) => res.json(doc.data.documents))
    .catch((err) => res.json(err));
});

usersRouter.post('/', async (req, res) => {
  const username = req.body.username;
  const newUser = new UserData({username: username, count: 0}, {_id: false});

  const config = await getDataApiConfig('insertOne', {document: newUser});
  axios(config)
    .then((doc) => res.json({_id: doc.data.insertedId, username: username}))
    .catch((err) => res.json(err));
});

usersRouter.post('/:id/delete', async (req, res) => {
  const userId = req.params.id;
  const config = await getDataApiConfig('deleteOne', {
    filter: {
      _id: {$oid: userId},
    },
  });

  axios(config)
    .then((doc) => {
      const response = doc.data;
      response.msg = 'Deleted user!';

      return res.json(response);
    })
    .catch((err) => res.json(err));
});

usersRouter.post('/:id/exercises', async (req, res) => {
  const userId = req.params.id;
  const desc = req.body.description;
  const duration = req.body.duration;
  const dateInput = req.body.date ?? '';

  const findConfig = await getDataApiConfig('findOne', {
    filter: {
      _id: {$oid: userId},
    },
  });

  const lookupUserById = new Promise((resolve, reject) => {
    axios(findConfig)
      .then((doc) => {
        // console.log(doc.data);

        resolve(doc.data);
      })
      .catch((err) => reject(err));
  });

  lookupUserById
    .then((doc) => {
      console.log(doc);
      if (doc.document === null)
        return res.json({msg: 'No user found for the ID.'});

      return res.json(doc);
    })
    .catch((err) => res.json(err));

  //   axios(findConfig)
  //     .then((doc) => {
  //       console.log(doc.data);

  //       if (doc.data.document == null)
  //         return res.json({msg: 'No user found for the ID.'});

  //       return res.json(doc.data);
  //     })
  //     .catch((err) => res.json(err));

  //   return res.json(req.params);
  //   const pipeline = [{filter: {_id: userId}, projection: {_id: 1, username: 1}}];
});

module.exports = usersRouter;
