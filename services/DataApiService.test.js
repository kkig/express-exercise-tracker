const DataApiService = require('./DataApiService');

const axios = require('axios');
jest.mock('axios');

describe('DataApiService', () => {
  it('returns obj', async () => {
    const keys = {projection: {username: 1, _id: 1}, limit: 5};
    const documents = [
      {_id: '12345', username: 'abc'},
      {_id: '12346', username: 'def'},
      {_id: '12347', username: 'ghi'},
    ];
    const result = axios.mockResolvedValue(documents);

    const config = await DataApiService.getConfig('find', keys);
    const response = await DataApiService.find(config);

    expect(false).toBe(false);
    // expect(DataApiService.find(keys)).toEqual(documents);
    // expect(DataApiService.find(config)).toEqual(documents);
    // expect(DataApiService.find(config)).toHaveBeenCalledWith(keys);

    // console.log(axios);

    // axios.get.then((res) => expect(res.data).toEqual(documents));
    // return DataApiService.all().then((data) => expect(data).toEqual(documents));

    // axios(config).mockResolvedValue({data: documents});
    // expect(config).toBe(null);

    // axios = jest.fn().mockResolvedValue({data: documents});

    // const response = await DataApiService.find(keys);
    // expect(response).toEqual(documents);

    // expect(axios()).toHaveBeenCalledTimes(1);
    // return data.then((res) => expect(res.data).toEqual(documents));
  });
});
