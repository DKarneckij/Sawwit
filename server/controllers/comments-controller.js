const Comment = require('@models/comment');
const Vote = require('@models/vote');
const User = require('@models/user');
const Post = require('@models/post')

const createComment = async (req, res) => {

  const user = req.user;
  const { content, postId, parentId = null } = req.body;

  // Validate target post exists
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  // If it's a reply, validate parent comment exists and belongs to same post
  if (parentId) {
    const parentComment = await Comment.findById(parentId);
    if (!parentComment || String(parentComment.postId) !== String(postId)) {
      return res.status(400).json({ error: 'Invalid parent comment' });
    }
  }

  // Create the comment
  const comment = await Comment.create({
    content,
    author: user.id,
    postId,
    parentId,
  });

  // Auto-upvote by author
  await Vote.create({
    userId: user.id,
    targetId: comment.id,
    targetType: 'Comment',
    voteType: 'upvote',
  });

  // Update post comment count + user karma
  await Promise.all([
    Post.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } }),
    User.findByIdAndUpdate(user._id, { $inc: { karma: 1 } }),
  ]);

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