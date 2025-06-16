const supertest = require('supertest');
const app = require('@app');
const User = require('@models/user');
const Subsaw = require('@models/subsaw');
const Post = require('@models/post');
const Comment = require('@models/comment');
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
  await Comment.deleteMany({});
  await Vote.deleteMany({});
  agent = supertest.agent(app);
});

afterAll(async () => {
  await disconnectDB();
});

const signupCreateSubsawAndPost = async () => {
  const signupRes = await agent.post('/api/auth/signup').send({
    username: 'commenttester',
    email: 'comment@test.com',
    password: 'CommentTest123'
  });

  const subsawRes = await agent.post('/api/s').send({
    subsawName: 'CommentTestSubsaw',
    description: 'Subsaw for comment testing'
  });

  const postRes = await agent.post('/api/s/CommentTestSubsaw/posts').send({
    title: 'Post for Comments',
    type: 'text',
    content: 'Commentable post!'
  });

  return {
    user: signupRes.body,
    subsaw: subsawRes.body,
    post: postRes.body
  };
};

describe('POST /api/s/:subsawName/posts/:postId/comments', () => {
  test('successfully creates a top-level comment on a post', async () => {
    const { post} = await signupCreateSubsawAndPost();

    const res = await agent.post(`/api/comments`).send({
      content: 'This is my first comment!',
      commentableType: 'Post',
      commentableId: post.id
    });
    console.log(res.body);
    
    
    expect(res.status).toBe(201);
    expect(res.body.content).toBe('This is my first comment!');
    expect(res.body.commentableType).toBe('Post');
    expect(res.body.commentableId).toBe(post.id);
  });

  test('fails to create a comment without content', async () => {
    const { post, subsaw } = await signupCreateSubsawAndPost();

    const res = await agent.post(`/api/comments`).send({
      content: '',
      commentableType: 'Post',
      commentableId: post.id
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('fails without authentication', async () => {
    const { post, subsaw } = await signupCreateSubsawAndPost();

    const unauth = supertest.agent(app);

    const res = await unauth.post(`/api/comments`).send({
      content: 'No Auth!',
      commentableType: 'Post',
      commentableId: post.id
    });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Authentication required');
  });

  test('fails when posting to non-existent post', async () => {
    const { subsaw } = await signupCreateSubsawAndPost();

    const fakePostId = '660cfc3b0bd558001efc1a23'; // fake ObjectId
    const res = await agent.post(`/api/comments`).send({
      content: 'Ghost Post',
      commentableType: 'Post',
      commentableId: fakePostId
    });

    expect(res.status).toBe(404);
    expect(res.body.error).toContain('Post not found');
  });

  // 🆕 New Test: Too many characters
  test('fails to create a comment with content too long', async () => {
    const { post, subsaw } = await signupCreateSubsawAndPost();

    const longContent = 'a'.repeat(5001);

    const res = await agent.post(`/api/comments`).send({
      content: longContent,
      commentableType: 'Post',
      commentableId: post.id
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  // 🆕 New Test: Comment that’s only spaces
  test('fails to create a comment with only spaces', async () => {
    const { post, subsaw } = await signupCreateSubsawAndPost();

    const res = await agent.post(`/api/comments`).send({
      content: '        ',
      commentableType: 'Post',
      commentableId: post.id
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  // 🆕 New Test: Create a reply comment
  test('successfully creates a reply to a comment', async () => {
    const { post, subsaw } = await signupCreateSubsawAndPost();

    // First create a top-level comment
    const topLevelRes = await agent.post(`/api/comments`).send({
      content: 'Top-level comment',
      commentableType: 'Post',
      commentableId: post.id
    });

    expect(topLevelRes.status).toBe(201);

    const parentCommentId = topLevelRes.body._id;

    // Now create a reply to that comment
    const replyRes = await agent.post(`/api/comments`).send({
      content: 'Replying to top-level',
      commentableType: 'Comment',
      commentableId: parentCommentId
    });

    expect(replyRes.status).toBe(201);
    expect(replyRes.body.commentableType).toBe('Comment');
    expect(replyRes.body.commentableId).toBe(parentCommentId);
  });

  // 🆕 New Test: Fail to reply to non-existent comment
  test('fails to reply to a non-existent parent comment', async () => {
    const { post, subsaw } = await signupCreateSubsawAndPost();

    const fakeCommentId = '660cfc3b0bd558001efc1aaa'; // fake ObjectId

    const res = await agent.post(`/api/comments`).send({
      content: 'Reply to ghost comment',
      commentableType: 'Comment',
      commentableId: fakeCommentId
    });

    expect(res.status).toBe(404);
    expect(res.body.error).toContain('Comment not found');
  });
});

