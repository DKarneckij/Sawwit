const supertest = require('supertest');
const app = require('@app');
const mongoose = require('mongoose');
const { connectDB, disconnectDB } = require('@utils/mongo');
const Post = require('@models/post');

const api = supertest(app);

let agent;
let createdPost;

beforeAll(async () => {
  await connectDB();

  agent = supertest.agent(app);

  // 1. Signup
  await agent
    .post('/api/auth/signup')
    .send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'validPassword123'
    })
    .expect(201);

  // 2. Create Subsaw
  await agent
    .post('/api/s/')
    .send({
      subsawName: 'testsubsaw',
      description: 'Subsaw for voting tests'
    })
    .expect(201);

  // 3. Create Post
  const newPost = await agent
    .post(`/api/s/testsubsaw/posts/submit`)
    .send({
      type: 'text',
      title: 'Downvoting Test Post',
      content: 'Downvote me :('
    })
    .expect(201);

  createdPost = newPost.body;
});

beforeEach(async () => {
  const newPost = await agent
    .post(`/api/s/testsubsaw/posts/submit`)
    .send({
      type: 'text',
      title: 'Fresh Post',
      content: 'Fresh start'
    })
    .expect(201);

  createdPost = newPost.body;
});

afterAll(async () => {
  await mongoose.connection.close();
  await disconnectDB();
});

describe('POST /api/posts/:postId/downvote', () => {
  
  test('successfully downvotes an upvoted post', async () => {
    const res = await agent
      .post(`/api/s/testsubsaw/posts/${createdPost.id}/downvote`)
      .expect(200);

    expect(res.body.userVote).toBe('downvote');
    expect(res.body.karma).toBe(-1); // Should start with +1 from auto-upvote
  });

  test('successfully downvote a downvoted post', async () => {
    await agent
      .post(`/api/s/testsubsaw/posts/${createdPost.id}/downvote`)
      .expect(200);

    const res = await agent
    .post(`/api/s/testsubsaw/posts/${createdPost.id}/downvote`)
    .expect(200);

    expect(res.body.userVote).toBe(null)
    expect(res.body.karma).toBe(0)
  })

  test('successfully downvote a neutral post', async () => {

    let res;

    // Original agent makes the post neutral
    res = await agent
      .post(`/api/s/testsubsaw/posts/${createdPost.id}/upvote`)
      .expect(200);
    expect(res.body.karma).toBe(0)

    // Create a second agent (another logged-in user)
    const secondAgent = supertest.agent(app);
    
    // Signup second user
    await secondAgent
      .post('/api/auth/signup')
      .send({
        username: 'seconduser',
        email: 'seconduser@example.com',
        password: 'validPassword123'
      })
      .expect(201);
  
    // Downvote the same post
    res = await secondAgent
      .post(`/api/s/testsubsaw/posts/${createdPost.id}/downvote`)
      .expect(200);
    
    expect(res.body.userVote).toBe('downvote')
    expect(res.body.karma).toBe(-1)
  })

  test('returns 400 for invalid post id', async () => {
    await agent
      .post('/api/s/testsubsaw/posts/asdfklk69kst00g/downvote')
      .expect(400);
  });

  test('returns 404 for non-existent post id', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    await agent
      .post(`/api/posts/${fakeId}/downvote`)
      .expect(404);
  });

  test('returns 401 if not authenticated', async () => {
    await api
      .post(`/api/s/testsubsaw/posts/${createdPost.id}/downvote`)
      .expect(401);
  });
});
