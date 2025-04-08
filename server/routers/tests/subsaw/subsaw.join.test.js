const supertest = require('supertest');
const app = require('@app');
const Subsaw = require('@models/subsaw');
const User = require('@models/user');
const { connectDB, disconnectDB } = require('../../utils/mongo');

const api = supertest(app)

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

describe('POST /api/s/:name/join', () => {
  test('User successfully joins a subsaw', async () => {
    const joiningAgent = supertest.agent(app);

    // Signup the user
    await joiningAgent.post('/api/auth/signup').send({
      username: 'joining',
      displayName: 'joining',
      email: 'joining@test.com',
      password: 'SubsawTest123'
    });

    // Join the subsaw
    const joinRes = await joiningAgent.post('/api/s/testsubsaw/join').expect(200);
    const subsawId = joinRes.body.subsaw._id;
    
    // Fetch the current user to confirm the subsaw was joined
    const meRes = await joiningAgent.get('/api/auth/me').expect(200);
    const joinedSubs = meRes.body.subsawsJoined.map(sub => sub._id || sub); // handle populated or not

    // Check if the joined subsaw matches what was returned
    expect(joinedSubs).toContain(subsawId);
  });

  test('User is already subscribed', async () => {
    const agent = supertest.agent(app);
  
    await agent.post('/api/auth/signup').send({
      username: 'rejoiner',
      displayName: 'rejoiner',
      email: 'rejoiner@test.com',
      password: 'SubsawTest123'
    });
  
    // First join
    await agent.post('/api/s/testsubsaw/join').expect(200);
  
    // Second join attempt
    const res = await agent.post('/api/s/testsubsaw/join').expect(200);
  
    expect(res.body.message).toBe('Already joined');
  });
  
  test('Unauthenticated/Logged out user cannot join', async () => {
    const res = await api.post('/api/s/testsubsaw/join').expect(401);
    expect(res.body.error).toBe('Authentication required');
  });

  test('Subsaw does not exist', async () => {

    const agent = supertest.agent(app);
  
    await agent.post('/api/auth/signup').send({
      username: 'missinguser',
      displayName: 'missinguser',
      email: 'missing@test.com',
      password: 'SubsawTest123'
    });
  
    const res = await agent.post('/api/s/thissubsawdoesntexist/join').expect(404);
    expect(res.body.error).toBe('Subsaw not found');
  });

  test('Invalid or missing subsaw name', async () => {
    const agent = supertest.agent(app);
  
    await agent.post('/api/auth/signup').send({
      username: 'invalidname',
      displayName: 'invalidname',
      email: 'invalid@test.com',
      password: 'SubsawTest123'
    });
  
    const res = await agent.post('/api/s/testing!/join').expect(404)
    expect(res.body.error).toBeDefined();
    expect(res.body.error).toMatch("Subsaw not found");
  });
  
  

});
