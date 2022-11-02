const express = require('express');
const usersRouter = express.Router();

const axios = require('axios');

const {
  generateDateObj,
  reqBodyPromise,
  generateAxiosConfig,
} = require('../utils/users');

const UserData = require('../models/User');
const Exercise = require('../models/Exercise');

usersRouter.get('/', async (req, res) => {
  const reqBody = await reqBodyPromise('projection', {_id: 1, username: 1});
  reqBody.sort = {_id: -1};

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

usersRouter.post('/:id/exercises', async (req, res) => {
  const userId = req.params.id;
  const desc = req.body.description;
  const duration = req.body.duration;

  const dateInput = req.body.date || '';
  const date = generateDateObj(dateInput);

  const exerciseObj = new Exercise(
    {description: desc, duration: duration, date: date},
    {_id: false}
  );

  const reqBody = await reqBodyPromise('filter', {_id: {$oid: userId}});

  reqBody.update = {$inc: {count: 1}, $push: {exercise: exerciseObj}};

  console.log(reqBody.update['$push']);

  generateAxiosConfig('post', 'updateOne', reqBody)
    .then((config) => {
      console.log(config);

      axios(config)
        .then((response) => {
          if (response.response.status === 400) {
            return res.json({error: 'Error adding data.', msg: response.data});
          } else {
            console.log(response.data);

            return res.json({
              _id: userId,
              username: '',
              date: date,
              duration: duration,
              description: desc,
            });
          }
        })
        .catch((err) => console.log('Error updating data: ', err));
    })
    .catch((err) => {
      console.log(err);
    });

  //   res.json({
  //     userId: userId,
  //     desc: desc,
  //     duration: duration,
  //     date: date,
  //   });
});

module.exports = usersRouter;
