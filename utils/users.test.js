const usersUtils = require('./users');

require('dotenv').config();

describe('generateDateObj()', () => {
  it('returns valid Date object', () => {
    const date = usersUtils.generateDateObj('2022-12-22');

    expect(date).toBe('Thu, 22 Dec 2022 00:00:00 GMT');
  });

  it('returns Date object when property is empty', () => {
    const date = usersUtils.generateDateObj('');

    expect(date).not.toBeNull();
  });
});

describe('reqBodyPromise()', () => {
  it('returns object without properties', async () => {
    const reqBody = await usersUtils.reqBodyPromise();

    expect(reqBody).toEqual({
      dataSource: process.env.MONGO_DATASOURCE,
      database: process.env.MONGO_DATABASE,
      collection: process.env.MONGO_COLLECTION,
    });
  });

  it('returns object when properties are present', async () => {
    const projectObj = {_id: 1, username: 1};

    const reqBody = await usersUtils.reqBodyPromise('projection', projectObj);

    expect(reqBody).toEqual({
      dataSource: process.env.MONGO_DATASOURCE,
      database: process.env.MONGO_DATABASE,
      collection: process.env.MONGO_COLLECTION,
      projection: projectObj,
    });
  });

  it('returns object when property is "pipeline" array', async () => {
    const pipelineArray = [
      {$project: {_id: 1, username: 1}},
      {$sort: {count: 1}},
    ];

    const reqBody = await usersUtils.reqBodyPromise('pipeline', pipelineArray);

    expect(reqBody).toEqual({
      dataSource: process.env.MONGO_DATASOURCE,
      database: process.env.MONGO_DATABASE,
      collection: process.env.MONGO_COLLECTION,
      pipeline: pipelineArray,
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

  it('returns object', async () => {
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
