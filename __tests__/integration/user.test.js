const supertest = require('supertest');

const app = require('../../src/index');

const request = supertest(app);

describe('GET /', () => {
  it('should return 200.', async () => {
    const response = await request.get('/');

    expect(response.status).toBe(200);
  });
});

describe('GET /api/users', () => {
  it('should return user list.', async () => {
    const response = await request.get('/api/users');

    // const response = await request
    // .get('/api/users')
    // .send('name=john') // x-www-form-urlencoded upload
    // .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    // expect(response.headers['Content-Type']).toMatch(/json/);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          username: expect.any(String),
        }),
      ])
    );

    expect(response.body[0]).not.toHaveProperty('count');
    expect(response.body[0]).not.toHaveProperty('log');
  });
});

describe('POST /api/users', () => {
  it('should be able to save new user to database.', async () => {
    const response = await request.post('/api/users').send('username=Alice');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('username');
    expect(response.body).toHaveProperty('count');
  });
});
