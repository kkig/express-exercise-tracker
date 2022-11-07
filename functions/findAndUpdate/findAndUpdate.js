// const updateOnePromise = new Promise((resolve, reject) => {
//   const updateApiRes = collection.updateOne(body.filter, body.update);

//   resolve(updateApiRes);
// });

function sanpleFn() {
  return 'Hit!';
}

async function findAndUpdate(request, response) {
  try {
    // 1. Parse data from the incoming request
    if (request.body === undefined)
      throw new Error(`Request body was not defined.`);

    const body = JSON.parse(request.body.text());

    // 2. Handle the request
    const mdb = context.services.get(body.dataSource);
    const db = mdb.db(body.database);
    const collection = db.collection(body.collection);

    body.filter._id = BSON.ObjectId(body.filter._id.$oid);
    const findApiRes = await collection.findOne(
      body.filter,
      body.projection || {}
    );
    // const data = await collection.find({"count": {"$gt": 0}}).toArray();
    // const data = await collection.aggregate( [{$match: { _id: BSON.ObjectId("635f61885a33233a22577d1f") } }, {$project: {_id: 1, username: 1, count: 1}}] ).toArray();

    // body.pipeline[0].$match._id = BSON.ObjectId(body.pipeline[0].$match._id.$oid);
    // const data = await collection.aggregate(body.pipeline).toArray();

    // 3. Configure the response
    // if (findApiRes === null) {
    //   const data = {error: 'No user matching the ID.'};
    //   response.setStatusCode(201);
    //   return response.setBody(
    //     JSON.stringify({
    //       data,
    //     })
    //   );
    // } else {
    //   updateOnePromise().then((updateApiRes) => {
    //     const {matchedCount, modifiedCount} = updateApiRes;

    //     if (matchedCount && modifiedCount) {
    //       const data = JSON.parse(JSON.stringify(findApiRes));
    //       response.setStatusCode(201);
    //       response.setBody(
    //         JSON.stringify({
    //           updateApiRes,
    //           data,
    //         })
    //       );
    //     } else {
    //       response.setStatusCode(201);
    //       response.setBody(
    //         JSON.stringify({
    //           updateApiRes,
    //         })
    //       );
    //     }
    //   });
    //   // const updateApiRes = collection.updateOne(body.filter, body.update);
    // }
  } catch (err) {
    response.setStatusCode(400);
    response.setBody(err.message);
  }
}

exports = findAndUpdate;

// export locally for test
if (typeof module !== 'undefined') {
  module.exports = {findAndUpdate, sanpleFn};
}
