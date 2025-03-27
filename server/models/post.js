const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: yes
    },
    type: {
        type: String,
        enum: ['text', 'image'],
        required: true
    },
    content: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})

postSchema.plugin(mongooseUniqueValidator)

postSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Post', postSchema)

