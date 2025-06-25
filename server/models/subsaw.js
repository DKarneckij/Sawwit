const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const subsawSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      default: 'This community does not have a description yet.',
      maxlength: [500, 'Description cannot exceed 500 characters.']
    },
    pfpUrl: {
      type: String,
      default: 'https://res.cloudinary.com/dperxfai0/image/upload/v1715459247/assets/default_profile.png'
    },
    bannerUrl: {
      type: String,
      default: null
    },
    backgroundUrl: {
      type: String,
      default: null
    },
    moderators: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }],
    subscribers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    subscriberCount: {
      type: Number,
      default: 1
    },
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }]
  },
  {
    timestamps: true // ✅ correct usage here
  }
);

subsawSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Subsaw', subsawSchema);
