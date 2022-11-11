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

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          username: expect.any(String),
        }),
      ])
    );

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body[0]).not.toHaveProperty('count');
    expect(response.body[0]).not.toHaveProperty('log');
  });
});

describe('POST /api/users', () => {
  it('should be able to save new user to database.', async () => {
    const response = await request.post('/api/users').send('username=Alice');

    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('username');
    expect(response.body).toHaveProperty('count');
  });
});

describe('POST /api/users/:id/delete', () => {
  it('should be able to delete existing user from database.', async () => {
    const dummyUid = '000cdc92e23ac77d44d46333';
    const endpoint = `/api/users/${dummyUid}/delete`;
    const response = await request.post(endpoint).send({});

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('deletedCount');
  });
});
