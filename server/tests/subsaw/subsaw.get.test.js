const supertest = require('supertest');
const app = require('@app');
const Subsaw = require('@models/subsaw');
const User = require('@models/user');
const { connectDB, disconnectDB } = require('@utils/mongo');

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
    
    const name = "TestSubsaw"

    await agent.post('/api/s/').send({name})

    const res = await agent.get(`/api/s/TestSubsaw`).expect(200);
    
    expect(res.body.displayName).toBe(name);
    expect(res.body.name).toBe(name.toLowerCase());
    expect(res.body.description).toBe("This community does not have a description yet.");
    expect(res.body.moderators).toBeDefined();
    expect(res.body._id).toBeDefined();
  });

  test('returns 404 if subsaw does not exist', async () => {
    const res = await api.get('/api/s/NonexistentSub').expect(404);
    expect(res.body.error).toBe('Subsaw not found');
  });

  test('handles case-insensitive lookup (if enabled)', async () => {

    await signup();
    
    const name = "TestSubsaw"
    const description = "A cool place"

    await agent.post('/api/s/').send({
      name: 'FunnyStuff',
      description: 'Haha yes',
    });

    const res = await api.get('/api/s/funnystuff').expect(200);
    expect(res.body.displayName).toBe('FunnyStuff');
  });

  test('returns isModerator = true if requester is a mod', async () => {
    await signup();
  
    const name = "TestSubsaw";
    const description = "Mod check";
  
    await agent.post('/api/s/').send({ name, description });
  
    const res = await agent.get(`/api/s/${name}`).expect(200);
    
    expect(res.body.isModerator).toBe(true);
  });
  
});
