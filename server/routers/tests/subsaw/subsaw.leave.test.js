const supertest = require('supertest');
const app = require('@app');
const Subsaw = require('@models/subsaw');
const User = require('@models/user');
const { connectDB, disconnectDB } = require('../../utils/mongo');

const api = supertest(app);

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  await User.deleteMany({});
  await Subsaw.deleteMany({});

  const agent = supertest.agent(app);

  await agent.post('/api/auth/signup').send({
    username: 'subsawtester',
    displayName: 'subsawtester',
    email: 'subsaw@test.com',
    password: 'SubsawTest123'
  });

  await agent.post('/api/s').send({
    subsawName: 'TestSubsaw',
    description: 'Description'
  });
});

afterAll(async () => {
  await disconnectDB();
});

describe('POST /api/s/:name/leave', () => {
  test('User successfully leaves a subsaw', async () => {

    const agent = supertest.agent(app);

    await agent.post('/api/auth/signup').send({
      username: 'leaveUser',
      displayName: 'leaveUser',
      email: 'leave@test.com',
      password: 'SubsawTest123'
    });

    await agent.post('/api/s/testsubsaw/join').expect(200);
    
    const leaveRes = await agent.post('/api/s/testsubsaw/leave').expect(200);
    
    expect(leaveRes.body.message).toBe('Left subsaw successfully');

    const me = await agent.get('/api/auth/me');
    expect(me.body.subsawsJoined).not.toContainEqual(expect.objectContaining({ subsawName: 'testsubsaw' }));
  });

  test('User is not subscribed to the subsaw', async () => {
    const agent = supertest.agent(app);

    await agent.post('/api/auth/signup').send({
      username: 'notJoinedUser',
      displayName: 'notJoinedUser',
      email: 'nojoin@test.com',
      password: 'SubsawTest123'
    });

    const res = await agent.post('/api/s/testsubsaw/leave').expect(400);
    expect(res.body.error).toBe('You are not subscribed to this subsaw');
  });

  test('Unauthenticated user cannot leave a subsaw', async () => {
    const agent = supertest.agent(app)
    const res = await agent.post('/api/s/testsubsaw/leave').expect(401);
    expect(res.body.error).toBe('Authentication required');
  });

  test('Subsaw does not exist', async () => {
    const agent = supertest.agent(app);

    await agent.post('/api/auth/signup').send({
      username: 'ghost',
      displayName: 'ghost',
      email: 'ghost@test.com',
      password: 'SubsawTest123'
    });

    const res = await agent.post('/api/s/ghostsubsaw/leave').expect(404);
    expect(res.body.error).toBe('Subsaw not found');
  });

  test('Invalid or missing subsaw name', async () => {
    const agent = supertest.agent(app);

    await agent.post('/api/auth/signup').send({
      username: 'badparam',
      displayName: 'badparam',
      email: 'badparam@test.com',
      password: 'SubsawTest123'
    });

    const res = await agent.post('/api/s/!!!/leave').expect(404);
    expect(res.body.error || res.body.errors[0].msg).toMatch("Subsaw not found");
  });
});
