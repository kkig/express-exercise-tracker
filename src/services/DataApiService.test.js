const DataApiService = require('./DataApiService');
const UserData = require('../app/models/User');

const axios = require('axios');
jest.mock('axios');

describe('DataApiService.find', () => {
  it('should return documents array.', () => {
    const documents = [
      {_id: '12345', username: 'abc'},
      {_id: '12346', username: 'def'},
      {_id: '12347', username: 'ghi'},
    ];
    const docs = {documents: documents};
    const mockRes = {data: docs};

    axios.mockResolvedValue(mockRes);

    DataApiService.find().then((data) => expect(data).toEqual(documents));
  });
});

describe('DataApiService.insertOne', () => {
  it('should throw error when prop is empty.', async () => {
    expect.assertions(1);
    await expect(DataApiService.insertOne()).rejects.toEqual(
      new Error('No doc to insert to database.')
    );
  });

  it('should be able to add document to database.', async () => {
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
