const mongoose = require('mongoose');
const Post = require('@models/post');

const validatePost = async (req, res, next) => {
  const { postId } = req.params;
  const subsaw = req.subsaw; // already loaded by validateSubsaw middleware

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  try {
    const post = await Post.findOne({ _id: postId, subsaw: subsaw._id })
      .populate('author', 'username')
      .populate('subsaw', 'subsawName displayName');

    if (!post) {
      return res.status(404).json({ error: 'Post not found in this subsaw' });
    }

    req.post = post.toJSON(); // Attach populated + clean post
    next();
  } catch (error) {
    console.error('Error validating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = validatePost;
