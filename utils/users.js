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

function reqBodyPromise(field, val) {
  return new Promise((resolve, reject) => {
    const reqBody = generateNewReqBody(field, val);
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

function generateDateObj(dateInput) {
  const fallbackVal = new Date().toUTCString();

  if (dateInput === '') return fallbackVal;

  const date = new Date(dateInput);
  if (date === 'Invalid Date') return fallbackVal;

  return date.toUTCString();
}

module.exports = {
  reqBodyPromise,
  generateNewReqBody,
  generateAxiosConfig,
  generateDateObj,
};
