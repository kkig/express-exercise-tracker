const DataApiService = require('../../database/DataApiService');
const UserData = require('../models/User');
const ExerciseData = require('../models/Exercise');

class UserController {
  async listUsers(req, res) {
    try {
      const keys = {_id: 1, username: 1};
      const doc = await DataApiService.find({projection: keys});

      return res.json(doc.documents);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async addNewUser(req, res) {
    const username = req.body.username;
    const newUser = new UserData({username: username, count: 0}, {_id: false});

    try {
      const apiRes = await DataApiService.insertOne(newUser);

      const response = Object.assign(newUser, {_id: apiRes.insertedId});
      return res.status(201).json(response);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const query = {_id: {$oid: userId}};

      const apiRes = await DataApiService.deleteOne(query);
      apiRes.deletedUserId = userId;

      if (apiRes.deletedCount === 0) {
        apiRes.error = 'User not found. Please check user id.';

        return res.status(400).json(apiRes);
      }

      return res.json(apiRes);
    } catch (err) {
      return res
        .status(400)
        .json({error: err, message: 'Error deleting user.'});
    }
  }

  async getUserLog(req, res) {
    const userId = req.params.id;

    try {
      const query = {_id: {$oid: userId}};
      const apiRes = await DataApiService.findOne(query);

      const userLog = apiRes.document;
      userLog.log = userLog.log.map((exercise) => {
        exercise.date = new Date(exercise.date).toDateString();
        return exercise;
      });

      return res.json(userLog);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async addExcersise(req, res) {
    const userId = req.params.id;
    const desc = req.body.description;
    const duration = req.body.duration;

    const dateInput = req.body.date;
    const date = dateInput ? new Date(dateInput) : new Date();

    const newExercise = new ExerciseData(
      {
        description: desc,
        duration: duration,
        date: date,
      },
      {_id: false}
    );

    try {
      const query = {_id: {$oid: userId}};
      const updates = {
        $inc: {count: 1},
        $push: {
          log: newExercise,
        },
      };

      const doc = await DataApiService.findAndUpdate(query, updates);

      if (doc?.error) return res.status(400).json(doc);

      doc.date = new Date(doc.date).toDateString();
      return res.json(doc);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

module.exports = new UserController();
