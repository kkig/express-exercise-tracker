const express = require('express');
const usersRouter = express.Router();

const UserController = require('../app/controllers/UserController');

usersRouter.get('/', UserController.listUsers);
usersRouter.get('/:id/logs', UserController.getUserLog);

usersRouter.post('/', UserController.addNewUser);
usersRouter.post('/:id/delete', UserController.deleteUser);
usersRouter.post('/:id/exercises', UserController.addExcersise);

module.exports = usersRouter;
