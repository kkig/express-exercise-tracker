# Exercise Tracker

This is experimental project with Express and MongoDB.

## APIs

- **GET /api/users**: Get list of users. ID and username will be displayed for each user.
- **GET /api/users/:id/logs**: Get exercise log of a user representing the ID.

- **POST /api/users**: Create new user.
- **POST /api/users/:id/delete**: Delete a user with the ID.
- **POST /api/users/:id/exercises**: Add an exercise to the user with the ID.

## MongoDB

**Data API:** The project use Data API of MongoDB. See [documentation](https://www.mongodb.com/docs/atlas/api/data-api/) for more details.

**Custom HTTPS Endpoint in MongoDB:**

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
