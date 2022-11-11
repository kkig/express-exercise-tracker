const express = require('express');
const usersRouter = express.Router();

const axios = require('axios');

const {getDataApiConfig} = require('../utils/users');

const UserData = require('../app/models/User');
const Exercise = require('../app/models/Exercise');

const UserController = require('../app/controllers/UserController');

usersRouter.get('/', UserController.listUsers);
usersRouter.post('/', UserController.addNewUser);

usersRouter.post('/:id/delete', UserController.deleteUser);
// usersRouter.post('/:id/delete', async (req, res) => {
//   const userId = req.params.id;
//   const config = await getDataApiConfig('deleteOne', {
//     filter: {
//       _id: {$oid: userId},
//     },
//   });

//   axios(config)
//     .then((doc) => {
//       const response = doc.data;
//       response.msg = 'Deleted user!';

//       return res.json(response);
//     })
//     .catch((err) => res.json(err));
// });

usersRouter.post('/:id/exercises', async (req, res) => {
  const userId = req.params.id;
  const desc = req.body.description;
  const duration = req.body.duration;
  const dateInput = req.body.date ?? '';

  const findConfig = await getDataApiConfig('findAndUpdate', {
    filter: {_id: {$oid: userId}},
    projection: {_id: 1, username: 1},
    update: {
      $inc: {count: 1},
      $push: {
        exercise: {
          description: 'Jet Skiing',
          duration: 120,
          date: '2001-08-23T00:00:00.000Z',
        },
      },
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
