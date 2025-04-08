const Post = require('@models/post')
const Vote = require('@models/vote')
const getAuthenticatedUser = require('./utils/getAuthenticatedUser')
const getSubsaw = require ('./utils/getSubsaw')
const attachUserVote = require('./utils/attachUserVote');

const createPost = async (req, res) => {

  const user = req.user
  console.log(user);
  
  const subsaw = req.subsaw
  console.log(subsaw);
  
  
  // Create new Post in the DB
  const newPostData = {
    title: req.body.title,
    type: req.body.type,
    author: user._id, 
    subsaw: subsaw._id
  } 
  
  if (newPostData.type === 'text') {
    newPostData.body = req.body.body;
  }

  if (newPostData.type === 'image') {
    newPostData.mediaUrl = req.body.mediaUrl;
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

  const user = getAuthenticatedUser(req, res)
  console.log(user);

  const post = await Post.findById(req.params.postId);
  const postWithVote = await attachUserVote(post, req.user?._id);
  res.json(postWithVote);
}

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