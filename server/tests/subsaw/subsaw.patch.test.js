const supertest = require('supertest');
const app = require('@app');
const Subsaw = require('@models/subsaw');
const User = require('@models/user');
const { connectDB, disconnectDB } = require('@utils/mongo');

const agent = supertest.agent(app);
let subsawName = "PatchTestSub";

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  await User.deleteMany({});
  await Subsaw.deleteMany({});

  // Sign up + login
  await agent.post('/api/auth/signup').send({
    username: 'moduser',
    email: 'moduser@test.com',
    password: 'PatchTest123',
  });

  // Create subsaw
  await agent.post('/api/s').send({
    subsawName,
    description: 'Original description',
  });
});

afterAll(async () => {
  await disconnectDB();
});

describe('PATCH /api/s/:name', () => {

  test('allows moderator to update description', async () => {
    const res = await agent
      .patch(`/api/s/${subsawName}`)
      .send({ description: 'Updated description' })
      .expect(200);

    expect(res.body.description).toBe('Updated description');
  });

  test('allows updating bannerUrl and pfpUrl', async () => {
    const bannerUrl = 'https://cdn.example.com/banner.jpg';
    const pfpUrl = 'https://cdn.example.com/pfp.png';

    const res = await agent
      .patch(`/api/s/${subsawName}`)
      .send({ bannerUrl, pfpUrl })
      .expect(200);

    expect(res.body.bannerUrl).toBe(bannerUrl);
    expect(res.body.pfpUrl).toBe(pfpUrl);
  });

  test('returns 403 if non-mod tries to update', async () => {
    // Log out and sign up as another user
    await agent.post('/api/auth/logout');
    await agent.post('/api/auth/signup').send({
      username: 'nonmod',
      email: 'nonmod@test.com',
      password: 'Nope123',
    });

    const res = await agent
      .patch(`/api/s/${subsawName}`)
      .send({ description: 'I should not be able to do this' })
      .expect(403);

    expect(res.body.error).toBe('Forbidden: Only moderators can update the subsaw.');
  });

  test('returns 404 if subsaw does not exist', async () => {
    const res = await agent
      .patch(`/api/s/doesnotexist`)
      .send({ description: 'fail' })
      .expect(404);

    expect(res.body.error).toBe('Subsaw not found');
  });

  test('ignores unrelated fields and does not crash', async () => {
    const res = await agent
      .patch(`/api/s/${subsawName}`)
      .send({ madeUpField: 'something' })
      .expect(200);

    // Should still return valid subsaw object
    expect(res.body.displayName).toBeDefined();
  });
});
