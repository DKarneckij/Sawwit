const Post = require('@models/post')
const Vote = require('@models/vote')
const attachUserVote = require('./utils/attachUserVote');

const createPost = async (req, res) => {
  const user = req.user;
  const subsaw = req.subsaw;

  const newPostData = {
    title: req.body.title,
    type: req.body.type,
    content: req.body.content,
    author: user._id,
    subsaw: subsaw._id,
  };

  const newPost = await new Post(newPostData).save();

  // Automatically upvote the post
  await Vote.create({
    userId: user._id,
    targetId: newPost._id,
    voteType: 'upvote',
    targetType: 'Post'
  });

  // Update user karma and posts
  user.karma += 1;
  user.posts.push(newPost._id);
  await user.save();

  // Update subsaw posts
  subsaw.posts.push(newPost._id);
  await subsaw.save();

  res.status(201).json({ id: newPost._id.toString() });
};

module.exports = {
  createPost,
};

const getPost = async (req, res) => {
  let post = req.post; // validatePost already attached post
  if (req.user) {
    // Only attach userVote if logged in
    post = await attachUserVote(post, req.user._id, 'Post');
  }
  return res.status(200).json(post);
};

// Utility to adjust post score
const adjustPostScore = async (postId, delta) => {
  await Post.findByIdAndUpdate(postId, { $inc: { karma: delta } });
};

const upvotePost = async (req, res) => {

  const userId = req.user._id;
  const postId = req.post._id;

  const existingVote = await Vote.findOne({ userId, targetId: postId, targetType: 'Post' });
  
  if (existingVote) {
    if (existingVote.voteType === 'upvote') {
      await existingVote.deleteOne();
      await adjustPostScore(postId, -1);
    } else if (existingVote.voteType === 'downvote') {
      existingVote.voteType = 'upvote';
      await existingVote.save();
      await adjustPostScore(postId, 2);
    }
  } else {
    await Vote.create({ userId, targetId: postId, voteType: 'upvote', targetType: 'Post'});
    await adjustPostScore(postId, 1);
  }

  // Fetch updated post
  let updatedPost = await Post.findById(postId);
  updatedPost = await attachUserVote(updatedPost, userId, 'Post');

  return res.status(200).json(updatedPost);
};

const downvotePost = async (req, res) => {
  const userId = req.user._id;
  const postId = req.post._id;

  const existingVote = await Vote.findOne({ userId, targetId: postId, targetType: 'Post' });

  if (existingVote) {
    if (existingVote.voteType === 'downvote') {
      // Clicking downvote again removes the downvote (neutral)
      await existingVote.deleteOne();
      await adjustPostScore(postId, 1); // undo downvote
    } else if (existingVote.voteType === 'upvote') {
      // Switching from upvote to downvote
      existingVote.voteType = 'downvote';
      await existingVote.save();
      await adjustPostScore(postId, -2); // remove upvote and apply downvote
    }
  } else {
    // No existing vote, create a downvote
    await Vote.create({ userId, targetId: postId, voteType: 'downvote', targetType: 'Post' });
    await adjustPostScore(postId, -1);
  }

  // Fetch updated post
  let updatedPost = await Post.findById(postId);
  updatedPost = await attachUserVote(updatedPost, userId, 'Post');

  return res.status(200).json(updatedPost);
};

module.exports = {
  createPost,
  getPost,
  upvotePost,
  downvotePost
}