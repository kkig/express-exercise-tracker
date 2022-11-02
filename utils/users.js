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

function reqBodyPromise(key, obj) {
  return new Promise((resolve, reject) => {
    const reqBody = generateNewReqBody(key, obj);
    resolve(reqBody);

    reject(new Error('Error generating request body.'));
  });
}

function AxiosConfig(method, action, reqBody) {
  this.method = method;
  this.url = process.env.MONGO_DATA_API_URI + '/action/' + action;
  this.headers = {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key': process.env.MONGO_DATA_API_KEY,
  };
  this.data = JSON.stringify(reqBody);
}

function generateAxiosConfig(method, action, reqBody) {
  return new Promise((resolve, reject) => {
    resolve(new AxiosConfig(method, action, reqBody));

    reject(new Error('Error generating Axios config obj.'));
  });
}

module.exports = {reqBodyPromise, generateNewReqBody, generateAxiosConfig};
