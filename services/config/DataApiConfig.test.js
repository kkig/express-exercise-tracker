const DataApiConfig = require('./DataApiConfig');
require('dotenv').config();

describe('DataApiConfig endpoints', () => {
  const dataApiConfig = new DataApiConfig();

  it('returns object with data api endpoint.', () => {
    const endpoint = dataApiConfig.getConfig('find', {filter: {_id: '3254'}});

    expect(endpoint.url).toBe(
      process.env.MONGO_DATA_API_BASE_URI + '/data/v1/action/' + 'find'
    );
  });

  it('returns object for custom https endpoint.', () => {
    const route = 'myApi';
    const endpoint = dataApiConfig.getConfig(
      {route: 'myApi'},
      {filter: {_id: '3254'}}
    );

    expect(endpoint.url).toBe(
      process.env.MONGO_DATA_API_BASE_URI + '/' + route
    );
  });
});

describe('DataApiConfig database keys', () => {
  it('should return request body with datasorce.', () => {
    const configObj = dataApiConfig.getConfig('find', {
      filter: {_id: '3254'},
    });
    const data = JSON.parse(configObj.data);

    expect(data.dataSource).toBe(process.env.MONGO_DATASOURCE);
  });
});
