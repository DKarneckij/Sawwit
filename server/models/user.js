const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: 'https://res.cloudinary.com/dperxfai0/image/upload/v1715459247/assets/default_profile.png'
    },
    bio: {
        type: String,
        maxLength: 500,
        default: ''
    },
    karma: {
        type: Number,
        default: 0
    },
    subsawsJoined: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subsaw'
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'}]
})

userSchema.plugin(mongooseUniqueValidator)

userSchema.set('toJSON', {
    virtuals: true,
    transform: (document, returnedObject) => {
      delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)

