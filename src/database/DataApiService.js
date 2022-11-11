require('dotenv').config();
const DataApiConfig = require('./config/DataApiConfig');

const axios = require('axios');

class DataApiService {
  async find(keys) {
    const config = await new DataApiConfig().getConfig('find', keys);

    const result = axios(config)
      .then((res) => res.data)
      .catch((err) => err);

    return result;
  }

  async insertOne(doc) {
    if (!doc) throw new Error('No document to insert to database.');

    const config = await new DataApiConfig().getConfig('insertOne', {
      document: doc,
    });

    const result = axios(config)
      .then((res) => res.data)
      .catch((err) => err);

    return result;
  }

  async deleteOne(filter) {
    if (!filter) throw new Error('No document to delete.');

    const config = await new DataApiConfig().getConfig('deleteOne', filter);

    const result = axios(config)
      .then((res) => res.data)
      .catch((err) => err);

    return result;
  }

  async findAndUpdate(query, updates) {
    const keys = {filter: query, updates: updates};
  }
}

module.exports = new DataApiService();
