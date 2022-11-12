const supertest = require('supertest');

const app = require('../../../../src/index');

const request = supertest(app);

// describe('POST /api/users', () => {
//   it('should be able to save new user to database.', async () => {
//     const response = await request.post('/api/users').send('username=Alice');

//     expect(response.status).toBe(201);
//     expect(response.headers['content-type']).toMatch(/json/);
//     expect(response.body).toHaveProperty('_id');
//     expect(response.body).toHaveProperty('username');
//     expect(response.body).toHaveProperty('count');
//   });
// });

// describe('POST /api/users/:id/delete', () => {
//   it('should be able to delete existing user from database.', async () => {
//     const dummyUid = '000cdc92e23ac77d44d46333';
//     const url = `/api/users/${dummyUid}/delete`;
//     const response = await request.post(url).send({});

//     expect(response.status).toBe(200);
//     expect(response.headers['content-type']).toMatch(/json/);
//     expect(response.body).toHaveProperty('deletedCount');
//   });
// });

describe('POST /api/users/:id/exercises', () => {
  // test.only('should be able to add new exercise', async () => {
  //   const userId = '636e030126ea2349793f3d51';
  //   const desc = 'Swimming';
  //   const duration = 60;
  //   const dateInput = '2020-05-20';

  //   const url = `/api/users/${userId}/exercises`;
  //   const requestBody = {
  //     description: desc,
  //     duration: duration,
  //     date: dateInput,
  //   };

  //   const response = await request.post(url).send(requestBody);

  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty('username');
  //   expect(response.body).toHaveProperty('description');
  //   expect(response.body).toHaveProperty('duration');
  //   expect(response.body).toHaveProperty('date');
  //   expect(response.body).toHaveProperty('_id');
  // });

  // test.only('should be able to add new exercise', () => {
  //   const userId = '000cdc92e23ac77d44d46333';
  //   const desc = 'Test description.';
  //   const duration = 60;
  //   const dateInput = 'asf' ?? '';

  // const query = {_id: {$oid: dummyUid}};
  // const updates = {};
  // });

  it('should return error when user Id is invalid.', async () => {
    const dummyUid = '000cdc92e23ac77d44d46000';
    const desc = 'Some description';
    const duration = 60;
    const dateInput = '2020-12-11';

    const url = `/api/users/${dummyUid}/exercises`;
    const requestBody = {
      description: desc,
      duration: duration,
      date: dateInput,
    };
    const response = await request.post(url).send(requestBody);

    expect(response.body).toHaveProperty('userId');
    expect(response.body).toHaveProperty('error');
  });
});
