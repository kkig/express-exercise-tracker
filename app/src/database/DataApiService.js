require('dotenv').config();
const DataApiConfig = require('./config/DataApiConfig');

const axios = require('axios');

class DataApiService {
  async find(keys) {
    const config = await new DataApiConfig().getConfig('find', keys);

    const apiRes = axios(config)
      .then((res) => res.data)
      .catch((err) => err);

    return apiRes;
  }

  async findOne(query, projec) {
    if (!query) throw new Error('Query is missing.');

    const filter = {filter: query};
    const projection = projec && {projection: projec};

    const option = Object(filter, projection);
    const config = await new DataApiConfig().getConfig('findOne', option);

    const apiRes = axios(config)
      .then((res) => res.data)
      .catch((err) => err);

    return apiRes;
  }

  async insertOne(doc) {
    if (!doc) throw new Error('No document to insert to database.');

    const config = await new DataApiConfig().getConfig('insertOne', {
      document: doc,
    });

    const apiRes = axios(config)
      .then((res) => res.data)
      .catch((err) => err);

    return apiRes;
  }

  async deleteOne(query) {
    if (!query) throw new Error('No document to delete.');

    const filter = {filter: query};
    const config = await new DataApiConfig().getConfig('deleteOne', filter);

    const apiRes = axios(config)
      .then((res) => res.data)
      .catch((err) => err);

    return apiRes;
  }

  async findAndUpdate(query, updates) {
    const errorMsg = 'Query and/or updates are missing to api call.';
    if (!query || !updates) throw new Error(errorMsg);

    const route = {route: 'findAndUpdate'};
    const keys = {filter: query, update: updates};
    const config = await new DataApiConfig().getConfig(route, keys);

    const apiRes = axios(config)
      .then((res) => res.data)
      .catch((err) => err);

    return apiRes;
  }
}

module.exports = new DataApiService();
