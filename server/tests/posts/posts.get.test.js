const supertest = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const { connectDB, disconnectDB } = require('../../utils/mongo');
const Post = require('../../models/post');
const User = require('../../models/user');
const Subsaw = require('../../models/subsaw');

const api = supertest(app);

let user;
let subsaw;
let createdPosts = [];

beforeAll(async () => {
  await connectDB();

  user = new User({
    username: 'testuser',
    email: 'testuser@example.com',
    passwordHash: 'hashedpassword'
  });
  await user.save();

  subsaw = new Subsaw({
    name: 'testsubsaw',
    displayName: 'TestSubsaw',
    description: 'Just for testing',
    moderators: [user._id],
    subscribers: [user._id]
  });
  await subsaw.save();

  const posts = [
    {
      type: 'text',
      title: 'First Post',
      body: 'Hello world!',
      author: user._id,
      subsaw: subsaw._id
    },
    {
      type: 'text',
      title: 'Second Post',
      body: 'Another post.',
      author: user._id,
      subsaw: subsaw._id
    }
  ];
  createdPosts = await Post.insertMany(posts);
});

afterAll(async () => {
  await mongoose.connection.close();
  await disconnectDB();
});

describe('GET /api/s/:name/posts', () => {
  test('returns all posts for the subsaw', async () => {
    const res = await api.get(`/api/s/${subsaw.name}/posts`).expect(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toHaveProperty('title');
    expect(res.body[0]).toHaveProperty('subsaw');
  });

  test('returns 404 for non-existent subsaw', async () => {
    await api.get('/api/s/fakesubsaw/posts').expect(404);
  });
});

describe('GET /api/s/:name/posts/:postId', () => {
  test('returns a specific post by id from the subsaw', async () => {
    const post = createdPosts[0];
    const res = await api.get(`/api/s/${subsaw.name}/posts/${post._id}`).expect(200);
    expect(res.body.title).toBe(post.title);
    expect(res.body.subsaw).toBe(post.subsaw.toString());
  });

  test('returns 404 for non-existent post in a valid subsaw', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    await api.get(`/api/s/${subsaw.name}/posts/${fakeId}`).expect(404);
  });

  test('returns 404 if subsaw name is valid but post doesn’t belong to it', async () => {
    const anotherSubsaw = new Subsaw({
      name: 'other',
      displayName: 'Other',
      description: 'Another one',
      moderators: [user._id],
      subscribers: [user._id]
    });
    await anotherSubsaw.save();

    const post = createdPosts[0];
    await api.get(`/api/s/other/posts/${post._id}`).expect(404);
  });
});
