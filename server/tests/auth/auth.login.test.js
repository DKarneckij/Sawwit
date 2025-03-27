const supertest = require('supertest');
const app = require('@app');
const User = require('@models/user');

const api = supertest(app);
const { connectDB, disconnectDB } = require('@utils/mongo');

// Helper to create a new user
const createTestUser = async ({ email, username, password }) => {
  const bcrypt = require('bcrypt');
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ email, username, passwordHash });
  return await user.save();
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

describe('POST /api/auth/login', () => {
  test('logs in successfully with correct email', async () => {
    const email = 'test@example.com';
    const username = 'testuser';
    const password = 'supersecret';

    await createTestUser({ email, username, password });

    const res = await api
      .post('/api/auth/login')
      .send({ identifier: email, password })
      .expect(200);

    expect(res.body.email).toBe(email);
    expect(res.body.username).toBe(username);
  });

  test('logs in successfully with correct username', async () => {
    const email = 'userbyname@example.com';
    const username = 'userbyname';
    const password = 'mypassword';

    await createTestUser({ email, username, password });

    const res = await api
      .post('/api/auth/login')
      .send({ identifier: username, password })
      .expect(200);

    expect(res.body.email).toBe(email);
    expect(res.body.username).toBe(username);
  });

  test('fails login with wrong password', async () => {
    await createTestUser({
      email: 'wrongpass@example.com',
      username: 'wrongpassuser',
      password: 'correctpassword'
    });

    const res = await api
      .post('/api/auth/login')
      .send({ identifier: 'wrongpass@example.com', password: 'wrongpassword' })
      .expect(401);

    expect(res.body.error).toBeDefined();
  });

  test('fails login with non-existent user', async () => {
    const res = await api
      .post('/api/auth/login')
      .send({ identifier: 'doesnotexist@example.com', password: 'whatever' })
      .expect(401);

    expect(res.body.error).toBeDefined();
  });

  test('fails login with missing identifier or password', async () => {
    const res = await api
      .post('/api/auth/login')
      .send({ identifier: 'incomplete@example.com' }) // missing password
      .expect(400);

    expect(res.body.error).toBeDefined();
  });
});
