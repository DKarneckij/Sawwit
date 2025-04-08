const supertest = require('supertest');
const app = require('../../../app');
const mongoose = require('mongoose');
const { connectDB, disconnectDB } = require('../../../utils/mongo');
const Post = require('../../../models/post');
const Subsaw = require('../../../models/subsaw');
const User = require('../../../models/user');

const api = supertest(app);

let userToken;
let user;
let subsaw;
let createdPosts = [];

beforeAll(async () => {
  await connectDB();

  // 1. Create a Supertest agent that persists cookies
  agent = supertest.agent(app);

  // 2. Signup
  await agent
    .post('/api/auth/signup')
    .send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'validPassword123'
    })
    .expect(201);

  // 3. Create Subsaw
  await agent
    .post('/api/s/')
    .send({
      subsawName: 'testsubsaw',
      description: 'Subsaw for testing'
    })
    .expect(201);

  // 4. Create 2 Posts
  const firstPost = await agent
    .post(`/api/s/testsubsaw/posts/submit`)
    .send({
      type: 'text',
      title: 'First Post',
      content: 'Hello world!'
    })
    .expect(201);

  const secondPost = await agent
    .post(`/api/s/testsubsaw/posts/submit`)
    .send({
      type: 'text',
      title: 'Second Post',
      content: 'Another post.'
    })
    .expect(201);
    
  createdPosts = [firstPost.body, secondPost.body];
});

afterAll(async () => {
  await mongoose.connection.close();
  await disconnectDB();
});

describe('GET /api/s/:name/posts/:postId', () => {

  test('returns a specific post by id from the subsaw', async () => {
    const post = createdPosts[0];
    const res = await api.get(`/api/s/testsubsaw/posts/${post.id}`).expect(200);
    expect(res.body.title).toBe(post.title);
  });

  test('returns 400 for non-existent post in a valid subsaw', async () => {
    await api.get(`/api/s/testsubsaw/posts/asdfklk69kst00g`).expect(400);
  });

  test('returns 404 if subsaw name is valid but post doesn’t belong to it', async () => {
    const post = createdPosts[0];
    await api.get(`/api/s/othersubsaw/posts/${post.id}`).expect(404);
  });
});
