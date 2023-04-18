const usersUtils = require('./users');

require('dotenv').config();

// describe('generateDateObj()', () => {
//   it('returns valid Date object', () => {
//     const date = usersUtils.generateDateObj('2022-12-22').toISOString();

//     expect(date).toBe('2022-12-22T00:00:00.000Z');
//   });

//   it('returns Date object when property is empty', () => {
//     const date = usersUtils.generateDateObj('');

//     expect(typeof date).not.toBeNull();
//   });
// });

describe('getDataApiBody()', () => {
  it('returns object without properties for request body', async () => {
    const reqBody = await usersUtils.getDataApiBody();
    const exercTrackerDb = new usersUtils.exercTrackerDb();

    expect(reqBody).toEqual(exercTrackerDb);
  });

  it('returns object when properties are present', async () => {
    const projectObj = {_id: 1, username: 1};

    const reqBody = await usersUtils.getDataApiBody({projection: projectObj});
    const exercTrackerDb = new usersUtils.exercTrackerDb();
    exercTrackerDb.projection = projectObj;

    expect(reqBody).toEqual(exercTrackerDb);
  });

  it('returns object for aggregation when property is array', async () => {
    const pipelineArray = [
      {$project: {_id: 1, username: 1}},
      {$sort: {count: 1}},
    ];

    const reqBody = await usersUtils.getDataApiBody({pipeline: pipelineArray});
    const exercTrackerDb = new usersUtils.exercTrackerDb();
    exercTrackerDb.pipeline = pipelineArray;

    expect(reqBody).toEqual(exercTrackerDb);
  });
});

describe('getDataApiConfig()', () => {
  it('returns object for /aggregate request', async () => {
    const pipeline = [
      {filter: {_id: 'asdf'}, projection: {_id: 1, username: 1}},
    ];

    const exercTrackerDb = new usersUtils.exercTrackerDb();
    exercTrackerDb.pipeline = pipeline;

    const config = await usersUtils.getDataApiConfig('aggregate', {
      pipeline: pipeline,
    });

    expect(config).toEqual({
      method: 'post',
      url: process.env.MONGO_DATA_API_URI + '/action/aggregate',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': process.env.MONGO_DATA_API_KEY,
      },
      data: JSON.stringify(exercTrackerDb),
    });
  });

  it('returns object for /find request', async () => {
    const projection = {_id: 1, username: 1};
    const exercTrackerDb = new usersUtils.exercTrackerDb();
    exercTrackerDb.projection = projection;

    const config = await usersUtils.getDataApiConfig('find', {
      projection: {_id: 1, username: 1},
    });

    expect(config).toEqual({
      method: 'post',
      url: process.env.MONGO_DATA_API_URI + '/action/find',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': process.env.MONGO_DATA_API_KEY,
      },
      data: JSON.stringify(exercTrackerDb),
    });
  });
});
