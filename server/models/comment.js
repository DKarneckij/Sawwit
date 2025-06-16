const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    postId: {
      type: Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    // null = top-level comment, otherwise reply to a comment
    parentId: {
      type: Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
    karma: {
      type: Number,
      default: 1, // auto-upvoted by author
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
