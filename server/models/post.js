const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const postSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['text', 'media', 'link'],
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  subsaw: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subsaw',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  karma: {
    type: Number,
    default: 1 // auto-upvoted by author on creation
  },
  commentCount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Post', postSchema);
