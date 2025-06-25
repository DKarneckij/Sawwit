const supertest = require('supertest');
const app = require('@app');
const User = require('@models/user');
const Subsaw = require('@models/subsaw');
const { connectDB, disconnectDB } = require('@utils/mongo');

let agent;

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  await User.deleteMany({});
  await Subsaw.deleteMany({});
  agent = supertest.agent(app); // fresh agent per test
});

afterAll(async () => {
  await disconnectDB();
});

const signup = async () => {
  await agent.post('/api/auth/signup').send({
    username: 'subsawtester',
    email: 'subsaw@test.com',
    password: 'SubsawTest123'
  });
};

describe('POST /api/subsaws', () => {

  test('successfully creates a new subsaw with valid data and auth', async () => {

    await signup();

    const res = await agent
    .post('/api/s')
    .send({
      name: 'TestSubsaw',
      description: 'Testing...'
    });

    expect(res.status).toBe(201);
  });

  test('fails if name is missing', async () => {

    await signup();

    const res = await agent
      .post('/api/s')
      .send({ description: 'No name' })
      .expect(400);

    expect(res.body.error).toBeDefined();
  });

  test('fails if name is too short', async () => {
    await signup();

    const res = await agent
      .post('/api/s')
      .send({ name: 'ab', description: 'Too short' })
      .expect(400);

    expect(res.body.error).toBeDefined();
  });

  test('fails without auth token (unauthenticated)', async () => {
    // using a clean agent that hasn’t signed up
    const unauthenticated = supertest.agent(app);

    const res = await unauthenticated
      .post('/api/s')
      .send({ name: 'NoAuthSubsaw' })
      .expect(401);

    expect(res.body.error).toBe('Authentication required');
  });

  test('fails with duplicate subsaw name', async () => {
    await signup();

    await agent
      .post('/api/s')
      .send({ name: 'DuplicateName' })
      .expect(201);

    const res = await agent
      .post('/api/s')
      .send({ name: 'DuplicateName' })
      .expect(409);
    
    expect(res.body.error).toContain('already exists');
  });
});
