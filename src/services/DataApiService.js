require('dotenv').config();
const DataApiConfig = require('./config/DataApiConfig');

const axios = require('axios');

class DataApiService extends DataApiConfig {
  async find(keys) {
    const config = await super.getConfig('find', keys);

    const resultDocs = axios(config)
      .then((res) => res.data.documents)
      .catch((err) => err);

    return resultDocs;
  }

  async insertOne(keys) {}
}

module.exports = new DataApiService();
