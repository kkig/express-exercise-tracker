const usersRoute = require('./users');

test('Jest setting is correct!', () => {
  expect(usersRoute.testJest()).toBe('Working :)');
});

test('Object will be returned.', () => {
  const newObj = users.generateNewReqBody('projection', {username: 1});
  expect(newObj).toBe({
    dataSource: process.env.MONGO_DATASOURCE,
    database: process.env.MONGO_DATABASE,
    collection: process.env.MONGO_COLLECTION,
    projection: {username: 1},
  });
});
