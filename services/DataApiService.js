require('dotenv').config();
const DataApiConfig = require('./config/DataApiConfig');

const axios = require('axios');

class DataApiService extends DataApiConfig {
  async find(keys) {
    const config = await super.getConfig('find', keys);

    return axios(config)
      .then((res) => res.data.documents)
      .catch((err) => err);
  }
}

module.exports = new DataApiService();
