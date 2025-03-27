const supertest = require('supertest');
const app = require('../../app');
const Subsaw = require('../../models/subsaw');
const User = require('../../models/user');
const { connectDB, disconnectDB } = require('../../utils/mongo');

const api = supertest(app);

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  await Subsaw.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await disconnectDB();
});

// ✅ Helper to create test users
const createTestUser = async ( username ) => {
  return await api.post('/api/auth/signup').send({
    username: username,
    emai: 'username@gmail.com',
    password: 'password'
  })
};

describe('GET /api/s/:name', () => {

  test.only('returns subsaw info when it exists', async () => {

    const user = await createTestUser('moduser');
    
    const subsawName = "TestSubsaw"
    const description = "A cool place"
    console.log('test');
    
    const subsaw = await api.post('api/s/').send({name: subsawName, description})

    console.log('test');
    

    const res = await api.get(`api/s/${subsawName}`).expect(200);

    expect(res.body.name).toBe('TestSubsaw');
    expect(res.body.description).toBe('A cool place');
    expect(res.body.moderators).toBeDefined();
    expect(res.body.id).toBeDefined();
  });

  test('returns 404 if subsaw does not exist', async () => {
    const res = await api.get('/api/s/NonexistentSub').expect(404);
    expect(res.body.error).toBe('Subsaw not found');
  });

  test('handles case-insensitive lookup (if enabled)', async () => {

    const user = await createTestUser('moduser2');

    const subsaw = await Subsaw.create({
      name: 'FunnyStuff',
      description: 'Haha yes',
      moderators: [user._id]
    });

    const res = await api.get('/api/s/funnystuff').expect(200);
    expect(res.body.name).toBe('FunnyStuff');
  });
});
