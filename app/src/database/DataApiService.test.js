const DataApiService = require('./DataApiService');
const UserData = require('../app/models/User');

const axios = require('axios');
jest.mock('axios');

describe('DataApiService.find', () => {
  it('should return documents array.', async () => {
    const documents = [
      {_id: '12345', username: 'abc'},
      {_id: '12346', username: 'def'},
      {_id: '12347', username: 'ghi'},
    ];
    const docs = {documents: documents};
    const mockRes = {data: docs};

    axios.mockResolvedValue(mockRes);

    const response = await DataApiService.find();
    expect(response).toEqual(docs);
  });
});

describe('DataApiService.findOne', () => {
  it('should return a document.', async () => {
    const document = {_id: '12345', username: 'abc'};
    const mockRes = {data: document};

    axios.mockResolvedValue(mockRes);

    const query = {_id: '12345'};
    const projection = {_id: 1, username: 1};
    const response = await DataApiService.findOne(query, projection);

    expect(response).toBe(document);
  });

  it('should throw error when argument is empty.', async () => {
    expect.assertions(1);

    try {
      await DataApiService.findOne();
    } catch (err) {
      expect(err).toEqual(new Error('Query is missing.'));
    }
  });
});

describe('DataApiService.insertOne', () => {
  it('should throw error when argument is empty.', async () => {
    expect.assertions(1);
    await expect(DataApiService.insertOne()).rejects.toEqual(
      new Error('No document to insert to database.')
    );
  });

  it('should be able to add a document to database.', async () => {
    const userName = 'Alice';
    const newUser = new UserData({username: userName, count: 0}, {_id: false});
    const userDoc = {document: newUser};

    const expectedRes = {insertedId: expect.any(String)};
    const axiosRes = {data: expectedRes};
    axios.mockResolvedValue(axiosRes);

    expect.assertions(1);
    const response = await DataApiService.insertOne(userDoc);
    expect(response).toEqual({insertedId: expect.any(String)});
  });
});

describe('DataApiService.deleteOne', () => {
  it('should throw error when prop is empty.', async () => {
    expect.assertions(1);

    try {
      await DataApiService.deleteOne();
    } catch (err) {
      expect(err).toEqual(new Error('No document to delete.'));
    }
  });

  it('should be able to delete a document.', async () => {
    const expectedRes = {deletedCount: expect.any(Number)};
    const axiosRes = {data: expectedRes};
    axios.mockResolvedValue(axiosRes);

    expect.assertions(1);
    const response = await DataApiService.deleteOne({
      _id: {$oid: '__OBJECT__ID__'},
    });
    expect(response).toEqual({deletedCount: expect.any(Number)});
  });
});

describe('DataApiService.findAndUpdate', () => {
  it('should throw error when query is missing.', async () => {
    const errorMsg = 'Query and/or updates are missing to api call.';
    expect.assertions(1);

    try {
      await DataApiService.findAndUpdate();
    } catch (err) {
      expect(err).toEqual(new Error(errorMsg));
    }
  });

  it('should be able to find and update user log.', async () => {
    const expectedRes = {username: 'Alice', _id: '__OBJECT_ID__'};
    const axiosRes = {data: expectedRes};
    axios.mockResolvedValue(axiosRes);

    expect.assertions(1);
    const query = {_id: {$oid: '__OBJECT_ID__'}};
    const updates = {
      $inc: {count: 1},
      $push: {
        log: {
          description: 'Biking',
          duration: 120,
          date: '2001-10-23T00:00:00.000Z',
        },
      },
    };

    const response = await DataApiService.findAndUpdate(query, updates);
    expect(response).toEqual(expectedRes);
  });
});
