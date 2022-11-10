const DataApiService = require('../../services/DataApiService');

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
}

module.exports = new UserController();
