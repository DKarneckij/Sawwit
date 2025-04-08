const Post = require('@models/post')
const Vote = require('@models/vote')
const attachUserVote = require('./utils/attachUserVote');
const mongoose = require('mongoose')

const createPost = async (req, res) => {

  const user = req.user
  const subsaw = req.subsaw
  
  // Create new Post in the DB
  const newPostData = {
    title: req.body.title,
    type: req.body.type,
    content: req.body.content,
    author: user._id, 
    subsaw: subsaw._id
  }

  // Save new post
  const newPost = await new Post(newPostData).save();
  
  // Automatically upvote the post by the author (default score is 1)
  await Vote.create({
    userId: user._id,
    postId: newPost._id,
    voteType: 'upvote'
  });

  user.karma += 1;
  user.posts.push(newPost._id);
  await user.save();

  subsaw.posts.push(newPost._id);
  await subsaw.save();

  const postWithVote = await attachUserVote(newPost, user._id);
  res.status(201).json(postWithVote);
}

const getPost = async (req, res) => {

  const { postId } = req.params;
  const subsaw = req.subsaw

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  try {
    const post = await Post.findOne({ _id: postId, subsaw: subsaw._id });


    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const postWithVote = await attachUserVote(post, req.user?._id);
    res.json(postWithVote);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const upvotePost = async (req, res) => {

}

const downvotePost = async (req, res) => {

}

module.exports = {
  createPost,
  getPost,
  upvotePost,
  downvotePost
}