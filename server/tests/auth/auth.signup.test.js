const supertest = require('supertest');
const app = require('@app');
const User = require('@models/user');

const api = supertest(app);
const { connectDB, disconnectDB } = require('@utils/mongo');

beforeAll(async () => {
  await connectDB()
})

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await disconnectDB()
});

describe('Signup Route', () => {
  test('should create a new user with valid fields', async () => {
    const res = await api.post('/api/auth/signup').send({
      username: 'kirbussy',
      email: 'kirbussy@test.com',
      password: 'securePassword123'
    });

    expect(res.status).toBe(201);
    expect(res.body.username).toBe('kirbussy');
    expect(res.body.email).toBe('kirbussy@test.com');
    expect(res.body).not.toHaveProperty('password');
    expect(res.body).not.toHaveProperty('passwordHash');
  });

  test('should fail if required fields are missing', async () => {
    const res = await api.post('/api/auth/signup').send({
      username: '',
      email: '',
      password: ''
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('should fail if email format is invalid', async () => {
    const res = await api.post('/api/auth/signup').send({
      username: 'bademailuser',
      email: 'not-an-email',
      password: 'validPassword123'
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain('Invalid email format');
  });

  test('should fail if password is too short', async () => {
    const res = await api.post('/api/auth/signup').send({
      username: 'shortpassuser',
      email: 'short@pass.com',
      password: '123'
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain('Password must be between 8 and 24 characters');
  });

  test('should not allow duplicate email or username', async () => {
    const user = {
      username: 'dupeuser',
      email: 'dupe@test.com',
      password: 'validPassword123'
    };

    await api.post('/api/auth/signup').send(user);
    const res = await api.post('/api/auth/signup').send(user);

    expect(res.status).toBe(409);
  });
});
