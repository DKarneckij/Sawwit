const supertest = require('supertest');
const app = require('@app');
const User = require('@models/user');
const { connectDB, disconnectDB } = require('@utils/mongo');

const api = supertest(app);

// ✅ New helper to signup + login a user
const signupAndLoginUser = async () => {
  const agent = supertest.agent(app);

  const signupRes = await agent.post('/api/auth/signup').send({
    username: 'kirbussy',
    displayName: 'Kirbussy',
    email: 'kirbussy@test.com',
    password: 'securePassword123'
  }).expect(201);

  return agent;
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

describe('POST /api/auth/logout', () => {
  test('clears the auth token cookie', async () => {
    const agent = await signupAndLoginUser();

    const logoutRes = await agent
      .post('/api/auth/logout')
      .expect(200);

    expect(logoutRes.body.message).toBe('Logged out successfully');

    const clearedCookie = logoutRes.headers['set-cookie'].find((c) =>
      c.startsWith('token=') && c.includes('Expires=Thu, 01 Jan 1970')
    );

    expect(clearedCookie).toBeDefined();
  });

  test('logout still works even if not logged in (no token)', async () => {
    const res = await api.post('/api/auth/logout').expect(200);
    expect(res.body.message).toBe('Logged out successfully');
  });
});