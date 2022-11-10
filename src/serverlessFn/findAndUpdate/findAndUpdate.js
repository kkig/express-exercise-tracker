async function findAndUpdate(request, response) {
  if (request.body === undefined)
    throw new Error(`Request body was not defined.`);

  // 1. Parse data from the incoming request
  const body = JSON.parse(request.body.text());

  // 2. Handle the request
  const mdb = context.services.get(body.dataSource);
  const db = mdb.db(body.database);
  const collection = db.collection(body.collection);

  body.filter._id = BSON.ObjectId(body.filter._id.$oid);

  try {
    const findOneRes = await collection.findOne(
      body.filter,
      body.projection || {}
    );

    const updateOneRes = await collection.updateOne(body.filter, body.update, {
      upsert: false,
    });

    if (findOneRes === null) {
      const data = {error: 'No user matching the ID.'};
      response.setStatusCode(201);
      response.setBody(
        JSON.stringify({
          data,
        })
      );

      return response;
    }

    const data = Object.assign(findOneRes, body.update.$push);
    response.setStatusCode(201);
    response.setBody(
      JSON.stringify({
        data,
      })
    );

    return response;
  } catch (err) {
    response.setStatusCode(400);
    response.setBody(JSON.stringify(err.message));
    return response;
  }
}

exports = findAndUpdate;

// export locally for test
if (typeof module !== 'undefined') {
  module.exports = {findAndUpdate};
}
