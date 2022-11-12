const supertest = require('supertest');

const app = require('../../../../src/index');

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
