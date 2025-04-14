const supertest = require('supertest');
const app = require('@app');
const mongoose = require('mongoose');
const { connectDB, disconnectDB } = require('@utils/mongo');
const Post = require('@models/post');
const Vote = require('@models/vote')

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
      title: 'Voting Test Post',
      content: 'Vote for me!'
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

describe('POST /api/posts/:postId/upvote', () => {

  test('post is already upvoted after creation', async () => {
    const res = await agent
      .get(`/api/s/testsubsaw/posts/${createdPost.id}`)
      .expect(200);

    expect(res.body.userVote).toBe('upvote');
    expect(res.body.karma).toBe(1); // Should start with +1 from auto-upvote
  });

  test('clicking upvote again removes the upvote (neutral)', async () => {
    // Click upvote again
    const res = await agent
      .post(`/api/s/testsubsaw/posts/${createdPost.id}/upvote`)
      .expect(200);

    // Fetch post again
    const postAfter = await agent
      .get(`/api/s/testsubsaw/posts/${createdPost.id}`)
      .expect(200);

    expect(postAfter.body.userVote).toBe(null);
    expect(postAfter.body.karma).toBe(0); // Score should drop by 1
  });

  test('another user upvoting increases score to 2', async () => {
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
  
    // Upvote the same post
    const res = await secondAgent
      .post(`/api/s/testsubsaw/posts/${createdPost.id}/upvote`)
      .expect(200);
  
    // Fetch post again
    const postAfter = await secondAgent
      .get(`/api/s/testsubsaw/posts/${createdPost.id}`)
      .expect(200);
  
    expect(postAfter.body.userVote).toBe('upvote'); // New user has upvoted
    expect(postAfter.body.karma).toBe(2); // Overall post score increased
  });

  test('succesfully upvote a downvoted post', async () => {
    let res;
    res = await agent
    .post(`/api/s/testsubsaw/posts/${createdPost.id}/downvote`)
    .expect(200);

    expect(res.body.karma).toBe(-1)
    expect(res.body.userVote).toBe('downvote')

    res = await agent
      .post(`/api/s/testsubsaw/posts/${createdPost.id}/upvote`)
      .expect(200);

        expect(res.body.karma).toBe(1)
    expect(res.body.userVote).toBe('upvote')
  })

  test('returns 400 for invalid post id', async () => {
    await agent
      .post('/api/s/testsubsaw/posts/asdfklk69kst00g/upvote')
      .expect(400);
  });

  test('returns 404 for non-existent post id', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    await agent
      .post(`/api/s/testsubsaw/posts/${fakeId}/upvote`)
      .expect(404);
  });

  test('returns 401 if not authenticated', async () => {
    await api
      .post(`/api/s/testsubsaw/posts/${createdPost.id}/upvote`)
      .expect(401);
  });
});
