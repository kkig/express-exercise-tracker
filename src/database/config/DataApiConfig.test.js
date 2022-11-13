const {config} = require('dotenv');
const DataApiConfig = require('./DataApiConfig');
const dataApiConfig = new DataApiConfig();

require('dotenv').config();

describe('DataApiConfig database in req body.', () => {
  it('should return request body with datasorce.', () => {
    const option = {filter: {_id: '3254'}};
    const configObj = new DataApiConfig().getConfig('find', option);
    const requestBody = JSON.parse(configObj.data);

    expect(requestBody.dataSource).toBe(process.env.MONGO_DATASOURCE);
    expect(requestBody.database).toBe(process.env.MONGO_DATABASE);
    expect(requestBody.collection).toBe(process.env.MONGO_COLLECTION);
  });
});

describe('DataApiConfig headers.', () => {
  it('should return headers with api key.', () => {
    const option = {filter: {_id: '3254'}};
    const configObj = new DataApiConfig().getConfig('find', option);

    expect(configObj.headers['api-key']).toBe(process.env.MONGO_DATA_API_KEY);
  });

  it('should return headers with Content-Type', () => {
    const option = {filter: {_id: '3254'}};
    const configObj = new DataApiConfig().getConfig('find', option);

    expect(configObj.headers['Content-Type']).toBe('application/json');
  });
});

describe('DataApiConfig + find', () => {
  it('should be able to create config for "find" request.', () => {
    const configObj = new DataApiConfig().getConfig('find', {
      filter: {_id: '3254'},
    });
    const url = '/data/v1/action/' + 'find';

    expect(configObj.url).toBe(url);
  });
});

describe('DataApiConfig + findOne', () => {
  it('should be able to create config with url.', () => {
    const query = {_id: '3254'};
    const options = {filter: query};

    const configObj = new DataApiConfig().getConfig('findOne', options);
    const url = '/data/v1/action/' + 'findOne';

    expect(configObj.url).toBe(url);
  });

  it('should be able to return config with options', () => {
    const query = {_id: '3254'};
    const options = {filter: query};

    const configObj = new DataApiConfig().getConfig('findOne', options);
    const requestBody = JSON.parse(configObj.data);

    expect(requestBody.filter).toEqual(query);
  });
});

describe('DataApiConfig + insertOne', () => {
  it('should be able to create config with url.', () => {
    const doc = {username: 'John Tanaka'};
    const options = {document: doc};

    const configObj = new DataApiConfig().getConfig('insertOne', options);
    const url = '/data/v1/action/' + 'insertOne';

    expect(configObj.url).toBe(url);
  });

  it('should be able to return config with options', () => {
    const doc = {username: 'John Tanaka'};
    const options = {document: doc};

    const configObj = new DataApiConfig().getConfig('insertOne', options);
    const requestBody = JSON.parse(configObj.data);

    expect(requestBody.document).toEqual(doc);
  });
});

describe('DataApiConfig + deleteOne', () => {
  it('should be able to create config with url.', () => {
    const query = {_id: 'abcd'};
    const options = {filter: query};

    const configObj = new DataApiConfig().getConfig('deleteOne', options);
    const url = '/data/v1/action/' + 'deleteOne';

    expect(configObj.url).toBe(url);
  });

  it('should be able to return config with options', () => {
    const query = {_id: 'abcd'};
    const options = {filter: query};

    const configObj = new DataApiConfig().getConfig('insertOne', options);
    const requestBody = JSON.parse(configObj.data);

    expect(requestBody.filter).toEqual(query);
  });
});

describe('DataApiConfig + findAndUpdate', () => {
  it('should be able to return config with custom https url.', () => {
    const customRoute = 'findAndUpdate';
    const route = {route: customRoute};
    const query = {_id: '3254'};
    const filter = {filter: query};

    const configObj = new DataApiConfig().getConfig(route, filter);

    expect(configObj.url).toBe('/' + customRoute);
  });

  it('should return config with filter and update', () => {
    const customRoute = 'findAndUpdate';
    const route = {route: customRoute};
    const query = {_id: '3254'};
    const update = {$inc: {count: 1}};

    const options = {filter: query, update: update};

    const configObj = new DataApiConfig().getConfig(route, options);
    const requestBody = JSON.parse(configObj.data);

    expect(requestBody.filter).toEqual(query);
    expect(requestBody.update).toEqual(update);
  });
});
