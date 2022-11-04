class exercTrackerDb {
  constructor() {
    this.dataSource = process.env.MONGO_DATASOURCE;
    this.database = process.env.MONGO_DATABASE;
    this.collection = process.env.MONGO_COLLECTION;
  }
}

function getDataApiBody(obj) {
  const generateBodyPromise = new Promise((resolve, reject) => {
    if (obj) {
      const newReqBody = new exercTrackerDb();
      const requestBody = Object.assign(newReqBody, obj);

      // newReqBody[field] = val;

      resolve(requestBody);
    } else {
      const newReqBody = new exercTrackerDb();
      resolve(newReqBody);
    }
  });

  return generateBodyPromise;
}

async function getDataApiConfig(operation, obj) {
  const requestBody = await getDataApiBody(obj);

  const config = {
    method: 'post',
    url: process.env.MONGO_DATA_API_URI + '/action/' + operation,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': process.env.MONGO_DATA_API_KEY,
    },
    data: JSON.stringify(requestBody),
  };

  return config;
}

// function generateDateObj(dateInput) {
//   const fallbackVal = new Date();
//   const date = new Date(dateInput);

//   if (dateInput === '' || date === 'Invalid Date') return fallbackVal;

//   return date;
// }

module.exports = {
  getDataApiBody,
  //   generateDateObj,
  getDataApiConfig,
  exercTrackerDb,
};
