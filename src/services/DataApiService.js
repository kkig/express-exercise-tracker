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

  async insertOne(doc) {
    if (!doc) throw new Error('No doc to insert to database.');

    const config = await super.getConfig('insertOne', {document: doc});

    const result = axios(config)
      .then((res) => res.data)
      .catch((err) => err);

    return result;
  }
}

module.exports = new DataApiService();
