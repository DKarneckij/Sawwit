const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const postSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['text', 'image'],
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
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  karma: {
    type: Number,
    default: 1 // auto-upvoted by author on creation
  }
});

postSchema.plugin(mongooseUniqueValidator);

postSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Post', postSchema);
