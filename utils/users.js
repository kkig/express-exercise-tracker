function testFn() {
  return 'Hello test';
}

function DbReqBody() {
  this.dataSource = process.env.MONGO_DATASOURCE;
  this.database = process.env.MONGO_DATABASE;
  this.collection = process.env.MONGO_COLLECTION;
}

function generateNewReqBody(key, obj) {
  if (key && obj) {
    const newReqBody = new DbReqBody();
    newReqBody[key] = obj;

    return newReqBody;
  } else {
    return new DbReqBody();
  }
}

module.exports = {testFn, generateNewReqBody};
