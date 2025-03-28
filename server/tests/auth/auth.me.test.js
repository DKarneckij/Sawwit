const supertest = require('supertest');
const app = require('@app');
const User = require('@models/user');
const { connectDB, disconnectDB } = require('@utils/mongo');

const api = supertest(app);

// Helper to create and log in a test user
const createAndLoginUser = async () => {
  const bcrypt = require('bcrypt');
  const password = 'MyTestPassword123';

  const user = new User({
    email: 'me@test.com',
    username: 'meuser',
    passwordHash: await bcrypt.hash(password, 10),
    displayName: 'meuser'
  });
  const savedUser = await user.save();

  const loginRes = await api
    .post('/api/auth/login')
    .send({ identifier: 'meuser', password });

  const cookie = loginRes.headers['set-cookie'];

  return { user: savedUser, cookie };
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
    const { user, cookie } = await createAndLoginUser();

    const res = await api
      .get('/api/auth/me')
      .set('cookie', cookie)
      .expect(200);

    expect(res.body).toMatchObject({
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      karma: 0
    });

    expect(res.body.profilePicture).toBeDefined();
  });

  test('fails with 401 if no cookie is present', async () => {
    const res = await api
      .get('/api/auth/me')
      .expect(401);

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
