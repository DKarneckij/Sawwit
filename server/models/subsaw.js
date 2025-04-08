const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

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
    subcriberCount: {
        type: Number,
        default: 0
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
})

// subsawSchema.plugin(mongooseUniqueValidator)

subsawSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

const subsawModel = mongoose.model('Subsaw', subsawSchema)

module.exports = subsawModel