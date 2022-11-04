function exercTrackerDb() {
  this.dataSource = process.env.MONGO_DATASOURCE;
  this.database = process.env.MONGO_DATABASE;
  this.collection = process.env.MONGO_COLLECTION;
}

function getDataApiBody(field, val) {
  const generateBodyPromise = new Promise((resolve, reject) => {
    try {
      if (field && val) {
        const newReqBody = new exercTrackerDb();
        newReqBody[field] = val;

        resolve(newReqBody);
      } else {
        const newReqBody = new exercTrackerDb();
        resolve(newReqBody);
      }
    } catch (error) {
      reject(err);
    }
  });

  return generateBodyPromise;
}

async function getDataApiConfig(operation, field, val) {
  const requestBody = await getDataApiBody(field, val);

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
