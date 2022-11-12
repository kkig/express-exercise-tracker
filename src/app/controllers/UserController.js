const DataApiService = require('../../database/DataApiService');
const UserData = require('../models/User');

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
      return res.status(500).json(err);
    }
  }

  async deleteUser(req, res) {
    try {
      const uid = req.params.id;
      const query = {_id: {$oid: uid}};

      const deleteApiRes = await DataApiService.deleteOne(query);
      deleteApiRes.deletedUserId = uid;

      return res.json(deleteApiRes);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async addExcersise(req, res) {}
}

module.exports = new UserController();
