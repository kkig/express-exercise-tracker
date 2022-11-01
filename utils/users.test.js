const usersUtils = require('./users');

require('dotenv').config();

test('when there is no properties, it should return object', () => {
  expect(usersUtils.generateNewReqBody()).toEqual({
    dataSource: process.env.MONGO_DATASOURCE,
    database: process.env.MONGO_DATABASE,
    collection: process.env.MONGO_COLLECTION,
  });
});

test('when there are properties, it should return object', () => {
  expect(
    usersUtils.generateNewReqBody('projection', {_id: 1, username: 1})
  ).toEqual({
    dataSource: process.env.MONGO_DATASOURCE,
    database: process.env.MONGO_DATABASE,
    collection: process.env.MONGO_COLLECTION,
    projection: {_id: 1, username: 1},
  });
});
