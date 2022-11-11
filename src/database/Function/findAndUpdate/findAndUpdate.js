function getCollection(reqBody) {
  const mdb = context.services.get(reqBody.dataSource);
  const db = mdb.db(reqBody.database);
  const collection = db.collection(reqBody.collection);

  return collection;
}

async function findAndUpdate(request, response) {
  if (request.body === undefined)
    throw new Error(`Request body was not defined.`);

  // 1. Parse data from the incoming request
  const body = JSON.parse(request.body.text());

  // 2. Handle the request
  const collection = getCollection(body);
  body.filter._id = BSON.ObjectId(body.filter._id.$oid);

  try {
    const query = body.filter;
    const update = body.update;
    const options = {
      returnNewDocument: true,
      upsert: false,
      projection: {username: 1, _id: 1},
    };

    const updatedDoc = await collection.findOneAndUpdate(
      query,
      update,
      options
    );

    if (updatedDoc) {
      const exercise = update.$push.log;
      const newExercise = Object.assign(updatedDoc, exercise);

      response.setStatusCode(201);
      response.setBody(JSON.stringify(newExercise));

      return response;
    } else {
      const uid = body.filter._id;
      const data = {userId: uid, error: 'No user matching the User ID.'};
      response.setStatusCode(200);
      response.setBody(JSON.stringify({data}));

      return response;
    }
  } catch (err) {
    response.setStatusCode(500);
    response.setBody(JSON.stringify(err.message));
    return response;
  }
}

exports = findAndUpdate;

// export locally for test
if (typeof module !== 'undefined') {
  module.exports = {findAndUpdate, getCollection};
}
