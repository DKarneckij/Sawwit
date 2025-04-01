const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

const commentSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    parentPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: null
    },
    replies: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    upvotedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    downvotedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    deleted: {
      type: Boolean,
      default: false
    },
    timeStamp: {
      type: Date,
      default: Date.now
    }
  });

module.exports = mongoose.model('Comment', commentModel)