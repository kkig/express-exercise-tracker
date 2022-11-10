const DataApiService = require('../../services/DataApiService');
const UserData = require('../models/User');

class UserController {
  async listUsers(req, res) {
    try {
      const keys = {_id: 1, username: 1};
      const doc = await DataApiService.find({projection: keys});

      return res.json(doc);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
  async addNewUser(req, res) {
    const username = req.body.username;
    const newUser = new UserData({username: username, count: 0}, {_id: false});
  }
}

module.exports = new UserController();
