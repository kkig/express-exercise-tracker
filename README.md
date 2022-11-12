# Exercise Tracker

This is the boilerplate for the Exercise Tracker project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker

## MongoDB

**Data API:** The project use Data API of MongoDB. See [documentation](https://www.mongodb.com/docs/atlas/api/data-api/) for more details.

**Custom HTTPS Endpoint:**

- POST /findAndUpdate
  Responses are below.

Successfully added new excersise log.

```
{"_id":"__OBJECT_ID__","username":"Alice","description":"Biking","duration":60,"date":"2001-10-25T00:00:00.000Z"}
```

No matching user ID sent to the request.

```
{"userId":"_OBJECT_ID_SENT_","error":"No user matching the User ID."}
```
