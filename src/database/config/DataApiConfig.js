require('dotenv').config();

class DataApiConfig {
  // Set another DB for prod use
  constructor() {
    this.dataSource = process.env.MONGO_DATASOURCE;
    this.database = process.env.MONGO_DATABASE;
    this.collection = process.env.MONGO_COLLECTION;
  }

  get getBody() {
    return this;
  }

  getConfig(ops, options) {
    const route = !ops.route ? '/data/v1/action/' + ops : '/' + ops.route;

    const config = {
      method: 'post',
      url: route,
      baseURL: process.env.MONGO_DATA_API_BASE_URI,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': process.env.MONGO_DATA_API_KEY,
      },
      data: JSON.stringify(Object.assign(this.getBody, options)),
    };

    return config;
  }
}

module.exports = DataApiConfig;
