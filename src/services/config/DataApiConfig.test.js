const DataApiConfig = require('./DataApiConfig');
const dataApiConfig = new DataApiConfig();

require('dotenv').config();

describe('DataApiConfig url.', () => {
  it('should return object with data api url.', () => {
    const configObj = dataApiConfig.getConfig('find', {filter: {_id: '3254'}});
    const endpoint =
      process.env.MONGO_DATA_API_BASE_URI + '/data/v1/action/' + 'find';

    expect(configObj.url).toBe(endpoint);
  });

  it('should return object for custom https endpoint.', () => {
    const customRoute = 'myApi';
    const filter = {_id: '3254'};
    const configObj = dataApiConfig.getConfig(
      {route: customRoute},
      {filter: filter}
    );
    const endpoint = process.env.MONGO_DATA_API_BASE_URI + '/' + customRoute;

    expect(configObj.url).toBe(endpoint);
  });
});

describe('DataApiConfig database in req body.', () => {
  it('should return request body with datasorce.', () => {
    const configObj = dataApiConfig.getConfig('find', {
      filter: {_id: '3254'},
    });
    const requestBody = JSON.parse(configObj.data);

    expect(requestBody.dataSource).toBe(process.env.MONGO_DATASOURCE);
    expect(requestBody.database).toBe(process.env.MONGO_DATABASE);
    expect(requestBody.collection).toBe(process.env.MONGO_COLLECTION);
  });
});

describe('DataApiConfig pipelines.', () => {
  it('should return request body for a pipeline.', () => {
    const configObj = dataApiConfig.getConfig('find', {filter: {_id: '3254'}});
    const requestBody = JSON.parse(configObj.data);

    expect(requestBody).toHaveProperty('filter');
    expect(requestBody.filter).toEqual({_id: '3254'});
  });

  it('should return request body for multiple pipelines.', () => {
    const pipelines = {
      projection: {username: 1, _id: 1, exercise: 1},
      limit: 5,
    };
    const configObj = dataApiConfig.getConfig('find', pipelines);
    const requestBody = JSON.parse(configObj.data);

    expect(requestBody).toHaveProperty('projection');
    expect(requestBody).toHaveProperty('limit');
  });
});
