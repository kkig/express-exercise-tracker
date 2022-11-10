const DataApiService = require('./DataApiService');

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
