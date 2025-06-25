const supertest = require('supertest');
const app = require('@app');
const User = require('@models/user');
const { connectDB, disconnectDB } = require('@utils/mongo');

const api = supertest(app);

// ✅ Helper to sign up a test user and get an agent with cookies
const signupAndLoginUser = async () => {
  const agent = supertest.agent(app);

  const signupRes = await agent.post('/api/auth/signup').send({
    username: 'meuser',
    displayName: 'meuser',
    email: 'me@test.com',
    password: 'MyTestPassword123'
  }).expect(201);

  const user = await User.findOne({ username: 'meuser' });

  return { agent, user };
};

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await disconnectDB();
});

describe('GET /api/auth/me', () => {
  test('returns user data when logged in with cookie', async () => {
    const { agent, user } = await signupAndLoginUser();

    const res = await agent.get('/api/auth/me').expect(200);

    expect(res.body).toMatchObject({
      _id: user._id.toString(), // use _id if you're not transforming to id
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      profilePicture: user.profilePicture,
      karma: user.karma,
    });

    expect(res.body.profilePicture).toBeDefined();
    expect(Array.isArray(res.body.subsawsJoined)).toBe(true);
  });

  test('fails with 401 if no cookie is present', async () => {
    const res = await api.get('/api/auth/me').expect(401);
    expect(res.body.error).toBe('Authentication required');
  });

  test('fails with 401 if token is invalid', async () => {
    const res = await api
      .get('/api/auth/me')
      .set('Cookie', ['token=invalid.token.here'])
      .expect(401);

    expect(res.body.error).toBe('Invalid or expired token');
  });
});
