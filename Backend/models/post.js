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
    subreddit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subreddit',
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

const postModel = mongoose.model('Post', postSchema)

module.exports = postModel

