const Comment = require('@models/comment');
const Vote = require('@models/vote');
const User = require('@models/user');
const Post = require('@models/post')

const createComment = async (req, res) => {
  
  const user = req.user;
  const { content, commentableType, commentableId = null } = req.body;

  // Validate parent (the thing being commented on) exists
  const ParentModel = commentableType === 'Post' ? Post : Comment;
  const parent = await ParentModel.findById(commentableId);

  if (!parent) {
    return res.status(404).json({ error: `${commentableType} not found` });
  }
  
  // Create the comment
  const comment = await Comment.create({
    content,
    author: user._id,
    commentableType,
    commentableId
  });

  // Auto-upvote the comment
  await Vote.create({
    userId: user._id,
    targetId: comment._id,
    targetType: 'Comment',
    voteType: 'upvote'
  });

  // Increase user's karma
  await User.findByIdAndUpdate(user._id, { $inc: { karma: 1 } });

  res.status(201).json(comment);
};

const getComment = async () => {
  
}

const upvoteComment = async () => {

}

const downvoteComment = async () => {

}

module.exports = {
  createComment,
  getComment,
  upvoteComment,
  downvoteComment
}