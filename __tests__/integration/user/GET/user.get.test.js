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

describe('GET /api/users/:_id/logs', () => {
  it('should be able to get user id from params', async () => {
    const userId = '636fb127e6dbef1498b60012';
    const url = `/api/users/${userId}/logs`;
    const response = await request.get(url);

    expect(response.status).toBe(200);
  });

  it('should return user object with log array', async () => {
    const userId = '636fb127e6dbef1498b60012';
    const url = `/api/users/${userId}/logs`;
    const response = await request.get(url);

    expect(response.body).toEqual(
      expect.objectContaining({
        username: expect.any(String),
        _id: expect.any(String),
        log: expect.any(Array),
        count: expect.any(Number),
      })
    );
  });

  it('should return count which patch to the number of exercises', async () => {
    const userId = '636fb127e6dbef1498b60012';
    const url = `/api/users/${userId}/logs`;
    const response = await request.get(url);

    const logLength = response.body.log.length;
    expect(response.body.count).toBe(logLength);
  });

  it('should return all exercises for the user', async () => {
    const userId = '636fb127e6dbef1498b60012';
    const url = `/api/users/${userId}/logs`;
    const response = await request.get(url);

    expect(response.body.log).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: expect.any(String),
          duration: expect.any(Number),
          date: expect.any(String),
        }),
      ])
    );
  });
});
