const mongoose = require('mongoose');
// const mongooseUniqueValidator = require('mongoose-unique-validator');

const subsawSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true
  },
  subsawName: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  bannerUrl: {
    type: String,
    default: null
  },
  backgroundUrl: {
    type: String,
    default: null
  },
  pfpUrl: {
    type: String,
    default: 'https://res.cloudinary.com/dperxfai0/image/upload/v1715459247/assets/default_profile.png'
  },
  date_created: {
    type: Date,
    required: true,
    default: Date.now
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
});

// Optional plugin for unique validation if needed
// subsawSchema.plugin(mongooseUniqueValidator);

subsawSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const subsawModel = mongoose.model('Subsaw', subsawSchema);

module.exports = subsawModel;
