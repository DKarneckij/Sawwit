const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

const subredditSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        required: true
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
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
})

subredditSchema.plugin(mongooseUniqueValidator)

subredditSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

const subredditModel = mongoose.model('Subreddit', subredditSchema)

module.exports = subredditModel