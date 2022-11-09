const axios = require('axios');

require('dotenv').config();
const {findAndUpdate, sanpleFn} = require('./findAndUpdate');

jest.mock('axios');

// Mock Services for Functions
beforeEach(() => {
  global.request = {
    body: {
      text: JSON.stringify({
        dataSource: process.env.MONGO_DATASOURCE,
        database: process.env.MONGO_DATABASE,
        collection: process.env.MONGO_COLLECTION,
        filter: {_id: 'asdfasdf'},
      }),
    },
  };
  global.response = {};

  global.context = {
    services: {},
    // whichever global context methods you want to mock.
    // 'services', 'functions', values, etc.
  };

  global.BSON = {
    // mock methods
  };
});

// describe('findAndUpdate()', () => {
//   it('throws error when body is empty.', () => {
//     global.request.body === undefined;
//     findAndUpdate().toThrow(new Error(`Request body was not defined.`));
//   });
// });

// removes context from global namespace after each test
afterEach(() => {
  delete global.context;
});

class Users {
  static all() {
    return axios.get('/users.json').then((resp) => resp.data);
  }
}

test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then((data) => expect(data).toEqual(users));
});

test('should perform operation using App Services globals', () => {
  // test function that uses context
});
