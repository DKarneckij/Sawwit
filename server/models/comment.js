const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
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
        ref: 'Comment'
    },
    timeStamp: {
        type: Date,
        default: Date.now
    },
    votes: {
        type: Number,
        required: true
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    deleted: {
        type: Boolean,
        default: false
    },
    flagged: {
        type: Boolean,
        default: false
    }
})

commentSchema.plugin(mongooseUniqueValidator)

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Comment', commentModel)