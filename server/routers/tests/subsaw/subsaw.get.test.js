const supertest = require('supertest');
const app = require('../../app');
const Subsaw = require('../../models/subsaw');
const User = require('../../models/user');
const { connectDB, disconnectDB } = require('../../utils/mongo');

const api = supertest(app);

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

describe('GET /api/s/:name', () => {

  test('returns subsaw info when it exists', async () => {

    await signup();
    
    const subsawName = "TestSubsaw"
    const description = "A cool place"
    
    await agent.post('/api/s/').send({subsawName, description})

    const res = await agent.get(`/api/s/TestSubsaw`).expect(200);

    expect(res.body.displayName).toBe(subsawName);
    expect(res.body.subsawName).toBe(subsawName.toLowerCase());
    expect(res.body.description).toBe('A cool place');
    expect(res.body.moderators).toBeDefined();
    expect(res.body.id).toBeDefined();
  });

  test('returns 404 if subsaw does not exist', async () => {
    const res = await api.get('/api/s/NonexistentSub').expect(404);
    expect(res.body.error).toBe('Subsaw not found');
  });

  test('handles case-insensitive lookup (if enabled)', async () => {

    await signup();
    
    const subsawName = "TestSubsaw"
    const description = "A cool place"

    await agent.post('/api/s/').send({
      subsawName: 'FunnyStuff',
      description: 'Haha yes',
    });

    const res = await api.get('/api/s/funnystuff').expect(200);
    expect(res.body.displayName).toBe('FunnyStuff');
  });
});
