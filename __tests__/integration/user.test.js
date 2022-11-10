const supertest = require('supertest');

const app = require('../../src/index');

const request = supertest(app);

describe('GET /api/users', () => {
  test('Test super test', async () => {
    const response = await request.get('/api/users');

    // const response = await request
    // .get('/api/users')
    // .send('name=john') // x-www-form-urlencoded upload
    // .set('Accept', 'application/json');

    expect(response.status).toBe(200);
  });
});

describe('POST /api/users', () => {
  it('should return status 200', async () => {
    const response = await request.post('/api/users').send({});

    expect(response.status).toBe(200);
  });
});
