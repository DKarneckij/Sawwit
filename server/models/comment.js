const mongoose = require('mongoose');

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

  commentableType: {
    type: String,
    enum: ['Post', 'Comment'],  // <-- either a Post or another Comment
    required: true
  },
  commentableId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'commentableType' // <-- dynamic reference
  },

  karma: {
    type: Number,
    default: 1 // auto-upvoted by author on creation
  }
}, { timestamps: true }); // createdAt and updatedAt automatically

module.exports = mongoose.model('Comment', commentSchema);
