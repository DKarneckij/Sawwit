const supertest = require('supertest');
const app = require('@app');
const User = require('@models/user');
const Subsaw = require('@models/subsaw');
const Post = require('@models/post');
const Vote = require('@models/vote');
const { connectDB, disconnectDB } = require('@utils/mongo');

let agent;

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  await User.deleteMany({});
  await Subsaw.deleteMany({});
  await Post.deleteMany({});
  await Vote.deleteMany({});
  agent = supertest.agent(app);
});

afterAll(async () => {
  await disconnectDB();
});

const signupAndCreateSubsaw = async () => {
  const signupRes = await agent.post('/api/auth/signup').send({
    username: 'posttester',
    email: 'post@test.com',
    password: 'PostTest123'
  });

  const subsawRes = await agent.post('/api/s').send({
    name: 'PostTestSubsaw',
    description: 'Subsaw for post testing'
  });

  return {
    user: signupRes.body,
    subsaw: subsawRes.body
  };
};

describe('POST /api/posts', () => {
  test.only('successfully creates a text post with valid data', async () => {

    await signupAndCreateSubsaw();
    
    const res = await agent.post('/api/s/PostTestSubsaw/posts/submit').send({
      title: 'My First Post',
      type: 'text',
      body: 'Hello world!'
    });
    
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('My First Post');
    expect(res.body.type).toBe('text');
    expect(res.body.body).toBe('Hello world!');
    expect(res.body.karma).toBe(1);
    expect(res.body.userVote).toBe('upvote');
  });

  // test('successfully creates an image post with valid data', async () => {
  //   const { subsaw } = await signupAndCreateSubsaw();

  //   const res = await agent.post('/api/posts').send({
  //     title: 'Image Post',
  //     type: 'image',
  //     mediaUrl: 'https://example.com/image.jpg',
  //     subsawId: subsaw._id
  //   });

  //   expect(res.status).toBe(201);
  //   expect(res.body.type).toBe('image');
  //   expect(res.body.mediaUrl).toBe('https://example.com/image.jpg');
  // });

  test('fails to create a post without a title', async () => {
    const { subsaw } = await signupAndCreateSubsaw();

    const res = await agent.post('/api/s/PostTestSubsaw/posts/submit').send({
      type: 'text',
      body: 'Missing title',
      subsawId: subsaw._id
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('fails to create a post with an invalid type', async () => {
    const { subsaw } = await signupAndCreateSubsaw();

    const res = await agent.post('/api/s/PostTestSubsaw/posts/submit').send({
      title: 'Bad Type',
      type: 'video',
      body: 'Should fail',
      subsawId: subsaw._id
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('fails without authentication', async () => {
    const unauth = supertest.agent(app);

    const res = await unauth.post('/api/s/PostTestSubsaw/posts/submit').send({
      title: 'No Auth',
      type: 'text',
      body: 'No user',
      subsawId: 'someid'
    });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Authentication required');
  });

  test('fails with missing subsawId', async () => {
    await signupAndCreateSubsaw();

    const res = await agent.post('/api/s/posts/submit').send({
      title: 'Missing Subsaw',
      type: 'text',
      body: 'No subsawId'
    });

    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });

  test('fails when posting to non-existent subsaw', async () => {
    await signupAndCreateSubsaw();

    const res = await agent.post('/api/s/al/posts/submit').send({
      title: 'Ghost Subsaw',
      type: 'text',
      body: 'This subsaw doesn’t exist',
    });

    expect(res.status).toBe(404);
    expect(res.body.error).toContain('Subsaw not found');
  });
});
