const supertest = require('supertest');
const app = require('@app');
const User = require('@models/user');
const { connectDB, disconnectDB } = require('@utils/mongo');
const api = supertest(app);

// Helper to create and log in a user
const createAndLoginUser = async () => {
  const bcrypt = require('bcrypt');
  const password = 'logoutPass123';
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    email: 'logout@test.com',
    username: 'logoutUser',
    displayName: 'logoutuser',
    passwordHash
  });
  await user.save();

  return await api.post('/api/auth/login').send({
    identifier: 'logoutUser',
    password
  });
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
    const loginRes = await createAndLoginUser();
    const cookies = loginRes.headers['set-cookie'];
    expect(cookies).toBeDefined();

    const logoutRes = await api
      .post('/api/auth/logout')
      .set('Cookie', cookies)
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