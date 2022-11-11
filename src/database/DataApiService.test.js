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

describe('DataApiService.insertOne', () => {
  it('should throw error when prop is empty.', async () => {
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
      filter: {_id: {$oid: '666cdc92e23ac77d44d46333'}},
    });
    expect(response).toEqual({deletedCount: expect.any(Number)});
  });
});
