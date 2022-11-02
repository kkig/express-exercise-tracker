const usersUtils = require('./users');

require('dotenv').config();

describe('reqBodyPromise()', () => {
  it('will return object', async () => {
    const reqBody = await usersUtils.reqBodyPromise('projection', {
      _id: 1,
      username: 1,
    });

    expect(reqBody).toEqual({
      dataSource: process.env.MONGO_DATASOURCE,
      database: process.env.MONGO_DATABASE,
      collection: process.env.MONGO_COLLECTION,
      projection: {_id: 1, username: 1},
    });
  });

  it('will return object without properties', async () => {
    const reqBody = await usersUtils.reqBodyPromise();

    expect(reqBody).toEqual({
      dataSource: process.env.MONGO_DATASOURCE,
      database: process.env.MONGO_DATABASE,
      collection: process.env.MONGO_COLLECTION,
    });
  });
});

describe('generateAxiosConfig()', () => {
  const reqBody = {
    dataSource: process.env.MONGO_DATASOURCE,
    database: process.env.MONGO_DATABASE,
    collection: process.env.MONGO_COLLECTION,
    projection: {_id: 1, username: 1},
  };

  it('will return object', async () => {
    const config = await usersUtils.generateAxiosConfig(
      'post',
      'find',
      reqBody
    );
    expect(config).toEqual({
      method: 'post',
      url: process.env.MONGO_DATA_API_URI + '/action/find',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': process.env.MONGO_DATA_API_KEY,
      },
      data: JSON.stringify(reqBody),
    });
  });
});
