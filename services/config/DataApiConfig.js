require('dotenv').config();

class DataApiConfig {
  constructor() {
    this.dataSource = process.env.MONGO_DATASOURCE;
    this.database = process.env.MONGO_DATABASE;
    this.collection = process.env.MONGO_COLLECTION;
  }

  get getBody() {
    return this;
  }

  getConfig(ops, keys) {
    const endpoint = !ops.route
      ? process.env.MONGO_DATA_API_BASE_URI + '/data/v1/action/' + ops
      : process.env.MONGO_DATA_API_BASE_URI + '/' + ops.route;

    const config = {
      method: 'post',
      url: endpoint,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': process.env.MONGO_DATA_API_KEY,
      },
      data: JSON.stringify(Object.assign(this.getBody, keys)),
    };

    return config;
  }
}

module.exports = DataApiConfig;
