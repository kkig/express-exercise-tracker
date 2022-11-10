require('dotenv').config();
const DataApiConfig = require('./config/DataApiConfig');

const axios = require('axios');

class DataApiService extends DataApiConfig {
  async find(keys) {
    const config = await super.getConfig('find', keys);

    const result = axios(config)
      .then((res) => res.data.documents)
      .catch((err) => err);

    return result;
  }

  async insertOne(keys) {
    const config = await super.getConfig('insertOne', keys);

    const result = axios(config)
      .then((res) => res.data.insertedId)
      .catch((err) => err);

    return result;
  }
}

module.exports = new DataApiService();
